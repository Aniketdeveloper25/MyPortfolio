document.querySelector('.php-email-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  
  // Use fetch to send to a form service
  fetch('https://formspree.io/f/your-form-id', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Show success message
      document.querySelector('.sent-message').style.display = 'block';
      this.reset(); // Reset form
    } else {
      // Show error message
      document.querySelector('.error-message').style.display = 'block';
    }
  })
  .catch(error => {
    // Show error message
    document.querySelector('.error-message').textContent = "Server error. Please try again later.";
    document.querySelector('.error-message').style.display = 'block';
  })
  .finally(() => {
    document.querySelector('.loading').style.display = 'none';
  });
});
