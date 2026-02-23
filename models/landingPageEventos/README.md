# 🎉 Landing Page para Eventos / Bodas / Fiestas

Una landing page elegante, moderna y completamente funcional para eventos especiales, bodas y celebraciones.

## ✨ Características

### Funcionalidades Principales
- **Página de Bienvenida** con diseño elegante y animaciones suaves
- **Contador Regresivo** dinámico hasta la fecha del evento
- **Información del Evento** con detalles de ceremonia, recepción y código de vestimenta
- **Formulario RSVP** completo con validación y confirmación
- **Galería de Fotos** interactiva con lightbox
- **Libro de Invitados** para mensajes de los invitados
- **Navegación Responsive** con menú móvil
- **Animaciones al Scroll** para una experiencia fluida

### Tecnologías
- HTML5 semántico
- CSS3 con variables y animaciones
- JavaScript Vanilla (sin dependencias)
- LocalStorage para persistencia de datos
- Diseño 100% responsive

## 📁 Estructura del Proyecto

```
├── index.html              # Página principal
├── css/
│   ├── base.css           # Variables, reset, estilos base
│   └── components.css     # Estilos de componentes específicos
├── js/
│   ├── main.js           # Lógica principal, contador, galería
│   └── rsvp.js           # Manejo del formulario RSVP
├── assets/
│   ├── images/           # Imágenes del evento
│   └── icons/            # Iconos personalizados
└── README.md
```

## 🚀 Inicio Rápido

### 1. Instalación
```bash
# Simplemente descarga los archivos y abre index.html en tu navegador
# No requiere instalación ni dependencias
```

### 2. Personalización Básica

#### Cambiar Fecha del Evento
En `js/main.js`, línea 9:
```javascript
const eventDate = new Date('2026-06-15T17:00:00').getTime();
```

#### Cambiar Nombres de los Novios
En `index.html`, sección Hero:
```html
<h1 class="hero-title">
    <span class="name">Tu Nombre</span>
    <span class="ampersand">&</span>
    <span class="name">Su Nombre</span>
</h1>
```

#### Modificar Colores
En `css/base.css`, variables CSS:
```css
:root {
    --color-primary: #c9a882;        /* Color principal */
    --color-secondary: #8b9a8a;      /* Color secundario */
    --color-accent: #d4a5a5;         /* Color de acento */
}
```

### 3. Añadir Imágenes Reales

#### Para la Galería
En `js/main.js`, actualiza el array `galleryData`:
```javascript
const galleryData = [
    { 
        img: 'assets/images/foto1.jpg',
        caption: 'Descripción de la foto'
    },
    // ... más fotos
];
```

## 🎨 Guía de Personalización

### Colores y Temas
El proyecto usa variables CSS para fácil personalización. Cambia los colores en `css/base.css`:

```css
/* Paleta Romántica (actual) */
--color-primary: #c9a882;
--color-accent: #d4a5a5;

/* Paleta Moderna */
--color-primary: #2c3e50;
--color-accent: #e74c3c;

/* Paleta Pastel */
--color-primary: #f8b4d9;
--color-accent: #b4e7f8;
```

### Tipografía
Las fuentes se cargan desde Google Fonts. Para cambiarlas:

