/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  // Log initialization start
  console.log('Starting main.js initialization');

  // Make sure all sections are visible
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, ensuring sections visibility');
    const sections = ['#hero', '#about', '#facts', '#skills', '#resume', '#portfolio', '#services', '#testimonials', '#contact'];
    sections.forEach(section => {
      const el = document.querySelector(section);
      if (el) {
        console.log(`Found section: ${section}`);
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      } else {
        console.warn(`Section not found: ${section}`);
      }
    });
  });

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) {
        console.warn(`Section not found for hash: ${navbarlink.hash}`);
        return;
      }
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      
      // Log navigation attempt
      console.log('Navigating to:', this.hash);
      
      // Remove active class from all links
      navbarlinks.forEach(navbarlink => {
        navbarlink.classList.remove('active');
      });
      
      // Add active class to current link
      this.classList.add('active');
      
      scrollto(this.hash)
    } else {
      console.warn('Target section not found:', this.hash);
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    try {
      console.log('Initializing Typed.js');
      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    } catch (e) {
      console.error('Error initializing Typed.js:', e);
    }
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    try {
      console.log('Initializing skills waypoint');
      new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function(direction) {
          let progress = select('.progress .progress-bar', true);
          progress.forEach((el) => {
            el.style.width = el.getAttribute('aria-valuenow') + '%'
          });
        }
      });
    } catch (e) {
      console.error('Error initializing Waypoint:', e);
    }
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      try {
        console.log('Initializing Isotope');
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        }, true);
      } catch (e) {
        console.error('Error initializing Isotope:', e);
      }
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  try {
    console.log('Initializing GLightbox');
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });
  } catch (e) {
    console.error('Error initializing GLightbox:', e);
  }

  /**
   * Portfolio details slider
   */
  try {
    console.log('Initializing portfolio Swiper');
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  } catch (e) {
    console.error('Error initializing portfolio Swiper:', e);
  }

  /**
   * Project carousels in portfolio section
   */
  document.querySelectorAll('.project-carousel').forEach(function(carousel) {
    new Swiper(carousel, {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: carousel.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: carousel.querySelector('.swiper-button-next'),
        prevEl: carousel.querySelector('.swiper-button-prev'),
      }
    });
  });

  /**
   * Testimonials slider
   */
  try {
    console.log('Initializing testimonials Swiper');
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    });
  } catch (e) {
    console.error('Error initializing testimonials Swiper:', e);
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    try {
      console.log('Initializing AOS');
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      } else {
        console.error('AOS is not defined');
      }
    } catch (e) {
      console.error('Error initializing AOS:', e);
    }

    // Initialize PureCounter
    try {
      console.log('Initializing PureCounter');
      if (typeof PureCounter !== 'undefined') {
        new PureCounter();
      } else {
        console.error('PureCounter is not defined');
      }
    } catch (e) {
      console.error('Error initializing PureCounter:', e);
    }
  });

  console.log('Main.js initialization complete');
})(); 