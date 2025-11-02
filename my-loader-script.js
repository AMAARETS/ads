// my-loader-script.js (נמצא ב-CDN)

(function() {
    // --- הגדרות ---

    // הכתובת של קובץ ה-HTML שאותו נטען
    const HTML_CONTENT_URL = 'https://cdn.jsdelivr.net/gh/AMAARETS/ads@main/my-custom-content.html';

    // הפרמטרים ב-URL שצריכים להתקיים כדי שהסקריפט יפעל
    const REQUIRED_PARAMS = {
        view: 'custom',
        source: 'my-external-script'
    };

    // --- לוגיקה ---

    /**
     * פונקציה ראשית שמתחילה את התהליך.
     */
    function main() {
        const params = new URLSearchParams(window.location.search);

        // בודק אם כל הפרמטרים הנדרשים קיימים ב-URL
        const shouldRun = Object.keys(REQUIRED_PARAMS).every(
            key => params.get(key) === REQUIRED_PARAMS[key]
        );

        if (shouldRun) {
            console.log('External script: URL parameters match. Starting process...');
            waitForApiAndLoad(params);
        } else {
            console.log('External script: URL parameters do not match. Script will not run.');
        }
    }

    /**
     * ממתין שה-API של אפליקציית האנגולר יהיה זמין, ואז טוען את התוכן.
     * @param {URLSearchParams} params - הפרמטרים מה-URL הנוכחי.
     */
    function waitForApiAndLoad(params) {
        let attempts = 0;
        const maxAttempts = 50; // נסה במשך 5 שניות

        const interval = setInterval(() => {
            attempts++;
            // בודק אם הפונקציה הגלובלית שהאנגולר חושף קיימת
            if (window.theChannel && typeof window.theChannel.loadCustomContent === 'function') {
                clearInterval(interval); // הפסק לבדוק
                loadContent(params);   // טען את התוכן
            } else if (attempts >= maxAttempts) {
                clearInterval(interval); // הפסק אחרי זמן קצוב
                console.error('Timeout: TheChannel API did not become available.');
            }
        }, 100);
    }

    /**
     * מבצע קריאת רשת כדי להביא את קובץ ה-HTML, ואז קורא ל-API של האנגולר.
     * @param {URLSearchParams} params - הפרמטרים מה-URL הנוכחי.
     */
    async function loadContent(params) {
        try {
            const response = await fetch(HTML_CONTENT_URL);
            if (!response.ok) {
                throw new Error(`Failed to fetch HTML: ${response.statusText}`);
            }
            let htmlContent = await response.text();

            // דוגמה למניפולציה על ה-HTML לפני הצגתו
            const dynamicId = params.get('id') || 'N/A';
            htmlContent = htmlContent.replace(
                '<strong id="dynamic-id-placeholder"></strong>',
                `<strong id="dynamic-id-placeholder">${dynamicId}</strong>`
            );

            // קורא לפונקציה שהאנגולר חשף ומעביר לה את התוכן והפרמטרים
            window.theChannel.loadCustomContent(htmlContent, {
                view: params.get('view'),
                source: params.get('source'),
                id: dynamicId
            });

            console.log('External script: Custom content loaded successfully.');

        } catch (error) {
            console.error('External script: Error loading custom content.', error);
            // אפשר להציג הודעת שגיאה במקום התוכן
            const errorHtml = `<div style="padding:20px; color:red;"><h2>שגיאה בטעינת התוכן</h2><p>${error.message}</p></div>`;
            window.theChannel.loadCustomContent(errorHtml, { view: 'custom', source: 'error' });
        }
    }

    // המתן עד שה-DOM הראשוני נטען לפני שמנסים להריץ את הלוגיקה
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

})();
