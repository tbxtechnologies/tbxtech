/* ============================================
   AGENDA.JS - Sistema de Reservas y Calendario
   ============================================ */

// ===== CONFIGURACIÓN =====
const CONFIG = {
    // Horarios disponibles (formato 24h)
    availableHours: [
        '09:00', '10:00', '11:00', '12:00',
        '14:00', '15:00', '16:00', '17:00', '18:00'
    ],
    
    // Días de la semana disponibles (0 = Domingo, 6 = Sábado)
    availableDays: [1, 2, 3, 4, 5], // Lunes a Viernes
    
    // Duración de cada sesión (minutos)
    sessionDuration: 60,
    
    // Días hacia adelante que se muestran en el calendario
    daysAhead: 14
};

// ===== ESTADO GLOBAL =====
let currentWeekStart = new Date();
let selectedSlot = null;
let bookedSlots = [];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    initBookingForm();
    loadBookedSlots();
});

// ===== INICIALIZAR CALENDARIO =====
function initCalendar() {
    // Ajustar a lunes de la semana actual
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Si es domingo, ir al lunes anterior
    currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() + diff);
    currentWeekStart.setHours(0, 0, 0, 0);
    
    generateCalendar();
    
    // Event listeners para navegación
    document.getElementById('prevWeek').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        generateCalendar();
    });
    
    document.getElementById('nextWeek').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        generateCalendar();
    });
}

// ===== GENERAR CALENDARIO =====
function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const calendarTitle = document.getElementById('calendarTitle');
    
    // Actualizar título
    const endOfWeek = new Date(currentWeekStart);
    endOfWeek.setDate(currentWeekStart.getDate() + 6);
    
    const startMonth = currentWeekStart.toLocaleDateString('es-ES', { month: 'long' });
    const endMonth = endOfWeek.toLocaleDateString('es-ES', { month: 'long' });
    
    if (startMonth === endMonth) {
        calendarTitle.textContent = `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} ${currentWeekStart.getFullYear()}`;
    } else {
        calendarTitle.textContent = `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} - ${endMonth} ${currentWeekStart.getFullYear()}`;
    }
    
    // Generar días de la semana
    calendarDays.innerHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        
        // Solo mostrar días laborables según configuración
        if (!CONFIG.availableDays.includes(date.getDay())) {
            continue;
        }
        
        // No mostrar días pasados
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) {
            continue;
        }
        
        const daySlot = createDaySlot(date);
        calendarDays.appendChild(daySlot);
    }
}

// ===== CREAR SLOT DE DÍA =====
function createDaySlot(date) {
    const daySlot = document.createElement('div');
    daySlot.className = 'day-slot';
    
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    
    daySlot.innerHTML = `
        <div class="day-slot__header">
            <div>
                <div class="day-slot__date">${day} ${month}</div>
                <div class="day-slot__day">${dayName}</div>
            </div>
        </div>
        <div class="day-slot__times" id="times-${date.toISOString().split('T')[0]}">
        </div>
    `;
    
    const timesContainer = daySlot.querySelector('.day-slot__times');
    
    CONFIG.availableHours.forEach(time => {
        const timeSlot = createTimeSlot(date, time);
        timesContainer.appendChild(timeSlot);
    });
    
    return daySlot;
}

// ===== CREAR SLOT DE HORA =====
function createTimeSlot(date, time) {
    const timeSlot = document.createElement('button');
    timeSlot.className = 'time-slot';
    timeSlot.textContent = time;
    timeSlot.type = 'button';
    
    const dateStr = date.toISOString().split('T')[0];
    const slotKey = `${dateStr}-${time}`;
    
    // Verificar si ya está reservado
    if (bookedSlots.includes(slotKey)) {
        timeSlot.classList.add('time-slot--booked');
        timeSlot.disabled = true;
        return timeSlot;
    }
    
    // Verificar si es una hora pasada del día actual
    const now = new Date();
    const [hours, minutes] = time.split(':');
    const slotDateTime = new Date(date);
    slotDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    if (slotDateTime < now) {
        timeSlot.classList.add('time-slot--booked');
        timeSlot.disabled = true;
        return timeSlot;
    }
    
    // Event listener para seleccionar
    timeSlot.addEventListener('click', () => {
        selectTimeSlot(date, time, timeSlot);
    });
    
    return timeSlot;
}

// ===== SELECCIONAR SLOT DE TIEMPO =====
function selectTimeSlot(date, time, element) {
    // Remover selección anterior
    document.querySelectorAll('.time-slot--selected').forEach(slot => {
        slot.classList.remove('time-slot--selected');
    });
    
    // Seleccionar nuevo slot
    element.classList.add('time-slot--selected');
    
    selectedSlot = {
        date: date.toISOString().split('T')[0],
        time: time,
        dateObj: date
    };
    
    updateSelectedSlotDisplay();
}

