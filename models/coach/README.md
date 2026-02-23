# 🎯 Landing Page + Agenda para Coaches

Proyecto profesional de frontend con HTML, CSS y JavaScript puro, diseñado específicamente para coaches, entrenadores o profesores particulares.

## 📋 Características

### ✨ Diseño
- **UI Moderna y Minimalista** - Inspirada en Linear y Notion
- **Totalmente Responsive** - Optimizado para móvil, tablet y desktop
- **Micro-interacciones** - Animaciones suaves en hover, scroll y transiciones
- **Paleta Cálida** - Tonos terracota y neutros para transmitir profesionalismo

### 🛠️ Funcionalidades

#### 1. Landing Informativa
- Sección Hero con CTA claro
- Sobre Mí con bio y certificaciones
- Showcase de valores y metodología
- Testimonios de clientes reales
- Footer con enlaces sociales

#### 2. Servicios y Precios
- Tres planes claramente diferenciados
- Card destacada para el plan más popular
- Descripción de beneficios por plan
- CTAs directos a la agenda

#### 3. Sistema de Agenda Completo
- **Calendario Interactivo** - Navegación por semanas
- **Slots Horarios** - Horarios disponibles claramente marcados
- **Reservas en Tiempo Real** - Slots se bloquean al ser reservados
- **Formulario de Reserva** - Con validación de campos
- **Persistencia de Datos** - LocalStorage para demo/prototipo
- **Gestión de Reservas** - Ver y cancelar reservas existentes

#### 4. Contacto Directo
- Botón WhatsApp con enlace directo
- Email de contacto
- Formulario de reserva integrado

## 📁 Estructura del Proyecto

```
proyecto/
│
├── index.html              # Página principal
│
├── css/
│   ├── base.css           # Variables, reset y estilos base
│   └── components.css     # Componentes UI específicos
│
├── js/
│   ├── main.js           # Interacciones generales
│   └── agenda.js         # Sistema de calendario y reservas
│
└── assets/
    └── images/           # Imágenes (actualmente usa placeholder URLs)
```

## 🚀 Instalación y Uso

### Opción 1: Uso Directo
1. Descarga todos los archivos manteniendo la estructura
2. Abre `index.html` en tu navegador
3. ¡Listo! El sitio funciona sin necesidad de servidor

### Opción 2: Servidor Local (recomendado para desarrollo)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## ⚙️ Personalización

### 1. Información Personal

**En `index.html`:**
- Línea 18: Cambia el título de la página
- Líneas 33-35: Cambia nombre del brand
- Líneas 47-59: Personaliza el Hero (título, descripción)
- Líneas 75-92: Personaliza las estadísticas
- Sección "Sobre Mí" (líneas 112-180): Tu bio, foto y certificaciones
- Sección "Servicios" (líneas 184-297): Ajusta precios y descripciones
- Sección "Testimonios" (líneas 301-368): Agrega testimonios reales
- Footer (línea 481+): Cambia enlaces sociales y legales

### 2. Colores y Tipografía

**En `css/base.css`:**

```css
:root {
    /* Cambia la paleta de colores */
    --color-primary: #C96846;     /* Tu color principal */
    --color-secondary: #2A3A3F;   /* Color secundario */
    --color-accent: #D4A574;      /* Color de acento */
    
    /* O cambia las fuentes completamente */
    --font-display: 'Tu Fuente Display', serif;
    --font-body: 'Tu Fuente Body', sans-serif;
}
```

### 3. Configuración del Calendario

**En `js/agenda.js`:**

```javascript
const CONFIG = {
    // Horarios disponibles (formato 24h)
    availableHours: [
        '09:00', '10:00', '11:00', '12:00',
        '14:00', '15:00', '16:00', '17:00', '18:00'
    ],
    
    // Días disponibles (1=Lunes, 5=Viernes)
    availableDays: [1, 2, 3, 4, 5],
    
    // Duración de cada sesión (minutos)
    sessionDuration: 60,
    
    // Días hacia adelante visibles
    daysAhead: 14
};
```

