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
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-loaded");

  // ==========================================
  // EFECTO DE SCROLL EN LA BARRA DE NAVEGACIÓN
  // ==========================================

  // Agrega/quita clase 'scrolled' al navbar según el scroll
  const header = document.querySelector(".navbar");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
});

// ==========================================
// LÓGICA DE DONACIONES
// ==========================================

// --- Lógica de la página de donaciones ---
(function () {
  if (!document.querySelector(".donacion")) return;

  const BASE_URL = "https://donorbox.org/c-a-p-i";
  const isEnglish = window.location.pathname.startsWith("/en/");
  const errorMsg = isEnglish
    ? "Please select or enter an amount to continue."
    : "Por favor seleccioná o ingresá un monto para continuar.";
  let montoSeleccionado = null;

  // Selección de montos predefinidos
  document.querySelectorAll(".btn-monto:not(#btn-custom)").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".btn-monto")
        .forEach((b) => b.classList.remove("is-active"));
      this.classList.add("is-active");
      montoSeleccionado = this.dataset.monto;

      // Ocultar input personalizado si estaba abierto
      document
        .getElementById("custom-amount-wrapper")
        .classList.remove("is-visible");
      document.getElementById("custom-amount").value = "";
    });
  });

  // Botón "Otro monto"
  document.getElementById("btn-custom").addEventListener("click", function () {
    document
      .querySelectorAll(".btn-monto")
      .forEach((b) => b.classList.remove("is-active"));
    this.classList.add("is-active");
    montoSeleccionado = null;
    document
      .getElementById("custom-amount-wrapper")
      .classList.toggle("is-visible");
  });

  // Botón principal — redirige a Donorbox con el monto
  document.getElementById("btn-donar").addEventListener("click", function () {
    const customInput = document.getElementById("custom-amount").value;
    const monto = montoSeleccionado || customInput;

    if (!monto || isNaN(monto) || Number(monto) <= 0) {
      alert(errorMsg);
      return;
    }

    window.open(`${BASE_URL}?amount=${monto}`, "_blank");
  });
})();

// Maneja los clics en los botones de monto de donación
/*
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
*/
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

// Maneja el envío del formulario de contacto a Netlify (via Ajax)
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Mantenemos el bloqueo para hacerlo por AJAX

        const btn = this.querySelector(".btn");
        const originalText = btn.innerHTML;
        const formData = new FormData(contactForm); // Captura todos los campos 'name'

        // 1. Activamos el estado de carga
        btn.classList.add("is-loading");
        btn.disabled = true;

        // 2. ENVIAMOS A NETLIFY REALMENTE
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        })
          .then(() => {
            // 3. Éxito: Quitamos carga y mostramos el check
            btn.classList.remove("is-loading");
            btn.classList.add("btn--success");
            btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Enviado!';

            contactForm.reset();

            setTimeout(() => {
              btn.classList.remove("btn--success");
              btn.innerHTML = originalText;
              btn.disabled = false;
            }, 3000);
          })
          .catch((error) => alert("Error al enviar: " + error));
    });
}