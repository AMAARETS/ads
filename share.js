/**
 * promote-banner-ticker-v7.js
 *
 * A slim, fixed banner with a SEAMLESS scrolling text ticker,
 * featuring internal Angular navigation styled as chips, hover pause,
 * and extremely slow scroll speed.
 * 
 * MODIFIED: Added local storage check and a delayed close button.
 */

(function() {
  // --- Configuration ---
  const CONFIG = {
    links: {
      extension: 'https://chromewebstore.google.com/detail/odiokhddkoempbdcanepmjbichfifggo#utm_source=share_web&utm_medume=baner&utm_id=5',
      site: 'https://thechannel-viewer.clickandgo.cfd/?utm_source=share_web&utm_medume=baner&utm_id=5'
    },
    scrollDuration: 60 // 60 seconds for one full loop
  };

  // --- HTML Content - Rephrased & Designed for Seamless Loop ---
  const MESSAGES = [
    // ניסוח מעודכן: שיתוף
    '🎁 נהנים מהצפייה הנוחה? שתפו גם את החברים שלכם! שלחו להם קישור לתוסף: [EXT_LINK] או להתרשמות באתר: [SITE_LINK]',
    // ניסוח מעודכן: עזרה
    'יש לכם הצעה לשיפור או לתוספת מועילה? [CONTACT_LINK2] כדי שנוכל להוסיף!',
    '🛠️ בעיות בהתחברות לגוגל? אל דאגה! עיינו מיד ב[HELP_LINK] שלנו, או [CONTACT_LINK] אם הבעיה נמשכת.',
    'מצאתם באג? [CONTACT_LINK2] כדי שנוכל לתקן את זה לטובת כולנו!',
    // משפט נוסף לשמירת עניין
    '🚀 הגיע הזמן לשדרג את חווית הצפייה בערוצים! הערוצים המובילים בתוך דף הגימייל שלך – בקלות, במהירות ובכיף.',
  ];

  // --- Utility to replace placeholders with interactive elements (HTML) ---
  function createTickerContent() {
    // Buttons for Copy (Chips)
    const extChip = `<button class="ph-chip ph-copy-chip" data-copy="${CONFIG.links.extension}">🧩 העתק קישור לתוסף</button>`;
    const siteChip = `<button class="ph-chip ph-copy-chip" data-copy="${CONFIG.links.site}">🌐 העתק קישור לאתר</button>`;
    
    // Buttons for Navigation (Styled as Chips)
    const helpLink = `<button class="ph-chip ph-nav-chip" data-nav="help" data-section="login">מדריך עזרה להתחברות</button>`;
    const contactLink = `<button class="ph-chip ph-nav-chip" data-nav="contact">צרו איתנו קשר</button>`;
    const contactLink2 = `<button class="ph-chip ph-nav-chip" data-nav="contact">ספרו לנו</button>`;
    
    return MESSAGES.map(msg => {
      let content = msg;
      content = content.replace('[EXT_LINK]', extChip);
      content = content.replace('[SITE_LINK]', siteChip);
      content = content.replace('[HELP_LINK]', helpLink);
      content = content.replace('[CONTACT_LINK]', contactLink);
      content = content.replace('[CONTACT_LINK2]', contactLink2);
      return `<span class="ph-ticker-item">${content}</span>`;
    }).join('');
  }


  // --- Styles (CSS) ---
  const styles = `
    /* --- Main Banner and Layout --- */
    .ph-banner {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 55px;
      padding: 0 15px;
      box-sizing: border-box;
      /* גרדיאנט יפה ומשכנע */
      background: linear-gradient(270deg, #3a506b, #1d2b64, #71b280, #134e5e);
      background-size: 800% 800%;
      color: white;
      font-family: 'Assistant', -apple-system, BlinkMacSystemFont, sans-serif;
      z-index: 9997;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
      animation: ph-gradient 18s ease infinite;
      direction: rtl;
      overflow: hidden;
    }

    /* --- Left Side Static Icon --- */
    .ph-static-icon {
        font-size: 24px;
        line-height: 1;
        margin-left: 15px;
        flex-shrink: 0;
        animation: ph-icon-pulse 3s infinite alternate;
    }

    /* --- Close Button Style (NEW) --- */
    .ph-close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 26px; /* גודל נח ללחיצה */
        line-height: 1;
        cursor: pointer;
        padding: 0;
        margin-right: 15px; /* מרווח מהקצה השמאלי */
        flex-shrink: 0;
        transition: opacity 0.5s ease, transform 0.2s;
        opacity: 0; /* מוסתר בהתחלה */
        pointer-events: none; /* לא ניתן ללחוץ כשמוסתר */
    }
    
    .ph-close-btn:hover {
        opacity: 0.8 !important;
        transform: scale(1.1);
    }
    
    /* Utility class to make it visible */
    .ph-close-btn.show-close {
        opacity: 1;
        pointer-events: auto;
    }

    /* --- Ticker Core Styles --- */
    .ph-ticker-wrap {
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
        height: 100%;
    }
    .ph-ticker-track {
        display: flex;
        width: fit-content;
        animation: ph-scroll-text ${CONFIG.scrollDuration}s linear infinite;
        align-items: center;
        cursor: grab;
    }
    .ph-ticker-track:hover {
        animation-play-state: paused;
        cursor: grabbing;
    }
    .ph-ticker-item {
        white-space: nowrap;
        font-size: 15.5px;
        font-weight: 500;
        padding-left: 300px;
        line-height: 1.6;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    /* --- Interactive Chips (Copy & Nav) --- */
    .ph-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.5);
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        color: white;
        white-space: nowrap;
        font-family: inherit;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .ph-chip:hover {
        background: #fff;
        color: #1d2b64;
        font-weight: 600;
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    
    /* קצת עיצוב שונה לקישורי ניווט כדי להבדילם (אך עדיין צ'יפ) */
    .ph-nav-chip {
        background: #ffecd2; /* צבע בהיר יותר למשיכת תשומת לב */
        color: #1d2b64;
        font-weight: 600;
    }
    .ph-nav-chip:hover {
        background: white;
        color: #3a506b;
    }

    /* --- Toast Notification (Copied feedback) --- */
    .ph-toast {
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(30, 30, 30, 0.9);
        color: white;
        padding: 10px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 8px;
        direction: rtl;
    }
    .ph-toast.show {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }

    /* --- Keyframe Animations --- */
    @keyframes ph-gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes ph-icon-pulse { 0% { transform: scale(1); } 100% { transform: scale(1.05); } }

    /* Animation for seamless loop (RTL) */
    @keyframes ph-scroll-text {
        from { transform: translateX(0); }
        to { transform: translateX(50%); }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .ph-banner { height: auto; min-height: 55px; align-items: flex-start; padding: 8px 15px; }
        .ph-static-icon { display: none; }
        .ph-close-btn { margin-right: 0; margin-left: 15px; } /* מיקום האיקס בצד ימין למובייל, ליד האייקון הסטטי (אם היה) */
        .ph-ticker-wrap { height: auto; }
        .ph-ticker-track { flex-direction: column; animation: none; width: 100%; align-items: flex-start;}
        .ph-ticker-item { white-space: normal; padding-left: 0; margin-bottom: 10px; flex-direction: column; align-items: flex-start; gap: 5px;}
        .ph-ticker-track:hover { animation-play-state: running; }
        .ph-chip { margin-top: 5px; }
    }
  `;

  // --- HTML Template ---
  const bannerHtml = `
    <div id="ph-main-banner" class="ph-banner">
      <!-- Static content on the RIGHT (in RTL) -->
      <div class="ph-static-icon">📢</div>

      <!-- Seamless Scrolling Ticker in the middle -->
      <div class="ph-ticker-wrap">
          <div class="ph-ticker-track">
              ${createTickerContent()}
              ${createTickerContent()} <!-- Repeat content for seamless loop -->
          </div>
      </div>
      
      <!-- NEW: Close Button (X) -->
      <button id="ph-close-btn" class="ph-close-btn" title="סגור את הבאנר">&#x2715;</button> 
    </div>

    <!-- Toast -->
    <div id="ph-toast" class="ph-toast">
        <span>✅</span> <span id="ph-toast-msg">הקישור הועתק בהצלחה!</span>
    </div>
  `;

  // --- Logic ---
  function init() {
    // ********************************************
    // 0. NEW: Check Dismissal Flag in Local Storage
    // ********************************************
    if (localStorage.getItem('share1') === 'dismissed') {
        console.log('Banner Script: Dismissed flag found in local storage. Not displaying banner.');
        return; // Exit the function, banner will not be displayed
    }
      
    const adContainer = document.getElementById('ad-placement-container');
    if (!adContainer) {
      console.warn('Banner Script: Container not found.');
      return;
    }

    // 1. Inject CSS
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    // 2. Inject HTML
    adContainer.innerHTML = bannerHtml;

    // 3. Bind Events
    bindCopyEvents();
    bindNavigationEvents();
    bindCloseEvent(); // NEW: Bind the close logic

    // ********************************************
    // 4. NEW: Delayed Close Button Visibility
    // ********************************************
    const closeBtn = document.getElementById('ph-close-btn');
    if (closeBtn) {
        // המרת משך האנימציה (שניות) לאלפיות שניה
        const delayInMs = CONFIG.scrollDuration * 1000;
        
        setTimeout(() => {
            closeBtn.classList.add('show-close');
            console.log('Banner Script: Close button is now visible after one loop.');
        }, delayInMs);
    }
  }

  // Handle Internal Angular Navigation
  function bindNavigationEvents() {
    // Select the navigation chips only
    const navButtons = document.querySelectorAll('.ph-chip.ph-nav-chip');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Stop ticker pause/grab event
            const target = btn.getAttribute('data-nav');
            const section = btn.getAttribute('data-section');

            // בדיקה אם ה-API של האפליקציה קיים
            if (window.theChannel && typeof window.theChannel.navigateTo === 'function') {
                const params = section ? { section } : {};
                window.theChannel.navigateTo(target, params);
            } else {
                console.error('TheChannel API not found on window object');
                showToast('שגיאת ניווט פנימית', '❌');
            }
        });
    });
  }
  
  // ********************************************
  // NEW: Handle Close Button Click
  // ********************************************
  function bindCloseEvent() {
    const closeBtn = document.getElementById('ph-close-btn');
    const banner = document.getElementById('ph-main-banner');
    
    if (closeBtn && banner) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // 1. Set dismissal flag in local storage
        localStorage.setItem('share1', 'dismissed');
        
        // 2. Remove the banner from the DOM
        banner.remove();
        
        // Optional: Remove toast too
        const toast = document.getElementById('ph-toast');
        if (toast) toast.remove();
        
        console.log('Banner Script: Banner dismissed and "share1" flag set in local storage.');
      });
    }
  }

  // Handle Copy to Clipboard
  function bindCopyEvents() {
    const copyBtns = document.querySelectorAll('.ph-chip.ph-copy-chip[data-copy]');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the parent ticker from pausing/grabbing
            const link = btn.getAttribute('data-copy');
            copyToClipboard(link);
        });
    });
  }

  async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('הקישור הועתק בהצלחה!');
    } catch (err) {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('הקישור הועתק בהצלחה!');
        } catch (err) {
            showToast('ההעתקה נכשלה', '❌');
        }
        document.body.removeChild(textArea);
    }
  }

  let toastTimeout;
  function showToast(msg, icon = '✅') {
      const toast = document.getElementById('ph-toast');
      const msgSpan = document.getElementById('ph-toast-msg');
      const iconSpan = toast.querySelector('span');

      msgSpan.textContent = msg;
      iconSpan.textContent = icon;

      toast.classList.add('show');
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Run
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
  } else {
      init();
  }

})();
