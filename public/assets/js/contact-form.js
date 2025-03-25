/**
 * Contact Form JavaScript
 * Handles the submission of the contact form via AJAX
 */
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.php-email-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset form state
      let thisForm = this;
      let formData = new FormData(thisForm);
      
      // Convert FormData to JSON
      const formJSON = {};
      formData.forEach((value, key) => {
        formJSON[key] = value;
      });
      
      // Show loading indicator
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');
      
      // Send the form data
      fetch(thisForm.getAttribute('action'), {
        method: 'POST',
        body: JSON.stringify(formJSON),
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        
        if (data.success) {
          // Success message
          thisForm.querySelector('.sent-message').innerHTML = data.message;
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          // Error message
          throw new Error(data.message || 'Form submission failed');
        }
      })
      .catch(error => {
        // Display error message
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.error-message').innerHTML = error.message;
        thisForm.querySelector('.error-message').classList.add('d-block');
      });
    });
  }
}); 