/**
 * promote-banner-angular-integrated.js
 *
 * Banner with internal Angular navigation and embedded copy chips.
 */

(function() {
  // --- Configuration ---
  const CONFIG = {
    links: {
      extension: 'https://chromewebstore.google.com/detail/odiokhddkoempbdcanepmjbichfifggo#utm_source=share_web&utm_medume=baner&utm_id=5',
      site: 'https://thechannel-viewer.clickandgo.cfd/?utm_source=share_web&utm_medume=baner&utm_id=5'
    },
    rotationInterval: 8000 // 8 seconds per slide
  };

  // --- Styles (CSS) ---
  const styles = `
    .ph-banner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 60px;
      padding: 0 15px;
      box-sizing: border-box;
      background: linear-gradient(270deg, #1d2b64, #3a506b, #134e5e, #71b280);
      background-size: 800% 800%;
      color: white;
      font-family: 'Assistant', -apple-system, BlinkMacSystemFont, sans-serif;
      z-index: 9997;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
      animation: ph-gradient 18s ease infinite;
      direction: rtl; /* Ensure RTL layout */
    }

    .ph-slider-container {
        position: relative;
        width: 100%;
        max-width: 900px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .ph-slide {
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
        opacity: 0;
        transform: translateY(15px);
        transition: opacity 0.5s ease, transform 0.5s ease;
        pointer-events: none;
    }

    .ph-slide.ph-active {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
    }

    .ph-text {
        font-size: 16px;
        font-weight: 500;
        white-space: nowrap;
    }

    /* --- Embedded Copy Chips --- */
    .ph-chips-wrapper {
        display: inline-flex;
        gap: 8px;
        margin-right: 8px;
        vertical-align: middle;
    }

    .ph-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.3);
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
        color: white;
        white-space: nowrap;
    }

    .ph-chip:hover {
        background: white;
        color: #1d2b64;
        font-weight: 600;
    }

    .ph-chip:active {
        transform: scale(0.95);
    }

    /* --- Internal Navigation Links --- */
    .ph-nav-link {
        color: #ffecd2;
        font-weight: 700;
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: color 0.2s;
        background: none;
        border: none;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
    }

    .ph-nav-link:hover {
        color: #fff;
        text-shadow: 0 0 8px rgba(255,255,255,0.6);
    }

    /* --- Toast Notification --- */
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
    }
    .ph-toast.show {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
    }

    @keyframes ph-gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

    @media (max-width: 768px) {
        .ph-banner { height: auto; padding: 12px; }
        .ph-slide { position: relative; display: none; text-align: center; flex-direction: column; gap: 6px; }
        .ph-slide.ph-active { display: flex; }
        .ph-text { white-space: normal; line-height: 1.4; }
        .ph-chips-wrapper { margin-right: 0; margin-top: 4px; }
    }
  `;

  // --- HTML Template ---
  const bannerHtml = `
    <div id="ph-main-banner" class="ph-banner">
      <div class="ph-slider-container">

        <!-- Slide 1: Share / Copy -->
        <div class="ph-slide ph-active">
            <span class="ph-text">
                ✨ נהניתם מהתוסף? ספרו גם לחברים!
                <div class="ph-chips-wrapper">
                    <button class="ph-chip" data-copy="${CONFIG.links.extension}">
                        <span>🧩</span> העתק תוסף
                    </button>
                    <button class="ph-chip" data-copy="${CONFIG.links.site}">
                        <span>🌐</span> העתק אתר
                    </button>
                </div>
            </span>
        </div>

        <!-- Slide 2: Help / Contact (Internal Nav) -->
        <div class="ph-slide">
            <span class="ph-text">
                🚧 לא מצליחים להתחבר? אל יאוש!
                <button class="ph-nav-link" data-nav="help" data-section="login">עיינו בדף העזרה</button>,
                ובמקרה הצורך
                <button class="ph-nav-link" data-nav="contact">תוכלו לשאול אותנו</button>
            </span>
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

    // 3. Bind Events & Start
    bindCopyEvents();
    bindNavigationEvents();
    startRotation();
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

  function startRotation() {
    const slides = document.querySelectorAll('.ph-slide');
    if (slides.length < 2) return;
    let index = 0;

    setInterval(() => {
        slides[index].classList.remove('ph-active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('ph-active');
    }, CONFIG.rotationInterval);
  }

  // Run
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
  } else {
      init();
  }

})();
