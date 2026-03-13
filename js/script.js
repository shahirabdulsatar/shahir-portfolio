// Modern Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initProfileImageFallback();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const sections = ['intro', 'companies', 'tradestack', 'contact'];
        const scrollPos = window.scrollY + 100;

        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add navbar background on scroll
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }

    // Event listeners
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLink();
        handleNavbarScroll();
    }, 10));

    // Initial calls
    updateActiveNavLink();
    handleNavbarScroll();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = 80; // Fixed navbar height
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Special animation for work cards
                if (entry.target.classList.contains('work-card')) {
                    const cards = document.querySelectorAll('.work-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }

                // Special animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const items = document.querySelectorAll('.timeline-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 200);
                    });
                }

                // Features display normally
            }
        });
    }, observerOptions);

    // Observe elements for animation (excluding tradestack-content)
    const animateElements = document.querySelectorAll(
        '.work-card, .timeline-item, .contact-method'
    );

    // Feature items display normally without animation

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Special setup for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });
}

// Profile image fallback
function initProfileImageFallback() {
    const profileImg = document.querySelector('.profile-image img');
    const profilePlaceholder = document.querySelector('.profile-placeholder');

    if (profileImg && profilePlaceholder) {
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        });

        profileImg.addEventListener('load', function() {
            profilePlaceholder.style.display = 'none';
            this.style.display = 'block';
        });
    }
}

// Enhanced learn more button interactions
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButtons = document.querySelectorAll('.learn-more');

    learnMoreButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Contact method interactions
function initContactMethods() {
    const contactMethods = document.querySelectorAll('.contact-method');

    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.15)';
        });

        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize contact methods when DOM is ready
document.addEventListener('DOMContentLoaded', initContactMethods);

// Work cards hover effects
function initWorkCards() {
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', initWorkCards);

// Phone mockup interactive effect
function initPhoneMockup() {
    const phoneMockup = document.querySelector('.phone-mockup');

    if (phoneMockup) {
        phoneMockup.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        phoneMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

document.addEventListener('DOMContentLoaded', initPhoneMockup);

// Parallax effect for sections (subtle)
function initParallax() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section, .what-section');

        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallaxUpdate);
}

// Initialize parallax on load
document.addEventListener('DOMContentLoaded', initParallax);

// Screenshot gallery interactions
function initScreenshots() {
    const screenshotItems = document.querySelectorAll('.screenshot-item');

    screenshotItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Add staggered animation delay
            this.style.animationDelay = `${index * 0.1}s`;
        });

        // Add click to enlarge functionality
        const img = item.querySelector('img');
        if (img) {
            img.addEventListener('click', function() {
                createImageModal(this.src, this.alt);
            });

            // Add cursor pointer to indicate clickable
            img.style.cursor = 'pointer';
        }
    });
}

// Create image modal for enlarged view
function createImageModal(imageSrc, imageAlt) {
    // Remove existing modal if present
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
                <button class="modal-close">&times;</button>
                <div class="modal-caption">${imageAlt}</div>
            </div>
        </div>
    `;

    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Add to DOM
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);

    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            closeModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function handleEsc(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEsc);
        }
    });
}

// Initialize screenshots when DOM is ready
document.addEventListener('DOMContentLoaded', initScreenshots);

// Features display normally without animation

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for resize events
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-dependent elements
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Trigger reflow for any responsive adjustments
        navbar.style.height = 'auto';
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Enable keyboard navigation for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(style);
}

// Add CSS for keyboard navigation
const keyboardNavStyles = document.createElement('style');
keyboardNavStyles.textContent = `
    body.keyboard-navigation .nav-link:focus,
    body.keyboard-navigation .learn-more:focus,
    body.keyboard-navigation .contact-method:focus {
        outline: 2px solid var(--accent-orange);
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardNavStyles);

// Loading optimization
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Trigger any delayed animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error reporting service
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        initNavigation,
        initSmoothScrolling
    };
}