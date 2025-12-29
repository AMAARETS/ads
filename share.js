/**
 * promote-banner-ticker.js
 *
 * A slim, fixed banner with a SEAMLESS scrolling text ticker,
 * featuring internal Angular navigation and embedded copy chips.
 * Version: 6.0 (Seamless Ticker Loop + Hover Pause + Internal Nav)
 */

(function() {
  // --- Configuration ---
  const CONFIG = {
    links: {
      extension: 'https://chromewebstore.google.com/detail/odiokhddkoempbdcanepmjbichfifggo#utm_source=share_web&utm_medume=baner&utm_id=5',
      site: 'https://thechannel-viewer.clickandgo.cfd/?utm_source=share_web&utm_medume=baner&utm_id=5'
    },
    scrollDuration: 25 // seconds for one full loop (controls speed)
  };

  // --- HTML Content - Rephrased & Designed for Seamless Loop ---
  // כל משפט צריך להיות ארוך מספיק כדי למלא את הטיקר
  const MESSAGES = [
    // ניסוח מחודש: שיתוף
    '🎁 נהנים מהצפיה הנוחה? שתפו גם את החברים שלכם! שלחו להם קישור לתוסף: [EXT_LINK] או להתרשמות באתר: [SITE_LINK]',
    // ניסוח מחודש: עזרה
    '🛠️ בעיות בהתחברות לגוגל? אל דאגה! עיינו מיד ב[HELP_LINK] שלנו, או [CONTACT_LINK] אותנו אם הבעיה נמשכת.',
    // משפט נוסף לשמירת עניין
    '🚀 הגיע הזמן לשדרג את החוויה של הצפיה בערוצים! הערוצים המובילים בתוך דף הגימייל שלך – בקלות, במהירות ובכיף.',
    // ... חזרה למשפט הראשון כדי להבטיח אורך מספיק ללולאה חלקה
    '🎁 נהנים מהצפיה הנוחה? שתפו גם את החברים שלכם! שלחו להם קישור לתוסף: [EXT_LINK] או להתרשמות באתר: [SITE_LINK]',
  ];

  // --- Utility to replace placeholders with interactive elements (HTML) ---
  function createTickerContent() {
    const extChip = `<button class="ph-chip" data-copy="${CONFIG.links.extension}">🧩 העתק תוסף</button>`;
    const siteChip = `<button class="ph-chip" data-copy="${CONFIG.links.site}">🌐 העתק אתר</button>`;
    const helpLink = `<button class="ph-nav-link" data-nav="help" data-section="login">מדריך עזרה להתחברות</button>`;
    const contactLink = `<button class="ph-nav-link" data-nav="contact">צרו קשר</button>`;

    return MESSAGES.map(msg => {
      let content = msg;
      content = content.replace('[EXT_LINK]', extChip);
      content = content.replace('[SITE_LINK]', siteChip);
      content = content.replace('[HELP_LINK]', helpLink);
      content = content.replace('[CONTACT_LINK]', contactLink);
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
        /* Pause on hover */
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
        padding-left: 50px; /* Gap between repeated sentences in RTL */
        line-height: 1.6;
        display: flex;
        align-items: center;
        gap: 10px; /* Spacing between text and chips/links */
    }

    /* --- Embedded Copy Chips --- */
    .ph-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.4);
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 12.5px;
        cursor: pointer;
        transition: all 0.2s;
        color: white;
        white-space: nowrap;
        font-family: inherit;
    }
    .ph-chip:hover {
        background: white;
        color: #1d2b64;
        font-weight: 600;
        transform: scale(1.03);
    }

    /* --- Internal Navigation Links (Styled as buttons but with link look) --- */
    .ph-nav-link {
        color: #ffecd2;
        font-weight: 700;
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: color 0.2s, text-shadow 0.2s;
        background: none;
        border: none;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: 1.6;
    }
    .ph-nav-link:hover {
        color: #fff;
        text-shadow: 0 0 5px rgba(255,255,255,0.7);
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

    /* MODIFIED Animation for seamless loop (RTL) */
    @keyframes ph-scroll-text {
        /* Start from position 0 (first message is visible) */
        from { transform: translateX(0); }
        /* End by moving exactly the width of the repeating block to the right (RTL scroll effect) */
        to { transform: translateX(50%); }
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
    </div>

    <!-- Toast -->
    <div id="ph-toast" class="ph-toast">
        <span>✅</span> <span id="ph-toast-msg">הקישור הועתק בהצלחה!</span>
    </div>
  `;

  // --- Logic ---
  function init() {
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
  }

  // Handle Internal Angular Navigation
  function bindNavigationEvents() {
    const navButtons = document.querySelectorAll('.ph-nav-link');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
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

  // Handle Copy to Clipboard
  function bindCopyEvents() {
    const copyBtns = document.querySelectorAll('.ph-chip[data-copy]');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the parent element from getting event
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
      const iconSpan = toast.querySelector('span'); // First span is icon

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
