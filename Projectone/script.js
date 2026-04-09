
// ===========================================
// DARK / LIGHT MODE TOGGLE
// ===========================================

// create toggle button in navbar
const themeToggle = document.createElement("button");
themeToggle.id = "themeToggle";
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.style.marginLeft = "20px";
themeToggle.style.background = "none";
themeToggle.style.border = "none";
themeToggle.style.fontSize = "1.3rem";
themeToggle.style.cursor = "pointer";

document.querySelector(".nav-links").appendChild(themeToggle);

// check saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

});





document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // TYPING ANIMATION
    // ===========================================
    
    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    
    const textArray = [
        'Full-Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            // Remove character
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Add character
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
    
    // ===========================================
    // NAVBAR SCROLL EFFECT
    // ===========================================
    
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===========================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ===========================================
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only apply smooth scroll if it's an anchor link
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===========================================
    // ACTIVE NAVIGATION LINK
    // ===========================================
    
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        let current = '';
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
    // ===========================================
    // SKILL BAR ANIMATION ON SCROLL
    // ===========================================
    
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // ===========================================
    // PROJECT CARDS ANIMATION
    // ===========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });
    
    // ===========================================
    // CONTACT FORM HANDLING
    // ===========================================
    
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Log form data (in production, you'd send this to a server)
        console.log('Form submitted:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);
        
        // Show success message
        successMessage.classList.add('show');
        successMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            successMessage.classList.remove('show');
        }, 5000);
    });
    
    // ===========================================
    // SCROLL TO TOP BUTTON
    // ===========================================
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===========================================
    // MOBILE MENU TOGGLE (Basic)
    // ===========================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ===========================================
    // PARALLAX EFFECT FOR HERO IMAGE
    // ===========================================
    
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // ===========================================
    // ANIMATED COUNTER FOR STATS
    // ===========================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace('+', ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    animateCounter(statNumber);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ===========================================
    // TECH ICON HOVER EFFECT
    // ===========================================
    
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    });
    
    // ===========================================
    // LAZY LOADING FOR IMAGES
    // ===========================================
    
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===========================================
    // CONSOLE MESSAGE
    // ===========================================
    
    console.log('%c👋 Hello Developer! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%cThanks for checking out the code! 🚀', 'color: #667eea; font-size: 14px;');
    console.log('%cIf you have any questions, feel free to reach out!', 'color: #764ba2; font-size: 12px;');
    
    // ===========================================
    // PAGE LOAD ANIMATION
    // ===========================================
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
});
