// Navigation Fix Script
document.addEventListener('DOMContentLoaded', function() {
  console.log('Navigation fix script loaded');

  // Make sure all sections are visible in the DOM
  const sections = [
    'hero', 'about', 'facts', 'skills', 'resume', 
    'portfolio', 'services', 'testimonials', 'contact'
  ];

  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.display = 'block';
      section.style.visibility = 'visible';
      section.style.opacity = '1';
      console.log(`Section ${sectionId} is now visible`);
    } else {
      console.warn(`Section ${sectionId} not found in the DOM`);
    }
  });

  // Fix navigation links in the sidebar - using correct selectors
  const navLinks = document.querySelectorAll('#navbar .nav-link.scrollto');
  console.log('Found nav links:', navLinks.length);
  
  // Create direct DOM navigation manually if selectors don't match
  if (navLinks.length === 0) {
    console.log('Creating manual navigation handlers');
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const links = navbar.getElementsByTagName('a');
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        
        // Clone and replace to remove existing event handlers
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Get the section ID from the href attribute
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            console.log(`Navigating to section: ${targetId}`);
            
            // Remove active class from all links
            const allLinks = navbar.getElementsByTagName('a');
            for (let j = 0; j < allLinks.length; j++) {
              allLinks[j].classList.remove('active');
            }
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to the section
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update URL hash
            window.location.hash = targetId;
          } else {
            console.warn(`Target section not found: ${targetId}`);
          }
        });
      }
    }
  } else {
    // Original handler if selectors work
    navLinks.forEach(link => {
      // Remove existing click handlers by cloning and replacing
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      // Add new click handler
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target section ID from href attribute
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          console.log(`Navigating to section: ${targetId}`);
          
          // Remove active class from all links
          navLinks.forEach(navLink => {
            navLink.classList.remove('active');
          });
          
          // Add active class to clicked link
          this.classList.add('active');
          
          // Scroll to the section
          targetSection.scrollIntoView({ behavior: 'smooth' });
          
          // Update URL hash
          window.location.hash = targetId;
        } else {
          console.warn(`Target section not found: ${targetId}`);
        }
      });
    });
  }

  // Handle initial hash in URL
  if (window.location.hash) {
    const initialTargetId = window.location.hash.substring(1);
    const initialTarget = document.getElementById(initialTargetId);
    
    if (initialTarget) {
      console.log(`Initial navigation to: ${initialTargetId}`);
      setTimeout(() => {
        initialTarget.scrollIntoView({ behavior: 'smooth' });
        
        // Update active class in navigation
        const navbar = document.getElementById('navbar');
        if (navbar) {
          const activeLink = navbar.querySelector(`a[href="#${initialTargetId}"]`);
          if (activeLink) {
            const allLinks = navbar.getElementsByTagName('a');
            for (let j = 0; j < allLinks.length; j++) {
              allLinks[j].classList.remove('active');
            }
            activeLink.classList.add('active');
          }
        }
      }, 500);
    }
  }

  // Force visibility of all nav menu items
  const navMenuItems = document.querySelectorAll('#navbar ul li');
  console.log('Found nav menu items:', navMenuItems.length);
  navMenuItems.forEach((item, index) => {
    item.style.display = 'block';
    item.style.visibility = 'visible';
    item.style.opacity = '1';
    console.log(`Menu item ${index} is now visible`);
  });

  /**
   * Mobile Navigation Improvements
   */
  // Mobile menu elements
  const menuTrigger = document.querySelector('.mobile-menu-trigger');
  const closeButton = document.querySelector('.mobile-nav-close');
  const overlay = document.querySelector('.sidebar-overlay');
  
  // Add this function to check if we're on mobile or desktop
  function isMobileDevice() {
    return window.innerWidth < 1200;
  }

  // Function to toggle the mobile menu
  function toggleMobileMenu() {
    document.body.classList.toggle('mobile-nav-active');
  }

  // Open the mobile menu when clicking the menu trigger
  if (menuTrigger) {
    menuTrigger.addEventListener('click', function() {
      if (isMobileDevice()) {
        toggleMobileMenu();
      }
    });
  }

  // Close the mobile menu when clicking the close button
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      if (isMobileDevice()) {
        toggleMobileMenu();
      }
    });
  }

  // Close the mobile menu when clicking the overlay
  if (overlay) {
    overlay.addEventListener('click', function() {
      if (isMobileDevice()) {
        toggleMobileMenu();
      }
    });
  }

  // Close the mobile menu when clicking on navigation links
  const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  mobileNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (isMobileDevice() && document.body.classList.contains('mobile-nav-active')) {
        toggleMobileMenu();
      }
    });
  });
  
  // Original navigation function - Make sure hashtag links work correctly
  let mobileNavbarlinks = document.querySelectorAll('.nav-menu a');
  
  function mobileNavbarlinksActive() {
    let position = window.scrollY + 200;
    mobileNavbarlinks.forEach(mobileNavbarlink => {
      if (!mobileNavbarlink.hash) return;
      let section = document.querySelector(mobileNavbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        mobileNavbarlink.classList.add('active');
      } else {
        mobileNavbarlink.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('load', mobileNavbarlinksActive);
  window.addEventListener('scroll', mobileNavbarlinksActive);
  
  // Make scrolling smoother
  document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add a window resize handler to manage transitions between mobile and desktop
  window.addEventListener('resize', function() {
    const isMobile = isMobileDevice();
    if (!isMobile && document.body.classList.contains('mobile-nav-active')) {
      // On desktop, remove mobile navigation active class
      document.body.classList.remove('mobile-nav-active');
    }
  });
}); 