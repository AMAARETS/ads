/**
 * GoodLink Banner - Final Version
 * Includes: Right Logo/Buttons, Middle Ticker, Left Advertise Link, and Click-to-Forum logic.
 */

(function() {
  // --- Configuration ---
  const CONFIG = {
    links: {
      forum: 'https://good-link.org/?utm_source=tosef&utm_medium=banner&utm_id=1',
      logoImg: 'https://cdn.jsdelivr.net/gh/AMAARETS/ads@main/%D7%9C%D7%95%D7%92%D7%95%20%D7%92%D7%95%D7%93%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%97%D7%AA%D7%95%D7%9A.jpg'
    },
    scrollDuration: 60 
  };

  const MESSAGES = [
    '🤝 <strong>המקום היחיד שנועד לעזרה הדדית אמיתית ונותן מקום לכל השאלות שתמיד היה לכם.</strong>',
    '🚫 נמאס לכם מהמלצות שנועדו רק כדי להרוויח עליכם? 💡 בפורום שלנו אסור להעלות קישורי שותפים.',
    '🛒 כאן ממליצים על מה שבאמת טוב, לא על מה שמשלם הכי הרבה.',
    '✨ 100% עזרה הדדית. 0% עמלות קישורים. בואו לקנות בראש שקט.'
  ];

  function createTickerItems() {
    return MESSAGES.map(msg => `<span class="gl-ticker-item">${msg}</span>`).join('');
  }

  // --- Styles (CSS) ---
  const styles = `
    .gl-banner-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 65px;
      padding: 0;
      box-sizing: border-box;
      background: linear-gradient(90deg, #1e4a7a 0%, #2980b9 40%, #7cb342 100%);
      color: white;
      font-family: 'Assistant', sans-serif;
      z-index: 9997;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      direction: rtl;
      overflow: hidden;
      border-radius: 4px;
      cursor: pointer; /* הפיכת כל הבאנר ללחיץ */
    }

    /* כפתור סגירה בצד ימין למעלה */
    .gl-close-btn {
        position: absolute;
        top: 3px;
        right: 5px;
        z-index: 10010;
        background: rgba(0, 0, 0, 0.3);
        border: none;
        color: rgba(255, 255, 255, 0.8);
        font-size: 10px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .gl-close-btn.gl-disabled { opacity: 0.3; cursor: wait; }
    .gl-close-btn:not(.gl-disabled):hover { background: #e74c3c; color: white; }

    /* חלק ימני קבוע */
    .gl-static-right {
        display: flex;
        align-items: center;
        padding: 0 15px;
        background: rgba(255, 255, 255, 0.05);
        height: 100%;
        flex-shrink: 0;
        z-index: 10001;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
    }

    .gl-logo-img { height: 45px; width: auto; margin-left: 12px; }
    .gl-text-group { display: flex; flex-direction: column; margin-left: 15px; pointer-events: none; }
    .gl-main-title { font-size: 16px; font-weight: 800; line-height: 1.1; }
    .gl-sub-title { font-size: 12px; color: #ffcc00; font-weight: 400; }

    .gl-btn-forum {
        background: #f39c12;
        color: white;
        border: none;
        padding: 5px 12px;
        border-radius: 15px;
        font-weight: bold;
        font-size: 12px;
        white-space: nowrap;
        cursor: pointer;
    }

    /* טקסט רץ */
    .gl-ticker-area { flex-grow: 1; overflow: hidden; display: flex; align-items: center; pointer-events: none; }
    .gl-ticker-track { display: flex; width: fit-content; animation: gl-scroll-rtl ${CONFIG.scrollDuration}s linear infinite; }
    .gl-ticker-item { white-space: nowrap; font-size: 15px; padding-left: 150px; }

    /* כפתור "לפרסום" בצד שמאל */
    .gl-advertise-link {
        flex-shrink: 0;
        padding: 0 15px;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.7);
        text-decoration: underline;
        cursor: pointer;
        z-index: 10001;
        transition: color 0.2s;
    }
    .gl-advertise-link:hover { color: #ffcc00; }

    @keyframes gl-scroll-rtl { from { transform: translateX(0); } to { transform: translateX(100%); } }

    @media (max-width: 768px) {
        .gl-logo-img { height: 35px; }
        .gl-text-group, .gl-advertise-link { display: none; }
        .gl-ticker-item { font-size: 13px; padding-left: 80px; }
    }
  `;

  function init() {
    const adContainer = document.getElementById('ad-placement-container');
    if (!adContainer) return;

    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    const bannerHtml = `
      <div id="gl-banner" class="gl-banner-wrapper">
        <button id="gl-close-btn" class="gl-close-btn gl-disabled" title="מחשב זמן...">✕</button>

        <!-- חלק ימני -->
        <div class="gl-static-right">
          <img src="${CONFIG.links.logoImg}" class="gl-logo-img" alt="GoodLink">
          <div class="gl-text-group">
            <span class="gl-main-title">פורום גוד-לינק</span>
            <span class="gl-sub-title">פורום הקניות החדש</span>
          </div>
          <button class="gl-btn-forum">כניסה לפורום</button>
        </div>

        <!-- אמצע: טקסט רץ -->
        <div class="gl-ticker-area">
          <div class="gl-ticker-track">
            ${createTickerItems()}
            ${createTickerItems()}
          </div>
        </div>

        <!-- צד שמאל: לפרסום -->
        <div id="gl-adv-btn" class="gl-advertise-link">לפרסום לחץ כאן</div>
      </div>
    `;

    adContainer.innerHTML = bannerHtml;

    const banner = document.getElementById('gl-banner');
    const closeBtn = document.getElementById('gl-close-btn');
    const advBtn = document.getElementById('gl-adv-btn');

    // --- לוגיקת לחיצות ---

    // 1. לחיצה על כל הבאנר
    banner.addEventListener('click', (e) => {
      // מניעת פתיחת הפורום אם לחצו על X או על "לפרסום"
      if (e.target.closest('#gl-close-btn') || e.target.closest('#gl-adv-btn')) {
        return;
      }
      window.open(CONFIG.links.forum, '_blank');
    });

    // 2. לחיצה על "לפרסום לחץ כאן" (ניווט פנימי)
    advBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.theChannel && typeof window.theChannel.navigateTo === 'function') {
        window.theChannel.navigateTo('contact', {});
      } else {
        console.error('TheChannel API not found for contact navigation');
      }
    });

    // 3. כפתור סגירה עם טיימר
    let timeLeft = 20;
    const timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        closeBtn.classList.remove('gl-disabled');
        closeBtn.title = "סגור";
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          banner.style.display = 'none';
        });
      }
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
