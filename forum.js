/**
 * GoodLink Banner - Integrated Version
 * 
 * הזרקה לתוך ad-placement-container עם מיקום יחסי (Relative)
 */

(function() {
  // --- Configuration ---
  const CONFIG = {
    links: {
      forum: 'https://your-forum-link.com', // החלף בקישור האמיתי
      logoImg: 'https://cdn.jsdelivr.net/gh/AMAARETS/ads@main/%D7%9C%D7%95%D7%92%D7%95%20%D7%92%D7%95%D7%93%20%D7%9C%D7%99%D7%A0%D7%A7%20%D7%97%D7%AA%D7%95%D7%9A.jpg'
    },
    scrollDuration: 60 
  };

  const MESSAGES = [
    '🤝 <strong>המקום היחיד שנועד לעזרה הדדית אמיתית.</strong>',
    '🚫 נמאס לכם מהמלצות שנועדו רק כדי להרוויח עליכם?',
    '💡 בפורום שלנו אסור להעלות קישורי שותפים.',
    '🛒 כאן ממליצים על מה שבאמת טוב, לא על מה שמשלם הכי הרבה.',
    '✨ 100% עזרה הדדית. 0% עמלות קישורים. בואו לקנות בראש שקט.'
  ];

  function createTickerItems() {
    return MESSAGES.map(msg => `<span class="gl-ticker-item">${msg}</span>`).join('');
  }

  // --- Styles (CSS) ---
  const styles = `
    .gl-banner-wrapper {
      position: relative; /* גורם לפרסומת לזרום עם הדף */
      display: flex;
      align-items: center;
      width: 100%;
      height: 65px; /* גובה מותאם לשתי שורות */
      padding: 0;
      box-sizing: border-box;
      background: linear-gradient(90deg, #1e4a7a 0%, #2980b9 40%, #7cb342 100%);
      color: white;
      font-family: 'Assistant', sans-serif;
      z-index: 9997;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      direction: rtl;
      overflow: hidden;
      border-radius: 4px; /* עיגול פינות קל להתאמה לעיצוב אתר */
    }

    /* כפתור סגירה בצד ימין למעלה כפי שביקשת */
    .gl-close-btn {
        position: absolute;
        top: 3px;
        right: 5px;
        z-index: 10001;
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
        transition: all 0.2s;
    }
    .gl-close-btn.gl-disabled { opacity: 0.3; cursor: wait; }
    .gl-close-btn:not(.gl-disabled):hover { background: #e74c3c; color: white; }

    /* אזור סטטי ימני */
    .gl-static-section {
        display: flex;
        align-items: center;
        padding: 0 15px;
        background: rgba(255, 255, 255, 0.05);
        height: 100%;
        flex-shrink: 0;
        z-index: 10;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
    }

    .gl-logo-img {
        height: 45px;
        width: auto;
        margin-left: 12px;
    }

    .gl-content-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 15px;
    }

    .gl-main-title {
        font-size: 16px;
        font-weight: 800;
        line-height: 1.1;
    }

    .gl-sub-title {
        font-size: 12px;
        color: #ffcc00; /* הצבע הכתום מהלוגו */
        font-weight: 400;
    }

    .gl-cta-button {
        background: #f39c12;
        color: white;
        border: none;
        padding: 5px 12px;
        border-radius: 15px;
        font-weight: bold;
        cursor: pointer;
        font-size: 12px;
        white-space: nowrap;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .gl-cta-button:hover { background: white; color: #1e4a7a; }

    /* אזור טקסט רץ */
    .gl-ticker-container {
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
    }

    .gl-ticker-track {
        display: flex;
        width: fit-content;
        animation: gl-scroll-rtl ${CONFIG.scrollDuration}s linear infinite;
    }
    .gl-ticker-track:hover { animation-play-state: paused; }

    .gl-ticker-item {
        white-space: nowrap;
        font-size: 15px;
        padding-left: 150px; /* מרווח בין משפטים */
    }

    @keyframes gl-scroll-rtl {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }

    @media (max-width: 768px) {
        .gl-logo-img { height: 35px; }
        .gl-main-title { font-size: 14px; }
        .gl-sub-title { display: none; }
        .gl-ticker-item { font-size: 13px; padding-left: 80px; }
    }
  `;

  function init() {
    // 1. איתור הקונטיינר לפי הקוד המקורי
    const adContainer = document.getElementById('ad-placement-container');
    if (!adContainer) {
      console.warn('GoodLink Ads: ad-placement-container not found.');
      return;
    }

    // 2. הזרקת CSS
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    // 3. בניית ה-HTML
    const bannerHtml = `
      <div id="gl-banner" class="gl-banner-wrapper">
        <button id="gl-close-btn" class="gl-close-btn gl-disabled" title="מחשב זמן...">✕</button>

        <div class="gl-static-section">
          <img src="${CONFIG.links.logoImg}" class="gl-logo-img" alt="GoodLink">
          <div class="gl-content-group">
            <span class="gl-main-title">פורום גוד-לינק</span>
            <span class="gl-sub-title">פורום הקניות החדש</span>
          </div>
          <button class="gl-cta-button" onclick="window.open('${CONFIG.links.forum}', '_blank')">כניסה לפורום</button>
        </div>

        <div class="gl-ticker-container">
          <div class="gl-ticker-track">
            ${createTickerItems()}
            ${createTickerItems()}
          </div>
        </div>
      </div>
    `;

    // 4. הזרקת ה-HTML לתוך הקונטיינר
    adContainer.innerHTML = bannerHtml;

    // 5. לוגיקת סגירה (זמנית בלבד - ללא localStorage)
    const closeBtn = document.getElementById('gl-close-btn');
    const banner = document.getElementById('gl-banner');

    let timeLeft = 7; // שניות עד שניתן לסגור
    const timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        closeBtn.classList.remove('gl-disabled');
        closeBtn.title = "סגור";
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          banner.style.display = 'none'; // הסרה זמנית עד הרענון
        });
      }
    }, 1000);
  }

  // הפעלה
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
