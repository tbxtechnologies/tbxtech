/* ============================================
   MAIN.JS - Interacciones Generales
   ============================================ */

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initSmoothScroll();
    initAnimationsOnScroll();
    loadBookings();
});

// ===== NAVEGACIÓN MÓVIL =====
function initNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Toggle del menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animación del icono hamburguesa
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Agregar clase al header cuando hay scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignorar si es solo '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMACIONES AL HACER SCROLL =====
function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .testimonial-card,
        .value-card,
        .about__bio,
        .section-header
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== MODAL =====
function showModal(title, message) {
    const modal = document.getElementById('confirmationModal');
    const modalTitle = modal.querySelector('.modal__title');
    const modalText = modal.querySelector('.modal__text');
    const closeBtn = modal.querySelector('#closeModal');
    
    modalTitle.textContent = title;
    modalText.textContent = message;
    modal.classList.add('active');
    
    // Cerrar modal
    const closeModal = () => {
        modal.classList.remove('active');
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
    
    // Cerrar con ESC
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// ===== UTILIDADES =====
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('es-ES', options);
}

function formatTime(time) {
    return time;
}

// ===== CARGAR RESERVAS =====
function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const myBookingsSection = document.getElementById('myBookings');
    const bookingsList = document.getElementById('bookingsList');
    
    if (bookings.length > 0) {
        myBookingsSection.style.display = 'block';
        bookingsList.innerHTML = bookings.map((booking, index) => `
            <div class="booking-item" data-index="${index}">
                <div class="booking-item__date">
                    📅 ${formatDate(booking.date)} - ${booking.time}
                </div>
                <div>${booking.service} (${booking.sessionType})</div>
                <div class="booking-item__actions">
                    <button class="booking-item__btn" onclick="cancelBooking(${index})">
                        Cancelar
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// ===== CANCELAR RESERVA =====
function cancelBooking(index) {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
        let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const cancelledBooking = bookings[index];
        
        // Eliminar reserva
        bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        // Liberar el horario
        const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
        const slotKey = `${cancelledBooking.date}-${cancelledBooking.time}`;
        const updatedSlots = bookedSlots.filter(slot => slot !== slotKey);
        localStorage.setItem('bookedSlots', JSON.stringify(updatedSlots));
        
        // Recargar la vista
        loadBookings();
        
        // Si hay calendario visible, recargarlo
        if (typeof generateCalendar === 'function') {
            generateCalendar();
        }
        
        showModal('Reserva Cancelada', 'Tu reserva ha sido cancelada exitosamente.');
    }
}

// Hacer la función global para que pueda ser llamada desde el HTML
window.cancelBooking = cancelBooking;

// ===== CONTADOR DE ESTADÍSTICAS (animación) =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Inicializar contadores cuando sean visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target;
            const target = parseInt(number.textContent.replace(/[^0-9]/g, ''));
            const suffix = number.textContent.replace(/[0-9]/g, '');
            
            animateCounter(number, target);
            if (suffix) {
                number.textContent = number.textContent + suffix;
            }
            
            statsObserver.unobserve(number);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__number').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== VALIDACIÓN DE FORMULARIOS =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Exportar funciones útiles
window.showModal = showModal;
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.formatDate = formatDate;
window.formatTime = formatTime;

console.log('✅ Main.js cargado correctamente');
