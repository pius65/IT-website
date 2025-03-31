// Enhanced content protection
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Right-click is disabled');
});

// Prevent keyboard shortcuts for viewing source
document.addEventListener('keydown', function(e) {
    // Disable Ctrl+U (View source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        alert('Viewing source code is disabled');
        return false;
    }
    // Disable Ctrl+Shift+I and F12 (Developer tools)
    if ((e.ctrlKey && e.shiftKey && e.key === 'i') || e.key === 'F12') {
        e.preventDefault();
        return false;
    }
});

// Disable text selection and copying
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Disable copy/paste
document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert('Copying content is disabled');
});

// Additional protection for mobile devices
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Mobile menu toggle and other existing functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Form validation for all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to service cards on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
});