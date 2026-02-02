/**
 * GoodLink Promo Banner - Smart Shopping
 * 
 * FEATURES:
 * - Color palette matched to GoodLink logo.
 * - Ticker with custom messaging.
 * - Non-permanent close (resets on refresh).
 * - Delayed close button.
 */

(function() {
  // --- Configuration ---
  const CONFIG = {
    links: {
      forum: 'https://good-link.org/?utm_source=tosef&utm_medium=banner&utm_id=1',
      join: 'https://good-link.org/register?utm_source=tosef&utm_medium=banner&utm_id=1'
    },
    scrollDuration: 50 // מהירות הגלילה (שניות)
  };

  // --- HTML Content ---
  const MESSAGES = [
    '🤝 <strong style="color: #ffcc00;">המקום היחיד שנועד לעזרה הדדית אמיתית.</strong>',
    '🚫 נמאס לכם מהמלצות שנועדו רק כדי להרוויח עליכם?',
    '💡 בפורום שלנו <strong>אסור</strong> להעלות קישורי שותפים. כאן ממליצים על מה שבאמת טוב, לא על מה שמשלם הכי הרבה.',
    '🛒 בואו לקנות בראש שקט: <strong>100% עזרה הדדית. 0% עמלות קישורים.</strong>',
    '✨ <strong>GoodLink: לקנות חכם ברשת.</strong> [JOIN_CHIP]'
  ];

  function createTickerContent() {
    const joinChip = `<button class="gl-chip gl-nav-chip" onclick="window.open('${CONFIG.links.forum}', '_blank')">הצטרפו לקהילה שלנו</button>`;
    
    return MESSAGES.map(msg => {
      let content = msg.replace('[JOIN_CHIP]', joinChip);
      return `<span class="gl-ticker-item">${content}</span>`;
    }).join('');
  }

  // --- Styles (CSS) ---
  const styles = `
    .gl-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 60px;
      padding: 0 15px;
      box-sizing: border-box;
      /* פלטת צבעים מהלוגו: כחול, ירוק ונגיעה של כתום */
      background: linear-gradient(90deg, #1e4a7a 0%, #2980b9 35%, #7cb342 70%, #9ccc65 100%);
      color: white;
      font-family: 'Assistant', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      z-index: 9999;
      box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.3);
      direction: rtl;
      overflow: hidden;
    }

    .gl-close-btn {
        position: absolute; 
        top: 5px;           
        left: 10px;  
        z-index: 10001;     
        background: rgba(0, 0, 0, 0.4);
        border: none;
        color: white;
        font-size: 12px;    
        width: 22px;        
        height: 22px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .gl-close-btn.gl-disabled {
        background: rgba(150, 150, 150, 0.5);
        color: rgba(255, 255, 255, 0.3);
        cursor: wait;
    }

    .gl-close-btn:not(.gl-disabled):hover {
        background: #e74c3c;
    }

    .gl-logo-icon {
        font-size: 26px;
        margin-left: 15px;
        flex-shrink: 0;
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
    }

    .gl-ticker-wrap {
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .gl-ticker-track {
        display: flex;
        width: fit-content;
        animation: gl-scroll-text ${CONFIG.scrollDuration}s linear infinite;
        align-items: center;
    }
    .gl-ticker-track:hover {
        animation-play-state: paused;
    }
    .gl-ticker-item {
        white-space: nowrap;
        font-size: 16px;
        padding-left: 200px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .gl-chip {
        display: inline-flex;
        background: #f39c12; /* הכתום מהלוגו */
        border: none;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        color: white;
        transition: 0.3s;
        margin-right: 10px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .gl-chip:hover {
        background: white;
        color: #1e4a7a;
        transform: translateY(-2px);
    }

    @keyframes gl-scroll-text {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @media (max-width: 768px) {
        .gl-banner { height: 50px; }
        .gl-logo-icon { display: none; }
        .gl-ticker-item { font-size: 14px; padding-left: 100px; }
    }
  `;

  // --- Logic ---
  function init() {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    const bannerHtml = `
      <div id="gl-main-banner" class="gl-banner">
        <div class="gl-logo-icon">🛒</div>
        <div class="gl-ticker-wrap">
            <div class="gl-ticker-track">
                ${createTickerContent()}
                ${createTickerContent()}
            </div>
        </div>
        <button id="gl-close-btn" class="gl-close-btn gl-disabled" title="מחשב זמן צפייה...">✕</button> 
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', bannerHtml);
    
    const closeBtn = document.getElementById('gl-close-btn');
    const banner = document.getElementById('gl-main-banner');

    // טיימר של 8 שניות עד שניתן לסגור
    let timeLeft = 8;
    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            closeBtn.classList.remove('gl-disabled');
            closeBtn.title = "סגור";
            closeBtn.addEventListener('click', () => {
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