### 4. Imágenes

Reemplaza las URLs de placeholder:
- Hero image (línea 99): Tu foto profesional
- Testimonios (líneas 327, 347, 367): Fotos de clientes (o avatares)

Puedes usar:
- Imágenes locales: `assets/images/tu-foto.jpg`
- URLs externas de tu hosting
- Servicios como Cloudinary, Imgur, etc.

### 5. Enlaces de Contacto

**WhatsApp** (línea 407):
```html
<a href="https://wa.me/5212345678900" ...>
```
Cambia `5212345678900` por tu número con código de país

**Email** (línea 420):
```html
<a href="mailto:tu@email.com" ...>
```

## 🎨 Personalización Avanzada

### Cambiar el Diseño Completo

1. **Hero Layout Alternativo** - Cambia `grid-template-columns` en `.hero__content`
2. **Tarjetas Diferentes** - Modifica los estilos en `.service-card`
3. **Animaciones** - Ajusta keyframes en `base.css`
4. **Colores por Sección** - Usa clases específicas con fondos diferentes

### Agregar Nuevas Secciones

```html
<section class="nueva-seccion">
    <div class="container">
        <div class="section-header section-header--center">
            <span class="section-label">Etiqueta</span>
            <h2 class="section-title">Título</h2>
        </div>
        <!-- Tu contenido -->
    </div>
</section>
```

## 📱 Responsive Design

El sitio es completamente responsive con breakpoints en:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Mobile pequeño: < 480px

## 💾 Sistema de Reservas

### Funcionamiento
1. Usuario selecciona fecha y hora en el calendario
2. Completa el formulario con sus datos
3. La reserva se guarda en `localStorage`
4. El horario se marca como ocupado
5. Usuario puede ver y cancelar sus reservas

### Limitaciones del Prototipo
- Los datos se guardan solo en el navegador (localStorage)
- No hay sincronización entre dispositivos
- No hay envío de emails de confirmación
- No hay backend/base de datos

### Migración a Producción

Para convertir esto en un sistema real:

1. **Backend**: Implementar API con Node.js, Python (Django/Flask), PHP
2. **Base de Datos**: MySQL, PostgreSQL, MongoDB
3. **Autenticación**: Sistema de usuarios y autenticación
4. **Emails**: SendGrid, Mailgun o similar para confirmaciones
5. **Pagos**: Stripe, PayPal para cobros
6. **Calendario Real**: Integración con Google Calendar API

## 🔧 Funciones Útiles (Consola)

Abre la consola del navegador (F12) y prueba:

```javascript
// Ver todas las reservas
JSON.parse(localStorage.getItem('bookings'))

// Limpiar todas las reservas
clearAllBookings()

// Ver slots ocupados
JSON.parse(localStorage.getItem('bookedSlots'))
```

## 🎯 SEO y Performance

### Mejoras Recomendadas para Producción

1. **Meta Tags**:
```html
<meta name="description" content="Tu descripción única">
<meta property="og:title" content="...">
<meta property="og:image" content="...">
```

2. **Optimizar Imágenes**: Usa formato WebP, lazy loading
3. **Minificar CSS/JS**: Antes de deployment
4. **CDN**: Para assets estáticos
5. **Analytics**: Google Analytics o similar

## 📄 Licencia

Este proyecto es de código abierto. Puedes usarlo, modificarlo y distribuirlo libremente.

## 🤝 Contribuciones

¿Mejoras o sugerencias? Son bienvenidas:
1. Agrega características nuevas
2. Mejora el diseño
3. Optimiza el código
4. Reporta bugs

## 📞 Soporte

Para preguntas o ayuda con la personalización:
- Revisa la documentación incluida
- Inspecciona el código (está comentado)
- Consulta recursos de HTML/CSS/JS

---

**¡Disfruta tu nuevo sitio web profesional!** 🚀

*Creado con ❤️ para coaches que quieren crecer su negocio online.*
