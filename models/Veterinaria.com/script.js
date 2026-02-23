// Navegación Responsive
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if(burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}

// Validación y envío de Formulario de Citas
const appointmentForm = document.getElementById('appointment-form');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulación de envío
    const petName = e.target.querySelector('input[type="text"]').value;
    
    alert(`¡Gracias! Hemos recibido tu solicitud para ${petName}. Nos comunicaremos pronto para confirmar.`);
    
    appointmentForm.reset();
});

// Animación de scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});