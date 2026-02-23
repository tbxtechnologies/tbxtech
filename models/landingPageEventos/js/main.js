/* ===================================
   MAIN JAVASCRIPT
   Event Landing Page
   =================================== */

// ===================================
// GLOBAL VARIABLES
// ===================================

const eventDate = new Date('2026-06-15T17:00:00').getTime();

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
    const nav = document.getElementById('main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll effect on navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}


// ===================================
// COUNTDOWN TIMER
// ===================================

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update DOM
    document.getElementById('days').textContent = formatNumber(days);
    document.getElementById('hours').textContent = formatNumber(hours);
    document.getElementById('minutes').textContent = formatNumber(minutes);
    document.getElementById('seconds').textContent = formatNumber(seconds);
    
    // Check if countdown finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = `
            <div class="countdown-finished">
                <h3>¡El gran día ha llegado!</h3>
                <p>Gracias por acompañarnos en este momento especial</p>
            </div>
        `;
    }
}

function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

// Initialize countdown and update every second
let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();


// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
}


// ===================================
// GALLERY & LIGHTBOX
// ===================================

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    
    // Gallery data (you can replace with actual image URLs)
    const galleryData = [
        { 
            img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
            caption: 'Primera Cita - Otoño 2020'
        },
        { 
            img: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800',
            caption: 'Viaje a París - Primavera 2021'
        },
        { 
            img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800',
            caption: 'Aventura en las Montañas - Verano 2022'
        },
        { 
            img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800',
            caption: 'La Propuesta - Invierno 2023'
        },
        { 
            img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
            caption: 'Reunión Familiar - Navidad 2024'
        },
        { 
            img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
            caption: 'Día en la Playa - Verano 2025'
        }
    ];
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    lightboxPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        showImage(currentIndex);
    });
    
    lightboxNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryData.length;
        showImage(currentIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
        if (e.key === 'ArrowRight') lightboxNext.click();
    });
    
    function showImage(index) {
        lightboxImg.src = galleryData[index].img;
        lightboxCaption.textContent = galleryData[index].caption;
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}


// ===================================
// GUESTBOOK
// ===================================

function initGuestbook() {
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookMessages = document.getElementById('guestbook-messages');
    
    // Load existing messages
    loadGuestbookMessages();
    
    // Handle form submission
    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('guest-name').value.trim();
        const message = document.getElementById('guest-message').value.trim();
        
        if (name && message) {
            addGuestbookMessage(name, message);
            guestbookForm.reset();
        }
    });
}

function addGuestbookMessage(name, message) {
    // Get existing messages
    const messages = getGuestbookMessages();
    
    // Create new message object
    const newMessage = {
        id: Date.now(),
        name: name,
        message: message,
        date: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
    
    // Add to beginning of array
    messages.unshift(newMessage);
    
    // Save to localStorage
    localStorage.setItem('guestbookMessages', JSON.stringify(messages));
    
    // Reload messages
    loadGuestbookMessages();
}

function getGuestbookMessages() {
    const messages = localStorage.getItem('guestbookMessages');
    return messages ? JSON.parse(messages) : [];
}

function loadGuestbookMessages() {
    const messages = getGuestbookMessages();
    const container = document.getElementById('guestbook-messages');
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--color-text-light);">
                <p>Sé el primero en dejar un mensaje ❤️</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map(msg => `
        <div class="guest-message">
            <div class="guest-message-header">
                <span class="guest-name">${escapeHtml(msg.name)}</span>
                <span class="guest-date">${msg.date}</span>
            </div>
            <p class="guest-text">${escapeHtml(msg.message)}</p>
        </div>
    `).join('');
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


// ===================================
// SMOOTH SCROLL
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.getElementById('main-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// ===================================
// INITIALIZE ALL FUNCTIONS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initGallery();
    initGuestbook();
    initSmoothScroll();
    
    console.log('✨ Event Landing Page Initialized Successfully!');
});


// ===================================
// UTILITY FUNCTIONS
// ===================================

// Function to reset RSVP form (called from HTML)
window.resetRSVP = function() {
    document.getElementById('rsvp-form').style.display = 'block';
    document.getElementById('rsvp-confirmation').classList.remove('active');
    document.getElementById('rsvp-form').reset();
}
