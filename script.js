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

// CV Download Functionality
downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a sample CV content (in a real scenario, you'd have an actual PDF file)
    const cvData = generateCVContent();
    
    // Create blob and download
    const blob = new Blob([cvData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'Adewale_CV.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show download notification
    showNotification('CV downloaded successfully!');
});

// Generate CV content (replace this with your actual CV data)
function generateCVContent() {
    return `
ADEWALE - FULL STACK DEVELOPER
===============================

CONTACT INFORMATION
-------------------
Email: adewaledev@gmail.com
Website: Your Portfolio URL
LinkedIn: Your LinkedIn Profile
GitHub: Your GitHub Profile

SUMMARY
-------
Full Stack Web Application Developer focused on creating elegant, efficient, and user-centered digital experiences. Passionate about building modern web applications using cutting-edge technologies.

TECHNICAL SKILLS
----------------
Frontend:
• HTML5, CSS3, JavaScript (ES6+)
• React.js
• Responsive Web Design
• Modern CSS Frameworks

Backend:
• PHP
• RESTful API Development
• Server-side Development

Database:
• MySQL
• Database Design & Optimization

Tools & Technologies:
• Git Version Control
• Web Performance Optimization
• Cross-browser Compatibility
• Mobile-first Development

FEATURED PROJECTS
-----------------
1. E-commerce Platform
   - Full-stack e-commerce solution with React frontend and PHP backend
   - Features: Secure payments, inventory management, user authentication
   - Technologies: React, PHP, MySQL

2. Task Management Application
   - Collaborative task management with real-time updates
   - Features: User authentication, project tracking, team collaboration
   - Technologies: JavaScript, PHP, MySQL

3. Portfolio Website
   - Personal portfolio showcasing projects and skills
   - Features: Responsive design, dark/light theme, smooth animations
   - Technologies: HTML, CSS, JavaScript

SERVICES OFFERED
----------------
• Custom Web Application Development
• Responsive Website Design
• Backend API Development
• Database Design & Management
• Website Performance Optimization
• Cross-platform Compatibility

EDUCATION & CERTIFICATIONS
--------------------------
[Add your educational background and certifications here]

EXPERIENCE
----------
[Add your professional experience here]

---
Generated on ${new Date().toLocaleDateString()}
© 2025 Adewale. All rights reserved.
`;
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Typing Animation
const phrases = [
    "I build web applications",
    "I build digital experiences",
    "I create modern solutions",
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

// Project card interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const button = card.querySelector('.view-details-btn');
        
        button.addEventListener('click', () => {
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Here you could add logic to show project details
            // For now, we'll just show an alert
            const projectTitle = card.querySelector('h4').textContent;
            showNotification(`Viewing details for: ${projectTitle}`);
        });
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

// Form validation for contact (if you add a contact form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
        
        // Arrow keys for testimonial navigation
        if (document.activeElement.closest('.testimonial-slider')) {
            if (e.key === 'ArrowLeft') {
                currentTestimonial = currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1;
                showTestimonial(currentTestimonial);
            } else if (e.key === 'ArrowRight') {
                nextTestimonial();
            }
        }
    });
}

// Performance optimization: Debounce scroll events
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

// Initialize all functionality
function init() {
    // Initialize theme
    initTheme();
    
    // Start typing animation after a delay
    setTimeout(typeAnimation, 1500);
    
    // Initialize scroll-based features
    const debouncedScrollHandler = debounce(() => {
        handleHeaderScroll();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Initialize animations and interactions
    initScrollAnimations();
    initProjectCards();
    initTechStackEffects();
    initServiceBoxEffects();
    initFeaturedProjectEffects();
    initKeyboardNavigation();
    initLazyLoading();
    
    // Create scroll progress indicator
    createScrollProgress();
    
    // Add loading class removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
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

// Export functions for potential external use
window.portfolioUtils = {
    showTestimonial,
    nextTestimonial,
    validateEmail,
    showNotification
};