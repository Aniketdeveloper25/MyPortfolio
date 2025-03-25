// Script to create placeholder images for the portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Create hero background placeholder
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    // Add an inline style to create a gradient background
    heroSection.style.background = 'linear-gradient(45deg, #040b14 0%, #173b6c 100%)';
  }
  
  // Create profile image placeholder
  const profileImg = document.querySelector('.profile img');
  if (profileImg) {
    // Use a placeholder image service
    profileImg.src = '/assets/img/profile-img1.jpg';
    profileImg.onerror = function() {
      // If placeholder service fails, use a colored div
      this.style.display = 'none';
      const parent = this.parentElement;
      const placeholder = document.createElement('div');
      placeholder.className = 'profile-placeholder';
      placeholder.style.width = '120px';
      placeholder.style.height = '120px';
      placeholder.style.borderRadius = '50%';
      placeholder.style.background = '#149ddd';
      placeholder.style.margin = '15px auto';
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.style.color = 'white';
      placeholder.style.fontSize = '32px';
      placeholder.style.fontWeight = 'bold';
      placeholder.innerHTML = 'AS'; // Initials
      parent.insertBefore(placeholder, this);
    };
  }
  
  // Create portfolio image placeholders
  document.querySelectorAll('.portfolio-wrap img').forEach((img, index) => {
    img.src = `https://via.placeholder.com/400x300?text=Portfolio+${index + 1}`;
    img.onerror = function() {
      // If placeholder service fails, use a colored div
      const placeholder = document.createElement('div');
      placeholder.style.width = '100%';
      placeholder.style.height = '300px';
      placeholder.style.background = `hsl(${index * 40}, 70%, 60%)`;
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.style.color = 'white';
      placeholder.style.fontSize = '24px';
      placeholder.innerHTML = `Portfolio ${index + 1}`;
      this.parentElement.insertBefore(placeholder, this);
      this.style.display = 'none';
    };
  });
  
  // Create testimonial image placeholders
  document.querySelectorAll('.testimonial-img').forEach((img, index) => {
    img.src = `https://via.placeholder.com/90x90?text=Testimonial+${index + 1}`;
    img.onerror = function() {
      // If placeholder service fails, use a colored div
      const placeholder = document.createElement('div');
      placeholder.style.width = '90px';
      placeholder.style.height = '90px';
      placeholder.style.borderRadius = '50%';
      placeholder.style.background = `hsl(${index * 60}, 70%, 60%)`;
      placeholder.style.margin = '0 auto';
      this.parentElement.insertBefore(placeholder, this);
      this.style.display = 'none';
    };
  });
}); 