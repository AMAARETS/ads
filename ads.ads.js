/**
 * promote-here.js
 *
 * A self-contained script to display an attractive "Advertise with Us" banner.
 * It includes a fully functional contact form modal.
 * Version: 1.0
 */

(function() {
  // --- Configuration ---
  // The server endpoint where the form data will be sent.
  // IMPORTANT: You MUST replace this with your actual server URL that can process the data.
  const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/click.go.script@gmail.com';

  // --- Styles (CSS) ---
  // All styles are injected dynamically to avoid conflicts and keep this module self-contained.
  const styles = `
    /* Main Banner Styles */
    .ph-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 90px;
      padding: 0 25px;
      box-sizing: border-box;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .ph-banner-content {
      display: flex;
      align-items: center;
    }
    .ph-icon {
      font-size: 32px;
      margin-right: 20px;
      animation: ph-pulse 2s infinite;
    }
    .ph-text h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    .ph-text p {
      margin: 0;
      font-size: 14px;
      opacity: 0.8;
    }
    .ph-button {
      padding: 10px 22px;
      border: 1px solid white;
      border-radius: 20px;
      background-color: transparent;
      color: white;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    .ph-button:hover {
      background-color: white;
      color: #764ba2;
      transform: translateY(-2px);
    }

    /* Modal Styles */
    .ph-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 9998;
      display: none; /* Initially hidden */
      justify-content: center;
      align-items: center;
      animation: ph-fade-in 0.3s;
    }
    .ph-modal-overlay.ph-visible {
      display: flex;
    }
    .ph-modal-content {
      position: relative;
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      width: 90%;
      max-width: 450px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      animation: ph-slide-up 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .ph-modal-close {
      position: absolute;
      top: 15px;
      left: 15px;
      background: none;
      border: none;
      font-size: 24px;
      color: #aaa;
      cursor: pointer;
    }
    .ph-modal-close:hover { color: #333; }
    .ph-modal-content h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
      font-size: 22px;
    }
    
    /* Form Styles */
    .ph-form-group {
      margin-bottom: 15px;
    }
    .ph-form-group label {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      color: #555;
    }
    .ph-form-group input,
    .ph-form-group textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 15px;
    }
    .ph-form-group textarea {
      resize: vertical;
      min-height: 80px;
    }
    .ph-form-submit {
      width: 100%;
      padding: 12px;
      border-radius: 4px;
      border: none;
      background-color: #764ba2;
      color: white;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .ph-form-submit:hover {
      background-color: #667eea;
    }
    .ph-form-submit:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .ph-form-message {
      margin-top: 15px;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      display: none; /* Initially hidden */
    }
    .ph-form-message.ph-success { background-color: #d4edda; color: #155724; }
    .ph-form-message.ph-error { background-color: #f8d7da; color: #721c24; }

    /* Animations */
    @keyframes ph-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
    @keyframes ph-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes ph-slide-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
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

  /**
   * Main function to initialize the module.
   */
  function init() {
    // 1. Find the target container
    const adContainer = document.getElementById('ad-placement-container');
    if (!adContainer) {
      console.error('Promotion module: Container "ad-placement-container" not found.');
      return;
    }

    // 2. Inject CSS into the document's head
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    // 3. Inject HTML into the container
    adContainer.innerHTML = bannerHtml + modalHtml;

    // 4. Set up event listeners
    bindEvents();
  }

  /**
   * Binds all necessary event listeners for interactivity.
   */
  function bindEvents() {
    const contactBtn = document.getElementById('ph-contact-btn');
    const modal = document.getElementById('ph-modal');
    const closeBtn = document.getElementById('ph-modal-close-btn');
    const form = document.getElementById('ph-contact-form');

    // Open modal
    contactBtn.addEventListener('click', () => {
      modal.classList.add('ph-visible');
    });

    // Close modal function
    const closeModal = () => {
      modal.classList.remove('ph-visible');
    };

    // Close modal via button or by clicking the overlay
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) { // Only close if the dark overlay is clicked
        closeModal();
      }
    });

    // Handle form submission
    form.addEventListener('submit', handleFormSubmit);
  }

  /**
   * Handles the logic for form submission.
   * @param {Event} event The form submission event.
   */
  async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default browser submission
    
    const submitBtn = document.getElementById('ph-submit-btn');
    const statusMsg = document.getElementById('ph-form-status-msg');
    
    // Disable button and show sending state
    submitBtn.disabled = true;
    submitBtn.textContent = 'שולח...';
    statusMsg.style.display = 'none';

    // Collect form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Send data to the server endpoint
      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle server errors (like 404, 500)
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Success
      showMessage('הפנייה נשלחה בהצלחה! ניצור קשר בהקדם.', 'success');
      event.target.reset(); // Clear the form
      setTimeout(() => document.getElementById('ph-modal').classList.remove('ph-visible'), 2000);

    } catch (error) {
      // Handle network errors or server errors
      console.error('Form submission error:', error);
      showMessage('אירעה שגיאה בשליחת הפנייה. אנא נסו שוב מאוחר יותר.', 'error');
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = 'שלח פנייה';
    }
  }

  /**
   * Displays a status message in the form.
   * @param {string} message The message to display.
   * @param {'success' | 'error'} type The type of message.
   */
  function showMessage(message, type) {
    const statusMsg = document.getElementById('ph-form-status-msg');
    statusMsg.className = `ph-form-message ph-${type}`;
    statusMsg.textContent = message;
    statusMsg.style.display = 'block';
  }

  // Run the initialization function
  init();

})();
