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
const contactForm = document.querySelector('.form-container');

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
// GALERÍA CON LIGHTBOX (GENÉRICO)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return; // Salir si no hay lightbox en esta página

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const nextButton = lightbox.querySelector('.next');
    const prevButton = lightbox.querySelector('.prev');

    let currentIndex = 0;
    let currentCollection = [];

    function updateInfo(target) {
        const img = target.querySelector('img');
        const caption = target.dataset.caption || img?.alt || '';

        lightboxImg.src = img?.src || '';
        lightboxCaption.innerText = caption;
        lightboxCounter.innerText = `${currentIndex + 1} / ${currentCollection.length}`;
    }

    function openLightbox(index, collection) {
        if (!collection || !collection.length) return;
        currentIndex = index;
        currentCollection = collection;

        const target = collection[currentIndex];
        const img = target.querySelector('img');
        if (!img) return;

        updateInfo(target);
        lightbox.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-active');
        document.body.style.overflow = 'auto';
    }

    function showNext() {
        if (!currentCollection.length) return;
        currentIndex = (currentIndex + 1) % currentCollection.length;
        openLightbox(currentIndex, currentCollection);
    }

    function showPrev() {
        if (!currentCollection.length) return;
        currentIndex = (currentIndex - 1 + currentCollection.length) % currentCollection.length;
        openLightbox(currentIndex, currentCollection);
    }

    const homeGalleryLinks = Array.from(document.querySelectorAll('.galeria-link'));
    const pageGalleryItems = Array.from(document.querySelectorAll('.galeria-item'));

    if (homeGalleryLinks.length) {
        homeGalleryLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index, homeGalleryLinks);
            });
        });
    }

    if (pageGalleryItems.length) {
        pageGalleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            item.dataset.caption = item.querySelector('.galeria-item__text')?.innerText || '';

            item.addEventListener('click', () => {
                openLightbox(index, pageGalleryItems);
            });
        });
    }

    if (nextButton) nextButton.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    if (prevButton) prevButton.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    const closeBtn = lightbox.querySelector('.lightbox__close');
    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('is-active');
    document.body.style.overflow = 'auto';
}

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
if (menuCheck) {
    menuCheck.addEventListener('change', function () {
        if (this.checked) {
            // Si el menú se abre, bloqueamos el scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Si se cierra, devolvemos el scroll
            document.body.style.overflow = 'auto';
        }
    });
}

// Cierra el menú móvil al hacer clic en un enlace de navegación
const navLinks = document.querySelectorAll('.navbar__links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuCheck) {
            menuCheck.checked = false;
        }
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