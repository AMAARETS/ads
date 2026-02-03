/**
 * GoodLink Banner - Final Enhanced Version
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
    '🚫 נמאס לכם מהמלצות שנועדו רק כדי להרוויח עליכם? בפורום שלנו אסור להעלות קישורי שותפים.',
    '🛒 בפורום שלנו ממליצים על מה שבאמת טוב, לא על מה שמשלם הכי הרבה.',
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
      height: 70px;
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
      cursor: pointer;
    }

    /* כפתור סגירה */
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

    .gl-logo-img { height: 50px; width: auto; margin-left: 12px; }
    .gl-text-group { display: flex; flex-direction: column; margin-left: 15px; pointer-events: none; }
    .gl-main-title { font-size: 17px; font-weight: 800; line-height: 1.1; }
    .gl-sub-title { font-size: 13px; color: #ffcc00; font-weight: 400; }

    .gl-btn-forum {
        background: #f39c12;
        color: white;
        border: none;
        padding: 6px 14px;
        border-radius: 15px;
        font-weight: bold;
        font-size: 13px;
        white-space: nowrap;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    /* טקסט רץ */
    .gl-ticker-area { flex-grow: 1; overflow: hidden; display: flex; align-items: center; pointer-events: none; }
    .gl-ticker-track { display: flex; width: fit-content; animation: gl-scroll-rtl ${CONFIG.scrollDuration}s linear infinite; }
    .gl-ticker-item { white-space: nowrap; font-size: 16px; padding-left: 150px; }

    /* כפתור "לפרסום" בצד שמאל - משודרג */
    .gl-adv-container {
        display: flex;
        align-items: center;
        padding: 0 15px;
        height: 100%;
        flex-shrink: 0;
        z-index: 10001;
    }

    .gl-adv-button {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.5);
        color: white;
        padding: 4px 12px;
        border-radius: 8px;
        font-size: 14px; /* גדול יותר */
        font-weight: bold;
        text-align: center;
        line-height: 1.2;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
    }

    .gl-adv-button:hover {
        background: white;
        color: #1e4a7a;
        transform: scale(1.05);
    }

    @keyframes gl-scroll-rtl { from { transform: translateX(0); } to { transform: translateX(100%); } }

    @media (max-width: 768px) {
        .gl-logo-img { height: 35px; }
        .gl-text-group, .gl-adv-container { display: none; }
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
          <button class="gl-btn-forum">כנסו עכשיו לפורום</button>
        </div>

        <!-- אמצע: טקסט רץ -->
        <div class="gl-ticker-area">
          <div class="gl-ticker-track">
            ${createTickerItems()}
            ${createTickerItems()}
          </div>
        </div>

        <!-- צד שמאל: כפתור לפרסום -->
        <div class="gl-adv-container">
          <div id="gl-adv-btn" class="gl-adv-button">
            לפרסום<br>לחץ כאן
          </div>
        </div>
      </div>
    `;

    adContainer.innerHTML = bannerHtml;

    const banner = document.getElementById('gl-banner');
    const closeBtn = document.getElementById('gl-close-btn');
    const advBtn = document.getElementById('gl-adv-btn');

    // --- לוגיקת לחיצות ---

    // 1. לחיצה על כל הבאנר (פתיחת פורום)
    banner.addEventListener('click', (e) => {
      // אם לחצו על ה-X או על כפתור הפרסום - אל תפתח את הפורום
      if (e.target.closest('#gl-close-btn') || e.target.closest('#gl-adv-btn')) {
        return;
      }
      window.open(CONFIG.links.forum, '_blank');
    });

    // 2. לחיצה על כפתור הפרסום (צור קשר)
    advBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.theChannel && typeof window.theChannel.navigateTo === 'function') {
        window.theChannel.navigateTo('contact', {});
      } else {
        console.error('TheChannel API not found for contact navigation');
      }
    });

    // 3. כפתור סגירה עם טיימר (20 שניות)
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
          banner.style.display = 'none'; // סגירה רק עד לרענון הבא
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
