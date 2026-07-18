document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOUSE GLOW EFFECT
    // ==========================================================================
    const mouseGlow = document.getElementById('mouseGlow');
    
    document.addEventListener('mousemove', (e) => {
        // Smoothly position the glowing background element under the cursor
        if (mouseGlow) {
            // Use requestAnimationFrame for performance
            window.requestAnimationFrame(() => {
                mouseGlow.style.left = `${e.clientX}px`;
                mouseGlow.style.top = `${e.clientY}px`;
            });
        }
    });

    // Add scale-up effect when hovering over cards or buttons
    const interactiveElements = document.querySelectorAll('.skill-card, .project-card, .about-info-card, .btn, .social-icon, .floating-glass-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (mouseGlow) {
                mouseGlow.style.width = '800px';
                mouseGlow.style.height = '800px';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (mouseGlow) {
                mouseGlow.style.width = '600px';
                mouseGlow.style.height = '600px';
            }
        });
    });

    // ==========================================================================
    // STICKY NAV & SCROLL INDICATOR
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('header, section');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on init

    // ==========================================================================
    // TYPING ANIMATION
    // ==========================================================================
    const typedTextSpan = document.getElementById('typedText');
    const textArray = ["Web Developer", "UI/UX Designer", "Graphic Designer", "Video Editor"];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 2000; // Delay between word cycle
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (typedTextSpan) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            }
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (typedTextSpan) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingSpeed);
            }
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 500);
        }
    }

    // Start Typing loop
    if (textArray.length && typedTextSpan) {
        setTimeout(type, 1000);
    }

    // ==========================================================================
    // SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.section-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it has revealed, we can unobserve if we want it to stay
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% is visible
        rootMargin: '0px 0px -50px 0px' // offset bottom trigger slightly
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // MAGNETIC BUTTONS
    // ==========================================================================
    const magneticBtns = document.querySelectorAll('.magnetic');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = this.getBoundingClientRect();
            // Calculate absolute offset of cursor relative to button center
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            // Translate the button slightly (magnetic pull strength)
            this.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
            
            // If button contains a span/inner wrapper, push it even more for parallax depth
            const text = this.querySelector('span, svg');
            if (text) {
                text.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            // Reset position on leave
            this.style.transform = 'translate(0px, 0px)';
            const text = this.querySelector('span, svg');
            if (text) {
                text.style.transform = 'translate(0px, 0px)';
            }
        });
    });

    // ==========================================================================
    // MOBILE NAV DRAWER
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('menu-open');
            menuToggle.classList.toggle('open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('menu-open');
                menuToggle.classList.remove('open');
            });
        });
    }

    // ==========================================================================
    // AMBIENT BACKGROUND PARTICLES (LIGHTWEIGHT INJECTOR)
    // ==========================================================================
    const createParticles = () => {
        const header = document.querySelector('.hero-section');
        if (!header) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.inset = '0';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.overflow = 'hidden';
        particlesContainer.style.zIndex = '1';
        header.appendChild(particlesContainer);

        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1; // 1px to 4px
            
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = Math.random() > 0.5 ? 'var(--clr-accent-teal)' : 'var(--clr-accent-peach)';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            
            // Random distribution
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Set speed variables
            const speed = Math.random() * 10 + 15; // 15s to 25s
            particle.style.animation = `floatParticle ${speed}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * -20}s`; // Offset start times
            
            particlesContainer.appendChild(particle);
        }
    };

    // Append CSS for dynamic particle floating to DOM head
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
            }
            50% {
                transform: translateY(-40px) translateX(20px);
            }
            100% {
                transform: translateY(0) translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
});
