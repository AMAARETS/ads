/**
 * promote-here.js
 *
 * A self-contained script to display a highly dynamic "Advertise with Us" slim banner,
 * featuring a SEAMLESS scrolling text ticker and animated elements.
 * Version: 5.1 (RTL Seamless Ticker Loop)
 */

(function() {
  // --- Configuration ---
  const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/click.go.script@gmail.com';

  // --- Styles (CSS) ---
  const styles = `
    /* Main Banner Styles - Slim, Fixed, with Ticker */
    .ph-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 55px;
      padding: 0 20px;
      box-sizing: border-box;
      background: linear-gradient(270deg, #1d2b64, #3a506b, #134e5e, #71b280);
      background-size: 800% 800%;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      z-index: 9997;
      overflow: hidden;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
      animation: ph-gradient-animation 18s ease infinite, ph-slide-in-up 0.8s 0.5s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
      direction: rtl; /* --- שינוי: הוספת כיווניות מימין לשמאל לבאנר הראשי --- */
    }
    
    /* Static content on the LEFT (visually, but first in DOM for RTL) */
    .ph-static-content {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }
    .ph-icon { font-size: 24px; margin-left: 15px; }
    .ph-text h3 { margin: 0; font-size: 16px; font-weight: 700; white-space: nowrap; }
    .ph-rotating-text-wrapper { font-size: 14px; opacity: 0.8; height: 18px; position: relative; overflow: hidden; }
    .ph-text-item { position: absolute; width: 100%; opacity: 0; transform: translateY(100%); transition: opacity 0.5s ease-out, transform 0.5s ease-out; }
    .ph-text-item.ph-active { opacity: 1; transform: translateY(0); }
    .ph-text-item.ph-exit { transform: translateY(-100%); }

    /* --- ENHANCED: Seamless Scrolling Ticker Styles --- */
    .ph-ticker-wrap {
        flex-grow: 1;
        overflow: hidden;
        margin: 0 25px;
        display: flex;
    }
    .ph-ticker-track {
        display: flex; /* Aligns the two text items side-by-side */
        width: fit-content; /* Let the content define the width */
        animation: ph-scroll-text 20s linear infinite;
    }
    .ph-ticker-track:hover {
        animation-play-state: paused; /* Pause on hover for readability */
    }
    .ph-ticker-item {
        white-space: nowrap;
        font-size: 15px;
        font-weight: 500;
        padding-left: 50px; /* --- שינוי: הריווח בצד שמאל כדי ליצור פער נכון ב-RTL --- */
    }

    /* Button on the RIGHT (visually, but last in DOM for RTL) */
    .ph-button {
      padding: 8px 20px;
      border: 1.5px solid white;
      border-radius: 50px;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.3s ease;
      animation: ph-button-pulse 3s infinite;
    }
    .ph-button:hover {
      background-color: white;
      color: #1d2b64;
      transform: scale(1.05);
      animation-play-state: paused;
    }

    /* Modal styles remain the same */
    .ph-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 9998; display: none; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s ease; }
    .ph-modal-overlay.ph-visible { display: flex; opacity: 1; }
    .ph-modal-content { direction: rtl; position: relative; background-color: white; padding: 30px; border-radius: 12px; width: 90%; max-width: 450px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transform: scale(0.95); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .ph-modal-overlay.ph-visible .ph-modal-content { transform: scale(1); }
    .ph-modal-close { position: absolute; top: 15px; right: 15px; /* Adjusted for RTL */ left: auto; background: none; border: none; font-size: 28px; color: #aaa; cursor: pointer; transition: transform 0.2s, color 0.2s; }
    .ph-modal-close:hover { color: #333; transform: rotate(90deg); }
    .ph-modal-content h2 { text-align: center; margin-top: 0; margin-bottom: 25px; color: #333; font-size: 24px; }
    .ph-form-group { margin-bottom: 18px; text-align: right; }
    .ph-form-group label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; color: #555; }
    .ph-form-group input, .ph-form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; font-size: 16px; transition: border-color 0.2s, box-shadow 0.2s; }
    .ph-form-group input:focus, .ph-form-group textarea:focus { outline: none; border-color: #1d2b64; box-shadow: 0 0 0 3px rgba(29, 43, 100, 0.2); }
    .ph-form-group textarea { resize: vertical; min-height: 90px; }
    .ph-form-submit { width: 100%; padding: 14px; border-radius: 8px; border: none; background: linear-gradient(135deg, #1d2b64 0%, #3a506b 100%); color: white; font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .ph-form-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
    .ph-form-submit:disabled { background: #ccc; cursor: not-allowed; }
    .ph-form-message { margin-top: 15px; padding: 12px; border-radius: 8px; text-align: center; display: none; opacity: 0; transition: opacity 0.3s; }
    .ph-form-message.ph-visible { display: block; opacity: 1; }
    .ph-form-message.ph-success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;}
    .ph-form-message.ph-error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;}

    /* Keyframe Animations */
    @keyframes ph-slide-in-up { from { bottom: -100px; } to { bottom: 0; } }
    @keyframes ph-gradient-animation { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes ph-button-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
    
    /* MODIFIED Animation for seamless loop - This is already correct for RTL scroll */
    @keyframes ph-scroll-text {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); } /* Move exactly the width of one item to the left */
    }
  `;

  // --- HTML Templates ---
  const bannerHtml = `
    <div id="ph-main-banner" class="ph-banner">
      <!-- Static content -->
      <div class="ph-static-content">
        <div class="ph-icon">✨</div>
        <div class="ph-text">
          <h3>העסק שלך במרכז הבמה</h3>
          <div class="ph-rotating-text-wrapper">
             <span class="ph-text-item ph-active">חשיפה ממוקדת לקהל שלך</span>
             <span class="ph-text-item">הגדלת מכירות ותנועה לאתר</span>
             <span class="ph-text-item">מיתוג חזק ומוביל בתחום</span>
          </div>
        </div>
      </div>
      
      <!-- Seamless Scrolling Ticker in the middle -->
      <div class="ph-ticker-wrap">
          <div class="ph-ticker-track">
              <span class="ph-ticker-item">
                  רוצים להגיע לאלפי לקוחות פוטנציאליים? פרסום ממוקד באתר שלנו הוא הדרך המהירה והיעילה ביותר להזניק את העסק שלכם קדימה.
              </span>
              <span class="ph-ticker-item">
                  רוצים להגיע לאלפי לקוחות פוטנציאליים? פרסום ממוקד באתר שלנו הוא הדרך המהירה והיעילה ביותר להזניק את העסק שלכם קדימה.
              </span>
          </div>
      </div>
      
      <!-- Button -->
      <button id="ph-contact-btn" class="ph-button">פרסמו אצלנו</button>
    </div>
  `;

  // --- Modal HTML (Unchanged logic, minor RTL style tweaks added above) ---
  const modalHtml = `
    <div id="ph-modal" class="ph-modal-overlay">
      <div class="ph-modal-content">
        <button id="ph-modal-close-btn" class="ph-modal-close">&times;</button>
        <h2>יצירת קשר לפרסום</h2>
        <form id="ph-contact-form">
          <input type="hidden" name="_subject" value="פנייה חדשה מהבאנר באתר!">
          <div class="ph-form-group"><label for="ph-name">שם מלא</label><input type="text" id="ph-name" name="name" required></div>
          <div class="ph-form-group"><label for="ph-email">כתובת אימייל</label><input type="email" id="ph-email" name="email" required></div>
          <div class="ph-form-group"><label for="ph-message">הודעה</label><textarea id="ph-message" name="message" required></textarea></div>
          <button type="submit" id="ph-submit-btn" class="ph-form-submit">שלח פנייה</button>
          <div id="ph-form-status-msg" class="ph-form-message"></div>
        </form>
      </div>
    </div>
  `;
    
  // --- JavaScript Logic (Unchanged) ---
  function init() {
    const adContainer = document.getElementById('ad-placement-container');
    if (!adContainer) {
      console.error('Promotion module: Container "ad-placement-container" not found.');
      return;
    }
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    adContainer.innerHTML = bannerHtml + modalHtml;
    setTimeout(() => document.getElementById('ph-main-banner').classList.add('ph-visible'), 500);
    bindEvents();
    startTextRotation();
  }
  
  function startTextRotation() {
      const textItems = document.querySelectorAll('.ph-text-item');
      if (textItems.length <= 1) return;
      let currentIndex = 0;
      setInterval(() => {
          const currentItem = textItems[currentIndex];
          const nextIndex = (currentIndex + 1) % textItems.length;
          const nextItem = textItems[nextIndex];
          currentItem.classList.remove('ph-active');
          currentItem.classList.add('ph-exit');
          nextItem.classList.remove('ph-exit');
          nextItem.classList.add('ph-active');
          setTimeout(() => currentItem.classList.remove('ph-exit'), 500);
          currentIndex = nextIndex;
      }, 3000);
  }

  function bindEvents() {
    const contactBtn = document.getElementById('ph-contact-btn');
    const modal = document.getElementById('ph-modal');
    const closeBtn = document.getElementById('ph-modal-close-btn');
    const form = document.getElementById('ph-contact-form');
    contactBtn.addEventListener('click', () => modal.classList.add('ph-visible'));
    const closeModal = () => {
      modal.classList.remove('ph-visible');
      const statusMsg = document.getElementById('ph-form-status-msg');
      setTimeout(() => statusMsg.classList.remove('ph-visible', 'ph-success', 'ph-error'), 300);
    };
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => (e.target === modal) && closeModal());
    form.addEventListener('submit', handleFormSubmit);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('ph-submit-btn');
    const statusMsg = document.getElementById('ph-form-status-msg');
    submitBtn.disabled = true;
    submitBtn.textContent = 'שולח...';
    statusMsg.classList.remove('ph-visible');
    try {
      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(event.target).entries())),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      showMessage('הפנייה נשלחה בהצלחה! ניצור קשר בהקדם.', 'success');
      event.target.reset();
      setTimeout(() => document.getElementById('ph-modal').classList.remove('ph-visible'), 2500);
    } catch (error) {
      console.error('Form submission error:', error);
      showMessage('אירעה שגיאה. אנא נסו שוב מאוחר יותר.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'שלח פנייה';
    }
  }

  function showMessage(message, type) {
    const statusMsg = document.getElementById('ph-form-status-msg');
    statusMsg.className = `ph-form-message ph-${type}`;
    statusMsg.textContent = message;
    statusMsg.classList.add('ph-visible');
  }

  init();

})();
