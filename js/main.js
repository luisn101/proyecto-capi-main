// ==========================================
// CONSTANTES Y VARIABLES GLOBALES
// ==========================================

// Elementos para la sección de donaciones
const botonesMonto = document.querySelectorAll('.btn-monto');
const btnCustom = document.getElementById('btn-custom');
const customWrapper = document.getElementById('custom-amount-wrapper');
const customInput = document.getElementById('custom-amount');

// Elementos para el menú móvil
const menuCheck = document.getElementById('menu-check');

// Elementos para el formulario de contacto
const contactForm = document.querySelector('form-container');

// ==========================================
// INICIALIZACIÓN DE LA PÁGINA
// ==========================================

// Agrega clase 'is-loaded' al body cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-loaded');
});

// ==========================================
// LÓGICA DE DONACIONES
// ==========================================

// Maneja los clics en los botones de monto de donación
botonesMonto.forEach(boton => {
    boton.addEventListener('click', () => {
        // Remueve la clase activa de todos los botones
        botonesMonto.forEach(b => b.classList.remove('is-active'));
        // Agrega la clase activa al botón clicado
        boton.classList.add('is-active');

        // Lógica para mostrar/ocultar el input personalizado
        if (boton === btnCustom) {
            customWrapper.classList.add('is-visible');
            customInput.focus(); // Pone el cursor directamente en el campo
        } else {
            customWrapper.classList.remove('is-visible');
            customInput.value = ''; // Limpia el valor si elige un monto fijo
        }
    });
});

// ==========================================
// GALERÍA CON LIGHTBOX
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    // Elementos del lightbox
    const lightbox = document.getElementById('customLightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const captionText = lightbox.querySelector('.caption-text');
    const captionCounter = lightbox.querySelector('.caption-counter');
    const galleryLinks = document.querySelectorAll('.galeria-link');
    let currentIndex = 0;

    // Función para actualizar la imagen en el lightbox
    function updateImage() {
        const currentLink = galleryLinks[currentIndex];
        const fullImgUrl = currentLink.getAttribute('href');
        const altText = currentLink.querySelector('img').getAttribute('alt');

        // Efecto de salida
        lightboxImg.style.opacity = '0';

        lightboxImg.onload = function () {
            // Actualizamos imagen y textos
            captionText.innerText = altText;
            captionCounter.innerText = `Imagen ${currentIndex + 1} de ${galleryLinks.length}`;

            // Efecto de entrada
            lightboxImg.style.opacity = '1';
        };

        lightboxImg.src = fullImgUrl;
    }

    // Eventos de apertura del lightbox
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            updateImage();
            lightbox.classList.add('active');
        });
    });

    // Navegación: siguiente imagen
    document.querySelector('.next').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryLinks.length;
        updateImage();
    });

    // Navegación: imagen anterior
    document.querySelector('.prev').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryLinks.length) % galleryLinks.length;
        updateImage();
    });

    // Cierre del lightbox
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Evita el cierre al hacer clic en la imagen
    lightboxImg.addEventListener('click', (e) => e.stopPropagation());

    // Controles de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") lightbox.classList.remove('active');
        if (e.key === "ArrowRight") document.querySelector('.next').click();
        if (e.key === "ArrowLeft") document.querySelector('.prev').click();
    });
});

// ==========================================
// EFECTO DE SCROLL EN LA BARRA DE NAVEGACIÓN
// ==========================================

// Agrega/quita clase 'scrolled' al navbar según el scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==========================================
// MENÚ MÓVIL
// ==========================================

// Maneja el toggle del menú móvil y bloquea/desbloquea el scroll
menuCheck.addEventListener('change', function () {
    if (this.checked) {
        // Si el menú se abre, bloqueamos el scroll
        document.body.style.overflow = 'hidden';
    } else {
        // Si se cierra, devolvemos el scroll
        document.body.style.overflow = 'auto';
    }
});

// Cierra el menú móvil al hacer clic en un enlace de navegación
const navLinks = document.querySelectorAll('.navbar__links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuCheck.checked = false;
        document.body.style.overflow = 'auto';
    });
});

// ==========================================
// FUNCIONES DE MODALES
// ==========================================

// Abre un modal específico
function openModal(id) {
    document.getElementById(id).classList.add('is-visible');
    document.body.style.overflow = 'hidden'; // Evita el scroll de fondo
}

// Cierra un modal específico
function closeModal(id) {
    document.getElementById(id).classList.remove('is-visible');
    document.body.style.overflow = 'auto';
}

// Cierra el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('is-visible');
        document.body.style.overflow = 'auto';
    }
}

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================

// Maneja el envío del formulario de contacto
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evitamos que la página se recargue

        const btn = this.querySelector('.btn');
        const originalText = btn.innerHTML;

        // 1. Activamos el estado de carga
        btn.classList.add('is-loading');
        btn.disabled = true;

        // 2. Simulamos el envío (2 segundos)
        setTimeout(() => {
            // 3. Quitamos carga y mostramos éxito
            btn.classList.remove('is-loading');
            btn.classList.add('btn--success'); // Puedes crear esta clase verde
            btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Enviado!';

            // 4. Limpiamos el formulario
            contactForm.reset();

            // 5. Opcional: Volver al estado original después de 3 segundos
            setTimeout(() => {
                btn.classList.remove('btn--success');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 3000);

        }, 2000);
    });
}