// ===== ACTUALIZAR DISPLAY DE SLOT SELECCIONADO =====
function updateSelectedSlotDisplay() {
    const selectedSlotEl = document.getElementById('selectedSlot');
    
    if (selectedSlot) {
        const dateStr = new Date(selectedSlot.date).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        selectedSlotEl.classList.add('selected-slot--active');
        selectedSlotEl.innerHTML = `
            <span class="selected-slot__icon">✓</span>
            <span class="selected-slot__text">
                <strong>${dateStr}</strong> a las <strong>${selectedSlot.time}</strong>
            </span>
        `;
    } else {
        selectedSlotEl.classList.remove('selected-slot--active');
        selectedSlotEl.innerHTML = `
            <span class="selected-slot__icon">📅</span>
            <span class="selected-slot__text">Selecciona un horario en el calendario</span>
        `;
    }
}

// ===== INICIALIZAR FORMULARIO DE RESERVA =====
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleBookingSubmit();
    });
}

// ===== MANEJAR ENVÍO DE RESERVA =====
function handleBookingSubmit() {
    // Validar que hay un slot seleccionado
    if (!selectedSlot) {
        showModal('Error', 'Por favor selecciona un horario en el calendario.');
        return;
    }
    
    // Obtener datos del formulario
    const formData = {
        name: document.getElementById('clientName').value.trim(),
        email: document.getElementById('clientEmail').value.trim(),
        phone: document.getElementById('clientPhone').value.trim(),
        service: document.getElementById('serviceType').value,
        sessionType: document.getElementById('sessionType').value,
        notes: document.getElementById('notes').value.trim(),
        date: selectedSlot.date,
        time: selectedSlot.time
    };
    
    // Validaciones
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.sessionType) {
        showModal('Error', 'Por favor completa todos los campos requeridos.');
        return;
    }
    
    if (!validateEmail(formData.email)) {
        showModal('Error', 'Por favor ingresa un email válido.');
        return;
    }
    
    if (!validatePhone(formData.phone)) {
        showModal('Error', 'Por favor ingresa un teléfono válido.');
        return;
    }
    
    // Guardar reserva
    saveBooking(formData);
}

// ===== GUARDAR RESERVA =====
function saveBooking(bookingData) {
    // Obtener reservas existentes
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Agregar nueva reserva
    bookings.push({
        ...bookingData,
        id: Date.now(),
        createdAt: new Date().toISOString()
    });
    
    // Guardar en localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Marcar slot como reservado
    const slotKey = `${bookingData.date}-${bookingData.time}`;
    bookedSlots.push(slotKey);
    localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));
    
    // Obtener nombre del servicio
    const serviceNames = {
        'individual': 'Sesión Individual',
        'mensual': 'Paquete Mensual',
        'trimestral': 'Programa Trimestral'
    };
    
    const sessionTypeNames = {
        'presencial': 'Presencial',
        'online': 'Online (Zoom)'
    };
    
    // Mensaje de confirmación
    const confirmationMessage = `
        Tu reserva ha sido confirmada exitosamente.
        
        📅 Fecha: ${formatDate(bookingData.date)}
        🕐 Hora: ${bookingData.time}
        📋 Servicio: ${serviceNames[bookingData.service]}
        💻 Modalidad: ${sessionTypeNames[bookingData.sessionType]}
        
        Te enviaremos un email de confirmación a ${bookingData.email} con todos los detalles.
    `;
    
    showModal('¡Reserva Confirmada!', confirmationMessage);
    
    // Limpiar formulario
    document.getElementById('bookingForm').reset();
    selectedSlot = null;
    updateSelectedSlotDisplay();
    
    // Recargar calendario y lista de reservas
    generateCalendar();
    loadBookings();
    
    // Scroll a la sección de reservas
    setTimeout(() => {
        document.getElementById('myBookings').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }, 500);
}

// ===== CARGAR SLOTS RESERVADOS =====
function loadBookedSlots() {
    bookedSlots = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
}

// ===== EXPORTAR RESERVA A CALENDARIO (simulado) =====
function exportToCalendar(booking) {
    // En producción, esto se conectaría con Google Calendar API
    // Por ahora, generamos un archivo .ics descargable
    
    const startDate = new Date(`${booking.date}T${booking.time}:00`);
    const endDate = new Date(startDate.getTime() + CONFIG.sessionDuration * 60000);
    
    const formatDateForICS = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Coach Ana Martínez//ES
BEGIN:VEVENT
UID:${booking.id}@coaching.com
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
SUMMARY:Sesión de Coaching con Ana Martínez
DESCRIPTION:Tipo: ${booking.service}\\nModalidad: ${booking.sessionType}
LOCATION:${booking.sessionType === 'online' ? 'Online - Zoom' : 'Presencial'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    
    // Crear y descargar archivo
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sesion-coaching-${booking.date}.ics`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    showModal('Exportado', 'El evento ha sido descargado. Ábrelo para agregarlo a tu calendario.');
}

// ===== LIMPIAR DATOS (para desarrollo/demo) =====
function clearAllBookings() {
    if (confirm('¿Estás seguro de que deseas eliminar todas las reservas? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('bookings');
        localStorage.removeItem('bookedSlots');
        bookedSlots = [];
        loadBookings();
        generateCalendar();
        showModal('Datos Eliminados', 'Todas las reservas han sido eliminadas.');
    }
}

// Exponer función para consola (útil para demo/desarrollo)
window.clearAllBookings = clearAllBookings;
window.exportToCalendar = exportToCalendar;

console.log('✅ Agenda.js cargado correctamente');
console.log('💡 Tip: Usa clearAllBookings() en consola para limpiar todas las reservas');