1. Ve a [Google Fonts](https://fonts.google.com)
2. Selecciona tus fuentes favoritas
3. Actualiza el link en `index.html`
4. Cambia las variables en `css/base.css`:

```css
--font-display: 'Tu Fuente Display', serif;
--font-body: 'Tu Fuente Body', sans-serif;
```

### Secciones

#### Añadir/Eliminar Secciones
Cada sección en `index.html` es independiente. Puedes:
- Comentar secciones que no necesites
- Duplicar secciones para más contenido
- Cambiar el orden arrastrando los bloques `<section>`

#### Modificar Info del Evento
Actualiza los cards en la sección de información:
```html
<div class="info-card">
    <h3>Tu Título</h3>
    <p>Tu información</p>
    <a href="tu-enlace">Ver en Mapa</a>
</div>
```

## 💾 Datos Guardados (LocalStorage)

El proyecto guarda datos en el navegador:

### RSVP Confirmaciones
```javascript
// Ver todas las confirmaciones
getAllRSVPs()

// Ver estadísticas
getRSVPStats()

// Descargar como CSV
downloadRSVPData()
```

### Mensajes del Libro de Invitados
Los mensajes se guardan automáticamente y persisten entre sesiones.

### Limpiar Datos
```javascript
// En la consola del navegador
localStorage.clear()
```

## 📱 Responsive Design

El diseño se adapta a tres breakpoints:

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

### Probar Responsive
1. Abre Chrome DevTools (F12)
2. Click en el icono de dispositivo móvil
3. Prueba diferentes tamaños de pantalla

## 🔧 Funciones Avanzadas

### Integración con Backend

Para enviar confirmaciones a un servidor:

En `js/rsvp.js`, descomenta y actualiza:
```javascript
async function sendRSVPToServer(data) {
    const response = await fetch('https://tu-api.com/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

### Email de Confirmación

Puedes integrar servicios como:
- [EmailJS](https://www.emailjs.com/) - Envío de emails desde JavaScript
- [SendGrid](https://sendgrid.com/) - API de emails
- [Mailchimp](https://mailchimp.com/) - Marketing por email

### Exportar a PDF

Para generar invitaciones en PDF, puedes usar:
```javascript
// Opción 1: Imprimir a PDF
window.print()

// Opción 2: Usar librería html2pdf
// https://github.com/eKoopmans/html2pdf.js
```

## 🎯 Casos de Uso

### Bodas
- Información de ceremonia y recepción
- Confirmación de asistencia
- Galería de compromiso
- Registro de regalos

### Cumpleaños
- Detalles de la fiesta
- Confirmación de asistentes
- Lista de regalos sugeridos
- Galería de años anteriores

### Eventos Corporativos
- Agenda del evento
- Registro de participantes
- Galería del equipo
- Información de contacto

### XV Años / Graduaciones
- Programa del evento
- Confirmación de invitados
- Galería de momentos
- Información de hospedaje

## 🐛 Solución de Problemas

### El contador no funciona
- Verifica que la fecha en `main.js` esté en formato correcto
- Asegúrate de que la fecha sea futura

### Las imágenes no cargan
- Verifica las rutas en `galleryData`
- Asegúrate de que las imágenes existan en `assets/images/`

### El formulario no guarda
- Verifica que localStorage esté habilitado
- Abre la consola (F12) para ver errores

### Animaciones no se ven
- Verifica que JavaScript esté habilitado
- Comprueba que los archivos CSS y JS estén cargando

## 📝 Checklist de Personalización

- [ ] Cambiar nombres de los novios
- [ ] Actualizar fecha del evento
- [ ] Modificar información de lugares
- [ ] Añadir imágenes reales a la galería
- [ ] Personalizar colores de marca
- [ ] Actualizar enlaces de redes sociales
- [ ] Configurar Google Maps links
- [ ] Probar formulario RSVP
- [ ] Verificar responsive en móvil
- [ ] Optimizar imágenes para web

## 🚀 Despliegue

### Hosting Gratuito Recomendado

1. **Netlify** (Recomendado)
   - Arrastra la carpeta del proyecto
   - Dominio gratuito incluido
   - HTTPS automático

2. **GitHub Pages**
   - Sube a un repositorio
   - Activa Pages en Settings
   - Usa tu dominio o username.github.io

3. **Vercel**
   - Import desde GitHub
   - Deploy automático
   - Preview deployments

4. **Firebase Hosting**
   - Incluye backend gratuito
   - CDN global
   - Analytics incluido

### Pasos para Netlify
```bash
# 1. Crea una cuenta en netlify.com
# 2. Arrastra tu carpeta del proyecto
# 3. ¡Listo! Tu sitio está en línea
```

## 🎨 Recursos Adicionales

### Imágenes de Stock Gratuitas
- [Unsplash](https://unsplash.com)
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

### Iconos
- [Heroicons](https://heroicons.com)
- [Feather Icons](https://feathericons.com)
- [Font Awesome](https://fontawesome.com)

### Fuentes
- [Google Fonts](https://fonts.google.com)
- [Adobe Fonts](https://fonts.adobe.com)

### Paletas de Color
- [Coolors](https://coolors.co)
- [Adobe Color](https://color.adobe.com)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 🤝 Soporte

¿Tienes preguntas? ¿Encontraste un bug?
- Abre un issue en GitHub
- Consulta la documentación
- Revisa la consola del navegador para errores

---

**¡Feliz celebración! 🎊**

Hecho con ❤️ para eventos inolvidables.
