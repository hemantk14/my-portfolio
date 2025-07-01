// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initParallaxEffects();
    initCounterAnimations();
    initBackToTop();
    initHeroButtons();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links (excluding hero buttons)
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        let isValid = true;
        
        // Name validation
        if (!nameInput.value.trim()) {
            showError('name-error', 'Name is required');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError('name-error', 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showError('email-error', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Message validation
        if (!messageInput.value.trim()) {
            showError('message-error', 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError('message-error', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.style.background = '#27ae60';
                
                // Reset form
                form.reset();
                
                // Show success message
                showSuccessMessage();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
            }, 2000);
        }
    });
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 2) {
            showError('name-error', 'Name must be at least 2 characters long');
        } else {
            clearError('name-error');
        }
    });
    
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() && !emailRegex.test(this.value.trim())) {
            showError('email-error', 'Please enter a valid email address');
        } else {
            clearError('email-error');
        }
    });
    
    messageInput.addEventListener('blur', function() {
        if (this.value.trim() && this.value.trim().length < 10) {
            showError('message-error', 'Message must be at least 10 characters long');
        } else {
            clearError('message-error');
        }
    });
}

// Helper functions for form validation
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            animation: slideInRight 0.5s ease;
        ">
            <i class="fas fa-check-circle"></i>
            Thank you! Your message has been sent successfully.
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Portfolio item interactions
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click functionality for portfolio items if needed
            console.log('Portfolio item clicked');
        });
    });
});

// Service card interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Testimonial card animations
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .success-notification {
        animation: slideInRight 0.5s ease;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxBack = document.querySelector('.parallax-back');
    const parallaxMid = document.querySelector('.parallax-mid');
    const parallaxFront = document.querySelector('.parallax-front');
    const heroShapes = document.querySelectorAll('.shape');
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax layers with different speeds
        if (parallaxBack) {
            const backSpeed = scrollTop * 0.2;
            parallaxBack.style.transform = `translateY(${backSpeed}px)`;
        }
        
        if (parallaxMid) {
            const midSpeed = scrollTop * 0.4;
            parallaxMid.style.transform = `translateY(${midSpeed}px)`;
        }
        
        if (parallaxFront) {
            const frontSpeed = scrollTop * 0.6;
            parallaxFront.style.transform = `translateY(${frontSpeed}px)`;
        }
        
        // Individual hero shapes parallax
        heroShapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrollTop * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
        
        // Service cards parallax on scroll
        serviceCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const translateY = (progress - 0.5) * 20;
                card.style.transform = `translateY(${translateY}px)`;
            }
        });
        
        // Portfolio items subtle parallax
        portfolioItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const translateY = (progress - 0.5) * 15;
                const rotateY = (progress - 0.5) * 5;
                item.style.transform = `translateY(${translateY}px) rotateY(${rotateY}deg)`;
            }
        });
        
        // Testimonial cards wave effect
        testimonialCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const translateY = Math.sin(progress * Math.PI + (index * 0.5)) * 10;
                const scale = 0.95 + (Math.sin(progress * Math.PI) * 0.05);
                card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            }
        });
    }
    
    // Mouse move parallax for hero section
    document.addEventListener('mousemove', function(e) {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const rect = hero.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            heroShapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const x = mouseX * speed * 10;
                const y = mouseY * speed * 10;
                shape.style.transform += ` translate(${x}px, ${y}px)`;
            });
        }
    });
    
    // Throttled scroll event for parallax
    window.addEventListener('scroll', throttle(updateParallax, 16));
    
    // Initial call
    updateParallax();
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Additional scroll-based animations can be added here
}, 16)); // ~60fps

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    const speed = 60; // Lower value = faster animation
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / speed;
        let current = 0;
        
        // Add animating class for pulse effect
        counter.classList.add('animating');
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                // Remove animating class when done
                setTimeout(() => {
                    counter.classList.remove('animating');
                }, 500);
            }
        };
        
        updateCounter();
    };
    
    // Observer to trigger animation when stats come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 100); // Stagger the animations
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }, 100));
    
    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add pulse effect when scrolling down
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            // Scrolling down
            backToTopButton.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                backToTopButton.style.animation = '';
            }, 600);
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 200));
}

// Hero buttons specific functionality
function initHeroButtons() {
    // Direct targeting of hero buttons
    const seeWorkButton = document.querySelector('a[href="#portfolio"]');
    const contactButton = document.querySelector('a[href="#contact"]');
    
    if (seeWorkButton) {
        seeWorkButton.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #4A90E2 0%, #7FB3D3 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeOut 0.5s ease 1s forwards;
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            visibility: hidden;
        }
    }
`;
document.head.appendChild(loadingStyle);
