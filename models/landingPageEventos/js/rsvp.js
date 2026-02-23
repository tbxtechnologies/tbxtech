/* ===================================
   RSVP FORM HANDLER
   Manages event confirmation with LocalStorage
   =================================== */

// ===================================
// RSVP FORM INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initRSVPForm();
    checkExistingRSVP();
});


// ===================================
// FORM HANDLING
// ===================================

function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvp-form');
    
    if (!rsvpForm) return;
    
    rsvpForm.addEventListener('submit', handleRSVPSubmit);
    
    // Add input validation
    addFormValidation();
}

function handleRSVPSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const rsvpData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        guests: formData.get('guests'),
        attending: formData.get('attending'),
        dietary: formData.get('dietary') || '',
        message: formData.get('message') || '',
        timestamp: new Date().toISOString(),
        submittedDate: new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    // Validate required fields
    if (!rsvpData.name || !rsvpData.email || !rsvpData.attending) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    // Save to localStorage
    saveRSVP(rsvpData);
    
    // Show confirmation
    showConfirmation(rsvpData);
    
    // Optional: Send to backend API
    // sendRSVPToServer(rsvpData);
}


// ===================================
// LOCALSTORAGE MANAGEMENT
// ===================================

function saveRSVP(data) {
    try {
        // Get existing RSVPs
        const rsvps = getAllRSVPs();
        
        // Add new RSVP
        rsvps.push(data);
        
        // Save to localStorage
        localStorage.setItem('eventRSVPs', JSON.stringify(rsvps));
        
        // Also save user's personal RSVP
        localStorage.setItem('myRSVP', JSON.stringify(data));
        
        console.log('✅ RSVP saved successfully', data);
        
    } catch (error) {
        console.error('Error saving RSVP:', error);
        showNotification('Error al guardar la confirmación. Por favor intenta de nuevo.', 'error');
    }
}

function getAllRSVPs() {
    try {
        const rsvps = localStorage.getItem('eventRSVPs');
        return rsvps ? JSON.parse(rsvps) : [];
    } catch (error) {
        console.error('Error reading RSVPs:', error);
        return [];
    }
}

function getMyRSVP() {
    try {
        const myRSVP = localStorage.getItem('myRSVP');
        return myRSVP ? JSON.parse(myRSVP) : null;
    } catch (error) {
        console.error('Error reading my RSVP:', error);
        return null;
    }
}

function checkExistingRSVP() {
    const myRSVP = getMyRSVP();
    
    if (myRSVP) {
        // Show existing RSVP info
        showExistingRSVPInfo(myRSVP);
    }
}

function showExistingRSVPInfo(data) {
    // You can add a banner or notification showing existing RSVP
    console.log('Existing RSVP found:', data);
}


// ===================================
// CONFIRMATION DISPLAY
// ===================================

function showConfirmation(data) {
    const form = document.getElementById('rsvp-form');
    const confirmation = document.getElementById('rsvp-confirmation');
    
    if (!form || !confirmation) return;
    
    // Update confirmation message based on attending status
    const confirmationMessage = data.attending === 'yes' 
        ? '¡Gracias por confirmar tu asistencia! Nos emociona celebrar contigo.'
        : 'Gracias por tu respuesta. Lamentamos que no puedas acompañarnos.';
    
    confirmation.querySelector('p').textContent = confirmationMessage;
    
    // Hide form and show confirmation
    form.style.display = 'none';
    confirmation.classList.add('active');
    
    // Scroll to confirmation
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Send confirmation email (optional)
    sendConfirmationEmail(data);
}


// ===================================
// FORM VALIDATION
// ===================================

function addFormValidation() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value, this);
        });
    }
    
    // Phone validation (optional)
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
}

function validateEmail(email, inputElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid && email !== '') {
        inputElement.style.borderColor = '#e74c3c';
        showFieldError(inputElement, 'Por favor ingresa un email válido');
    } else {
        inputElement.style.borderColor = '';
        removeFieldError(inputElement);
    }
    
    return isValid;
}

function formatPhoneNumber(input) {
    // Remove all non-numeric characters
    let value = input.value.replace(/\D/g, '');
    
    // Format phone number (example: +52 123 456 7890)
    if (value.length > 0) {
        if (value.startsWith('52')) {
            value = '+' + value;
        }
    }
    
    input.value = value;
}

function showFieldError(input, message) {
    removeFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    input.parentElement.appendChild(errorDiv);
}

function removeFieldError(input) {
    const existingError = input.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}


// ===================================
// NOTIFICATIONS
// ===================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#2ecc71' : '#e74c3c',
        color: 'white',
        fontWeight: '500',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}


// ===================================
// EMAIL CONFIRMATION (SIMULATION)
// ===================================

function sendConfirmationEmail(data) {
    // In a real implementation, this would call a backend API
    console.log('Sending confirmation email to:', data.email);
    console.log('RSVP Data:', data);
    
    // Simulate email sending
    setTimeout(() => {
        showNotification('Confirmación enviada a ' + data.email, 'success');
    }, 1000);
}


// ===================================
// BACKEND API INTEGRATION (OPTIONAL)
// ===================================

async function sendRSVPToServer(data) {
    // Example API call - replace with your actual endpoint
    /*
    try {
        const response = await fetch('https://your-api.com/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Server error');
        }
        
        const result = await response.json();
        console.log('Server response:', result);
        
    } catch (error) {
        console.error('Error sending to server:', error);
        // Data is still saved locally even if server fails
    }
    */
}


// ===================================
// EXPORT/DOWNLOAD RSVP DATA
// ===================================

function downloadRSVPData() {
    const rsvps = getAllRSVPs();
    
    if (rsvps.length === 0) {
        showNotification('No hay confirmaciones para descargar', 'error');
        return;
    }
    
    // Convert to CSV
    const csv = convertToCSV(rsvps);
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvp-confirmations-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Archivo descargado exitosamente', 'success');
}

function convertToCSV(data) {
    if (data.length === 0) return '';
    
    // Headers
    const headers = Object.keys(data[0]).join(',');
    
    // Rows
    const rows = data.map(row => {
        return Object.values(row).map(value => {
            // Escape commas and quotes
            const stringValue = String(value).replace(/"/g, '""');
            return `"${stringValue}"`;
        }).join(',');
    });
    
    return [headers, ...rows].join('\n');
}


// ===================================
// ADMIN FUNCTIONS (For event organizers)
// ===================================

function getRSVPStats() {
    const rsvps = getAllRSVPs();
    
    const stats = {
        total: rsvps.length,
        attending: rsvps.filter(r => r.attending === 'yes').length,
        notAttending: rsvps.filter(r => r.attending === 'no').length,
        totalGuests: rsvps.reduce((sum, r) => sum + parseInt(r.guests || 0), 0),
        dietaryRestrictions: rsvps.filter(r => r.dietary && r.dietary !== '').length
    };
    
    console.table(stats);
    return stats;
}

// Make admin functions globally available (remove in production)
window.downloadRSVPData = downloadRSVPData;
window.getRSVPStats = getRSVPStats;
window.getAllRSVPs = getAllRSVPs;


// ===================================
// ADD CSS ANIMATIONS DYNAMICALLY
// ===================================

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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
