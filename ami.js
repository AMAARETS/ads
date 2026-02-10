/**
 * Ami Sale Banner - Chinese Auction 2025
 * With Original "Advertise Here" Button
 */

(function() {
  // --- Configuration ---
  const CONFIG = {
    links: {
      site: 'https://sale.ami.org.il/?vt=7000099&affid=315726',
      logoImg: 'https://cdn.jsdelivr.net/gh/AMAARETS/ads@main/header_logo_desktop_black.webp' 
    },
    scrollDuration: 70 
  };

  const MESSAGES = [
    '🎁 <strong>הזדמנות של פעם בשנה: המכירה הסינית של עזר מציון יוצאת לדרך עם פרסי ענק!</strong>',
    '🚗 חולמים על רכב חדש? מטבח משודרג? עשרות פרסי יוקרה מחכים רק לכם.',
    '❤️ התרומה שלכם היא החיוך שלהם. מצטרפים למכירה ועוזרים למשפחות "עזר מציון".',
    '💰 אל תפספסו: חבילות כרטיסים משתלמות במיוחד - ככל שקונים יותר מרוויחים יותר!',
    '✨ מטבח חלומות, ריהוט לכל הבית, ועשרות אלפי שקלים לחשבון הבנק... הכל במרחק קליק.'
  ];

  function createTickerItems() {
    return MESSAGES.map(msg => `<span class="ami-ticker-item">${msg}</span>`).join('');
  }

  // --- Styles (CSS) ---
  const styles = `
    .ami-banner-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 70px;
      padding: 0;
      box-sizing: border-box;
      background: linear-gradient(90deg, #d32f2f 0%, #e67e22 50%, #f1c40f 100%);
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
    .gl-close-btn:not(.gl-disabled):hover { background: #000; color: white; }

    /* חלק ימני קבוע - עמי */
    .ami-static-right {
        display: flex;
        align-items: center;
        padding: 0 15px;
        background: rgba(255, 255, 255, 0.1);
        height: 100%;
        flex-shrink: 0;
        z-index: 10001;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
    }

    .ami-logo-img { height: 50px; width: auto; margin-left: 12px; }
    .ami-text-group { display: flex; flex-direction: column; margin-left: 15px; pointer-events: none; }
    .ami-main-title { font-size: 17px; font-weight: 800; line-height: 1.1; }
    .ami-sub-title { font-size: 13px; color: #ffffff; font-weight: 400; opacity: 0.9; }

    .ami-btn-cta {
        background: #ffffff;
        color: #d32f2f;
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
    .ami-ticker-area { flex-grow: 1; overflow: hidden; display: flex; align-items: center; pointer-events: none; }
    .ami-ticker-track { display: flex; width: fit-content; animation: gl-scroll-rtl ${CONFIG.scrollDuration}s linear infinite; }
    .ami-ticker-item { white-space: nowrap; font-size: 16px; padding-left: 150px; }

    /* כפתור "לפרסום" - זהה למקור */
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
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        line-height: 1.2;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
    }

    .gl-adv-button:hover {
        background: white;
        color: #d32f2f;
        transform: scale(1.05);
    }

    @keyframes gl-scroll-rtl { from { transform: translateX(0); } to { transform: translateX(100%); } }

    @media (max-width: 768px) {
        .ami-logo-img { height: 35px; }
        .ami-text-group, .gl-adv-container { display: none; }
        .ami-ticker-item { font-size: 13px; padding-left: 80px; }
    }
  `;

  function init() {
    const adContainer = document.getElementById('ad-placement-container');
    if (!adContainer) return;

    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    const bannerHtml = `
      <div id="ami-banner" class="ami-banner-wrapper">
        <button id="gl-close-btn" class="gl-close-btn gl-disabled" title="מחשב זמן...">✕</button>

        <!-- חלק ימני (עמי) -->
        <div class="ami-static-right">
          <img src="${CONFIG.links.logoImg}" class="ami-logo-img" alt="עמי">
          <div class="ami-text-group">
            <span class="ami-main-title">המכירה הסינית</span>
            <span class="ami-sub-title">עזר מציון איתך. תמיד.</span>
          </div>
          <button class="ami-btn-cta">כנסו להשתתף</button>
        </div>

        <!-- אמצע: טקסט רץ -->
        <div class="ami-ticker-area">
          <div class="ami-ticker-track">
            ${createTickerItems()}
            ${createTickerItems()}
          </div>
        </div>

        <!-- צד שמאל: כפתור לפרסום (הכפתור המקורי) -->
        <div class="gl-adv-container">
          <div id="gl-adv-btn" class="gl-adv-button">
            לפרסום<br>לחץ כאן
          </div>
        </div>
      </div>
    `;

    adContainer.innerHTML = bannerHtml;

    const banner = document.getElementById('ami-banner');
    const closeBtn = document.getElementById('gl-close-btn');
    const advBtn = document.getElementById('gl-adv-btn');

    // 1. לחיצה על כל הבאנר (פתיחת המכירה של עמי)
    banner.addEventListener('click', (e) => {
      if (e.target.closest('#gl-close-btn') || e.target.closest('#gl-adv-btn')) {
        return;
      }
      window.open(CONFIG.links.site, '_blank');
    });

    // 2. לחיצה על כפתור הפרסום (לוגיקה מקורית)
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
