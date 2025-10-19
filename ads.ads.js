/**
 * promote-here.js
 *
 * A self-contained script to display an attractive "Advertise with Us" banner.
 * It includes a fully functional contact form modal.
 * Version: 2.0 (Enhanced with dynamic styles and bug fixes)
 */

(function() {
  // --- Configuration ---
  const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/click.go.script@gmail.com';

  // --- Styles (CSS) ---
  const styles = `
    /* Main Banner Styles - Enhanced for Visual Appeal */
    .ph-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 90px;
      padding: 0 30px;
      box-sizing: border-box;
      background: linear-gradient(270deg, #667eea, #764ba2, #2c3e50, #764ba2);
      background-size: 600% 600%;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden; /* Ensures animations don't bleed out */
      animation: ph-gradient-animation 12s ease infinite;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    .ph-banner-content {
      display: flex;
      align-items: center;
    }
    .ph-icon {
      font-size: 38px;
      margin-right: 20px;
      animation: ph-launch 4s ease-in-out infinite;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
    .ph-text h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
    }
    .ph-text p {
      margin: 5px 0 0;
      font-size: 15px;
      opacity: 0.9;
    }
    .ph-button {
      padding: 12px 28px;
      border: 2px solid white;
      border-radius: 50px; /* More rounded */
      background-color: transparent;
      color: white;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }
    .ph-button:hover {
      background-color: white;
      color: #764ba2;
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    /* Modal Styles - Enhanced Animations */
    .ph-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 9998;
      display: none;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .ph-modal-overlay.ph-visible {
      display: flex;
      opacity: 1;
    }
    .ph-modal-content {
      position: relative;
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      width: 90%;
      max-width: 450px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transform: scale(0.95);
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .ph-modal-overlay.ph-visible .ph-modal-content {
      transform: scale(1);
    }
    .ph-modal-close {
      position: absolute;
      top: 15px;
      left: 15px; /* RTL support */
      background: none;
      border: none;
      font-size: 28px;
      color: #aaa;
      cursor: pointer;
      transition: transform 0.2s, color 0.2s;
    }
    .ph-modal-close:hover { 
      color: #333; 
      transform: rotate(90deg);
    }
    .ph-modal-content h2 {
      text-align: center;
      margin-top: 0;
      margin-bottom: 25px;
      color: #333;
      font-size: 24px;
    }
    
    /* Form Styles */
    .ph-form-group { margin-bottom: 18px; }
    .ph-form-group label {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      font-weight: 500;
      color: #555;
    }
    .ph-form-group input,
    .ph-form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-sizing: border-box;
      font-size: 16px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .ph-form-group input:focus,
    .ph-form-group textarea:focus {
      outline: none;
      border-color: #764ba2;
      box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.2);
    }
    .ph-form-group textarea { resize: vertical; min-height: 90px; }
    .ph-form-submit {
      width: 100%;
      padding: 14px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    .ph-form-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
    .ph-form-submit:disabled { background: #ccc; cursor: not-allowed; }
    .ph-form-message {
      margin-top: 15px;
      padding: 12px;
      border-radius: 8px;
      text-align: center;
      display: none;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .ph-form-message.ph-visible {
      display: block;
      opacity: 1;
    }
    .ph-form-message.ph-success { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;}
    .ph-form-message.ph-error { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;}

    /* Keyframe Animations */
    @keyframes ph-gradient-animation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes ph-launch {
      0% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-5deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
  `;

  // --- HTML Templates ---
  const bannerHtml = `
    <div class="ph-banner">
      <div class="ph-banner-content">
        <div class="ph-icon">🚀</div>
        <div class="ph-text">
          <h3>רוצים לפרסם כאן?</h3>
          <p>הגיעו לאלפי משתמשים בדיוק ברגע הנכון.</p>
        </div>
      </div>
      <button id="ph-contact-btn" class="ph-button">צרו קשר</button>
    </div>
  `;

  const modalHtml = `
    <div id="ph-modal" class="ph-modal-overlay">
      <div class="ph-modal-content">
        <button id="ph-modal-close-btn" class="ph-modal-close">&times;</button>
        <h2>יצירת קשר לפרסום</h2>
        <form id="ph-contact-form">
          <input type="hidden" name="_subject" value="פנייה חדשה מהבאנר באתר!">
          <div class="ph-form-group">
            <label for="ph-name">שם מלא</label>
            <input type="text" id="ph-name" name="name" required>
          </div>
          <div class="ph-form-group">
            <label for="ph-email">כתובת אימייל</label>
            <input type="email" id="ph-email" name="email" required>
          </div>
          <div class="ph-form-group">
            <label for="ph-message">הודעה</label>
            <textarea id="ph-message" name="message" required></textarea>
          </div>
          <button type="submit" id="ph-submit-btn" class="ph-form-submit">שלח פנייה</button>
          <div id="ph-form-status-msg" class="ph-form-message"></div>
        </form>
      </div>
    </div>
  `;

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
    bindEvents();
  }

  function bindEvents() {
    const contactBtn = document.getElementById('ph-contact-btn');
    const modal = document.getElementById('ph-modal');
    const closeBtn = document.getElementById('ph-modal-close-btn');
    const form = document.getElementById('ph-contact-form');

    contactBtn.addEventListener('click', () => {
      modal.classList.add('ph-visible');
    });

    const closeModal = () => {
      modal.classList.remove('ph-visible');
      
      // *** FIX: Reset form message when modal is closed ***
      const statusMsg = document.getElementById('ph-form-status-msg');
      setTimeout(() => { // Delay to allow fade-out animation
          statusMsg.classList.remove('ph-visible', 'ph-success', 'ph-error');
      }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
    form.addEventListener('submit', handleFormSubmit);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const submitBtn = document.getElementById('ph-submit-btn');
    const statusMsg = document.getElementById('ph-form-status-msg');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'שולח...';
    statusMsg.classList.remove('ph-visible', 'ph-success', 'ph-error');

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      showMessage('הפנייה נשלחה בהצלחה! ניצור קשר בהקדם.', 'success');
      event.target.reset();
      setTimeout(() => {
          document.getElementById('ph-modal').classList.remove('ph-visible');
          // Reset message after closing
          setTimeout(() => statusMsg.classList.remove('ph-visible', 'ph-success', 'ph-error'), 500);
      }, 2500);

    } catch (error) {
      console.error('Form submission error:', error);
      showMessage('אירעה שגיאה בשליחת הפנייה. אנא נסו שוב מאוחר יותר.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'שלח פנייה';
    }
  }

  function showMessage(message, type) {
    const statusMsg = document.getElementById('ph-form-status-msg');
    statusMsg.className = `ph-form-message ph-${type}`; // Reset classes
    statusMsg.textContent = message;
    statusMsg.classList.add('ph-visible');
  }

  init();

})();
