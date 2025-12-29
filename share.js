/**
 * promote-banner-ticker-v8.js
 *
 * A slim, fixed banner with a SEAMLESS scrolling text ticker.
 * 
 * FEATURES:
 * - Internal Angular navigation chips.
 * - LocalStorage "share1" check to hide banner permanently.
 * - Tiny "X" button (10px) in top-left corner (Overlay).
 * - "X" appears only after 1 full animation loop.
 */

(function() {
  // --- Configuration ---
  const CONFIG = {
    links: {
      extension: 'https://chromewebstore.google.com/detail/odiokhddkoempbdcanepmjbichfifggo#utm_source=share_web&utm_medume=baner&utm_id=5',
      site: 'https://thechannel-viewer.clickandgo.cfd/?utm_source=share_web&utm_medume=baner&utm_id=5'
    },
    // זמן סיבוב אנימציה בשניות (אחרי זמן זה יופיע האיקס)
    scrollDuration: 60 
  };

  // --- HTML Content ---
  const MESSAGES = [
    '🎁 נהנים מהצפייה הנוחה? שתפו גם את החברים שלכם! שלחו להם קישור לתוסף: [EXT_LINK] או להתרשמות באתר: [SITE_LINK]',
    'יש לכם הצעה לשיפור או לתוספת מועילה? [CONTACT_LINK2] כדי שנוכל להוסיף!',
    '🛠️ בעיות בהתחברות לגוגל? אל דאגה! עיינו מיד ב[HELP_LINK] שלנו, או [CONTACT_LINK] אם הבעיה נמשכת.',
    'מצאתם באג? [CONTACT_LINK2] כדי שנוכל לתקן את זה לטובת כולנו!',
    '🚀 הגיע הזמן לשדרג את חווית הצפייה בערוצים! הערוצים המובילים בתוך דף הגימייל שלך – בקלות, במהירות ובכיף.',
  ];

  // --- Utility to replace placeholders ---
  function createTickerContent() {
    const extChip = `<button class="ph-chip ph-copy-chip" data-copy="${CONFIG.links.extension}">🧩 העתק קישור לתוסף</button>`;
    const siteChip = `<button class="ph-chip ph-copy-chip" data-copy="${CONFIG.links.site}">🌐 העתק קישור לאתר</button>`;
    
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
      /* Relative positioning is crucial so the absolute X button is relative to the banner */
      position: relative; 
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

    /* --- Close Button (Tiny Overlay X) --- */
    .ph-close-btn {
        position: absolute; /* Floating above content */
        top: 3px;           /* Top corner */
        right: 5px;  
        z-index: 10001;     /* Above the text ticker */
        
        background: rgba(0, 0, 0, 0.3); /* Semi-transparent background for contrast */
        border: none;
        color: rgba(255, 255, 255, 0.8);
        
        font-size: 10px;    /* Tiny text size as requested */
        width: 18px;        /* Small circular area */
        height: 18px;
        border-radius: 50%;
        
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        
        transition: all 0.3s ease;
        opacity: 0;         /* Hidden initially */
        pointer-events: none; /* Not clickable when hidden */
    }

    .ph-close-btn:hover {
        background: rgba(255, 0, 0, 0.6);
        color: white;
        transform: scale(1.1);
    }
    
    /* Class to make it appear */
    .ph-close-btn.show-close {
        opacity: 1;
        pointer-events: auto;
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

    /* --- Interactive Chips --- */
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
    .ph-nav-chip {
        background: #ffecd2;
        color: #1d2b64;
        font-weight: 600;
    }
    .ph-nav-chip:hover {
        background: white;
        color: #3a506b;
    }

    /* --- Toast --- */
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

    /* --- Animations --- */
    @keyframes ph-gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes ph-icon-pulse { 0% { transform: scale(1); } 100% { transform: scale(1.05); } }
    @keyframes ph-scroll-text {
        from { transform: translateX(0); }
        to { transform: translateX(50%); }
    }
    
    @media (max-width: 768px) {
        .ph-banner { height: auto; min-height: 55px; align-items: flex-start; padding: 8px 15px; }
        .ph-static-icon { display: none; }
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
      <!-- Static content on the RIGHT -->
      <div class="ph-static-icon">📢</div>

      <!-- Seamless Scrolling Ticker -->
      <div class="ph-ticker-wrap">
          <div class="ph-ticker-track">
              ${createTickerContent()}
              ${createTickerContent()}
          </div>
      </div>
      
      <!-- Tiny Overlay Close Button (Top Left) -->
      <button id="ph-close-btn" class="ph-close-btn" title="סגור את הבאנר">&#x2715;</button> 
    </div>

    <!-- Toast -->
    <div id="ph-toast" class="ph-toast">
        <span>✅</span> <span id="ph-toast-msg">הקישור הועתק בהצלחה!</span>
    </div>
  `;

  // --- Logic ---
  function init() {
    // 1. Check Local Storage ("share1")
    if (localStorage.getItem('share1') === 'dismissed') {
        // אם המשתמש כבר סגר בעבר, לא מציגים כלום
        return; 
    }
      
    const adContainer = document.getElementById('ad-placement-container');
    if (!adContainer) {
      console.warn('Banner Script: Container not found.');
      return;
    }

    // 2. Inject CSS & HTML
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    adContainer.innerHTML = bannerHtml;

    // 3. Bind Events
    bindCopyEvents();
    bindNavigationEvents();
    bindCloseEvent();

    // 4. Delayed Close Button
    // מציג את האיקס רק לאחר סיום אנימציה אחת (לפי ההגדרה ב-CONFIG)
    const closeBtn = document.getElementById('ph-close-btn');
    if (closeBtn) {
        setTimeout(() => {
            closeBtn.classList.add('show-close');
        }, (CONFIG.scrollDuration * 1000) - 13000);
    }
  }

  // --- Event Handlers ---

  function bindNavigationEvents() {
    const navButtons = document.querySelectorAll('.ph-chip.ph-nav-chip');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = btn.getAttribute('data-nav');
            const section = btn.getAttribute('data-section');

            if (window.theChannel && typeof window.theChannel.navigateTo === 'function') {
                const params = section ? { section } : {};
                window.theChannel.navigateTo(target, params);
            } else {
                console.error('TheChannel API not found');
                showToast('שגיאת ניווט פנימית', '❌');
            }
        });
    });
  }
  
  function bindCloseEvent() {
    const closeBtn = document.getElementById('ph-close-btn');
    const banner = document.getElementById('ph-main-banner');
    
    if (closeBtn && banner) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // שמירת הסימון שהמשתמש סגר את הבאנר
        localStorage.setItem('share1', 'dismissed');
        
        // מחיקת הבאנר מהדף
        banner.remove();
        
        // ניקוי טוסט אם קיים
        const toast = document.getElementById('ph-toast');
        if (toast) toast.remove();
      });
    }
  }

  function bindCopyEvents() {
    const copyBtns = document.querySelectorAll('.ph-chip.ph-copy-chip[data-copy]');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
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

  // --- Initialization ---
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
  } else {
      init();
  }

})();
