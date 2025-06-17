// Project data array
const projects = [
    {
      id: 1,
      title: "Movies review website",
      description: "A full-featured movies review platform which feautures live movie data, instant search + genre filters, add to your personal watchlist, dark and light mode with fully responsive design",
      link: "https://am-adewale.github.io/Realwale/",
      image: "moviereview.jpg",
      technologies: ["HTML", "CSS", "JAVASCRIPT", "Api integration"]
    },
    {
      id: 2,
      title: "Food Ecommerce Website",
      description: "OYESDELIGHT Food ordering website that allows users to browse menus, select meals, and place orders from oyesdelight a local resturant. This site is designed to provide seamless, user-friendly experiences that mimics ordering food in person but with convienience of doing it online.",
      link: "https://am-adewale.github.io/oyesdelight/",
      image: "2.jpg",
      technologies: ["HTML5", "CSS3", "Javascript", "PHP", "MSQL"]
    },
    {
      id: 3,
      title: "Developed a Cooperate site for a client",
      description: "The site mirrrors a modern interface enterprise rade service company, feuturing sections like solutions, industries, resourses and contact us. it demonstrate proficiency in responsive design, navigation architecture, and clean ui/ux practices",
      link: "https://ttech-fawn.vercel.app/",
      image: "4.jpg",
      technologies: ["HTML", "CSS", "javascript"]
    },
    {
      id: 4,
      title: "Weather App",
      description: "Real-time weather application with location detection, 5-day forecast, and interactive weather maps. Integrates with multiple weather APIs.",
      link: "#",
      image: "weather.jpg",
      technologies: ["React", "html", "API Integration"]
    }
  ];
  
  // DOM Elements
  const themeToggle = document.getElementById('theme-switch');
  const body = document.body;
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const typingText = document.getElementById('typing-text');
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const downloadCvBtn = document.getElementById('download-cv');
  
  // Theme Toggle Functionality
  function initTheme() {
      const savedTheme = localStorage.getItem('theme') || 'light';
      if (savedTheme === 'dark') {
          body.setAttribute('data-theme', 'dark');
          themeToggle.checked = true;
      }
  }
  
  themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
          body.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
      } else {
          body.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
      }
  });
  
  // Mobile Menu Toggle
  mobileMenuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on nav links
  document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
          nav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
      });
  });
  
  // Typing Animation
  const phrases = [
      "I build web applications",
      "I build digital experiences",
      "I create modern solutions",
      "Critical Thinking",
      "I develop user-friendly interfaces"
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function typeAnimation() {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
          typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
          currentCharIndex--;
          typeSpeed = 50;
      } else {
          typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
          currentCharIndex++;
          typeSpeed = 100;
      }
      
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
          typeSpeed = 2000; // Pause at end
          isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
          isDeleting = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          typeSpeed = 500; // Pause before next phrase
      }
      
      setTimeout(typeAnimation, typeSpeed);
  }
  
  // Testimonial Slider
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
      // Hide all testimonials
      testimonials.forEach((testimonial, i) => {
          testimonial.classList.remove('active');
          dots[i].classList.remove('active');
      });
      
      // Show current testimonial
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
  }
  
  function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
  }
  
  // Auto-play testimonials
  setInterval(nextTestimonial, 5000);
  
  // Dot navigation for testimonials
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentTestimonial = index;
          showTestimonial(currentTestimonial);
      });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              const headerHeight = document.querySelector('.header').offsetHeight;
              const targetPosition = target.offsetTop - headerHeight;
              
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Header scroll effect
  function handleHeaderScroll() {
      const header = document.querySelector('.header');
      const scrollTop = window.pageYOffset;
      
      if (scrollTop > 100) {
          header.style.backgroundColor = `${getComputedStyle(document.documentElement).getPropertyValue('--primary-bg').trim()}ee`;
          header.style.backdropFilter = 'blur(10px)';
      } else {
          header.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg').trim();
          header.style.backdropFilter = 'blur(10px)';
      }
  }
  
  // Project Details Popup Functionality
  function showProjectDetails(projectId) {
      const project = projects.find(p => p.id === projectId);
      if (!project) return;
  
      // Create popup overlay
      const overlay = document.createElement('div');
      overlay.className = 'project-popup-overlay';
      overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s ease;
      `;
  
      // Create popup content
      const popup = document.createElement('div');
      popup.className = 'project-popup';
      popup.style.cssText = `
          background-color: var(--primary-bg);
          padding: 2rem;
          border-radius: 10px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          transform: scale(0.9);
          transition: transform 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      `;
  
      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-popup';
      closeBtn.innerHTML = '<i class="fas fa-times"></i>';
      closeBtn.style.cssText = `
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-color);
      `;
  
      // Popup content
      popup.innerHTML = `
          <div class="project-popup-content">
              <div class="project-popup-image">
                  <img src="${project.image}" alt="${project.title}" style="width:100%; border-radius:8px; margin-bottom:1rem;">
              </div>
              <h3 style="margin-bottom:1rem; color:var(--accent-color);">${project.title}</h3>
              <p style="margin-bottom:1.5rem; line-height:1.6;">${project.description}</p>
              <div class="project-technologies" style="margin-bottom:1.5rem;">
                  <h4 style="margin-bottom:0.5rem;">Technologies Used:</h4>
                  <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                      ${project.technologies.map(tech => `<span style="background-color:var(--secondary-bg); padding:0.3rem 0.8rem; border-radius:20px; font-size:0.9rem;">${tech}</span>`).join('')}
                  </div>
              </div>
              <a href="${project.link}" target="_blank" class="project-link-btn" style="display:inline-block; background-color:var(--accent-color); color:white; padding:0.8rem 1.5rem; border-radius:5px; text-decoration:none; font-weight:bold; transition:background-color 0.3s;">
                  View Live Project <i class="fas fa-external-link-alt" style="margin-left:0.5rem;"></i>
              </a>
          </div>
      `;
  
      // Append close button
      popup.appendChild(closeBtn);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
  
      // Animate in
      setTimeout(() => {
          overlay.style.opacity = '1';
          popup.style.transform = 'scale(1)';
      }, 10);
  
      // Close functionality
      function closePopup() {
          overlay.style.opacity = '0';
          popup.style.transform = 'scale(0.9)';
          setTimeout(() => {
              document.body.removeChild(overlay);
              document.body.style.overflow = '';
          }, 300);
      }
  
      closeBtn.addEventListener('click', closePopup);
      overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
              closePopup();
          }
      });
  
      // Close with ESC key
      document.addEventListener('keydown', function escClose(e) {
          if (e.key === 'Escape') {
              closePopup();
              document.removeEventListener('keydown', escClose);
          }
      });
  }
  
  // Initialize project cards with click handlers
  function initProjectCards() {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach((card, index) => {
          const button = card.querySelector('.view-details-btn');
          
          button.addEventListener('click', (e) => {
              e.preventDefault();
              // Add click animation
              button.style.transform = 'scale(0.95)';
              setTimeout(() => {
                  button.style.transform = 'scale(1)';
              }, 150);
              
              // Show project details popup
              showProjectDetails(index + 1); // +1 because project IDs start at 1
          });
      });
  }
  
  // Intersection Observer for animations
  function initScrollAnimations() {
      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('animate');
              }
          });
      }, observerOptions);
      
      // Add animation class to elements
      const elementsToAnimate = [
          '.tech-stack',
          '.featured-projects',
          '.other-projects',
          '.client-feedback',
          '.services',
          '.cta-work'
      ];
      
      elementsToAnimate.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
              element.classList.add('animate-on-scroll');
              observer.observe(element);
          });
      });
      
      // Animate individual cards with delay
      const cards = document.querySelectorAll('.tech-item, .project-card, .service-box');
      cards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.1}s`;
          card.classList.add('animate-on-scroll');
          observer.observe(card);
      });
  }
  
  // Tech stack item hover effects
  function initTechStackEffects() {
      const techItems = document.querySelectorAll('.tech-item');
      
      techItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
              item.style.transform = 'translateY(-10px) scale(1.05)';
          });
          
          item.addEventListener('mouseleave', () => {
              item.style.transform = 'translateY(0) scale(1)';
          });
      });
  }
  
  // Service box hover effects
  function initServiceBoxEffects() {
      const serviceBoxes = document.querySelectorAll('.service-box');
      
      serviceBoxes.forEach(box => {
          box.addEventListener('mouseenter', () => {
              const icon = box.querySelector('.service-icon');
              icon.style.transform = 'scale(1.1) rotate(5deg)';
          });
          
          box.addEventListener('mouseleave', () => {
              const icon = box.querySelector('.service-icon');
              icon.style.transform = 'scale(1) rotate(0deg)';
          });
      });
  }
  
  // Featured project hover effects
  function initFeaturedProjectEffects() {
      const featuredProjects = document.querySelectorAll('.featured-project');
      
      featuredProjects.forEach(project => {
          const image = project.querySelector('.project-image img');
          
          project.addEventListener('mouseenter', () => {
              image.style.transform = 'scale(1.1)';
          });
          
          project.addEventListener('mouseleave', () => {
              image.style.transform = 'scale(1)';
          });
      });
  }
  
  // Scroll progress indicator
  function createScrollProgress() {
      const progressBar = document.createElement('div');
      progressBar.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 0%;
          height: 3px;
          background: linear-gradient(to right, var(--accent-color), var(--accent-hover));
          z-index: 9999;
          transition: width 0.1s ease;
      `;
      document.body.appendChild(progressBar);
      
      function updateProgress() {
          const scrollTop = window.pageYOffset;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          progressBar.style.width = scrollPercent + '%';
      }
      
      window.addEventListener('scroll', updateProgress);
  }
  
  // Initialize all functionality
  function init() {
      // Initialize theme
      initTheme();
      
      // Start typing animation after a delay
      setTimeout(typeAnimation, 1500);
      
      // Initialize animations and interactions
      initScrollAnimations();
      initProjectCards();
      initTechStackEffects();
      initServiceBoxEffects();
      initFeaturedProjectEffects();
      
      // Create scroll progress indicator
      createScrollProgress();
      
      // Add loading class removal
      window.addEventListener('load', () => {
          document.body.classList.add('loaded');
      });
  }
  
  // Debounce function for performance optimization
  function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
          const later = () => {
              clearTimeout(timeout);
              func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
      };
  }
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
  } else {
      init();
  }
  
  // Add resize handler for responsive adjustments
  window.addEventListener('resize', debounce(() => {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 768) {
          nav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
      }
  }, 250));
  
  // Add error handling for failed resource loads
  window.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
          e.target.style.display = 'none';
          console.log('Image failed to load:', e.target.src);
      }
  });
  
  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const submitBtn = contactForm.querySelector('.submit-btn');
          const btnText = submitBtn.querySelector('.btn-text');
          const originalBtnText = btnText.textContent;
          
          // Show loading state
          btnText.textContent = 'Sending...';
          submitBtn.disabled = true;
          
          try {
              const formData = new FormData(contactForm);
              const response = await fetch(contactForm.action, {
                  method: 'POST',
                  body: formData,
                  headers: {
                      'Accept': 'application/json'
                  }
              });
              
              if (response.ok) {
                  // Success message
                  formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                  formStatus.className = 'form-status success';
                  contactForm.reset();
              } else {
                  throw new Error('Form submission failed');
              }
          } catch (error) {
              // Error message
              formStatus.textContent = 'Oops! There was a problem sending your message. Please try again later.';
              formStatus.className = 'form-status error';
              console.error('Form submission error:', error);
          } finally {
              // Reset button state
              btnText.textContent = originalBtnText;
              submitBtn.disabled = false;
              
              // Hide status message after 5 seconds
              setTimeout(() => {
                  formStatus.style.opacity = '0';
                  setTimeout(() => {
                      formStatus.style.display = 'none';
                      formStatus.style.opacity = '1';
                  }, 300);
              }, 5000);
          }
      });
  }
  