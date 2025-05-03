const nav = document.querySelector('#nav');
const abrir = document.querySelector('#abrir');
const cerrar = document.querySelector('#cerrar');

abrir.addEventListener('click', () => {
    nav.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Bloquea scroll de toda la página
});

cerrar.addEventListener('click', () => {
    nav.classList.remove('visible');
    document.body.style.overflow = ''; // Habilita scroll de nuevo
});

// Cerrar si se hace click fuera del nav
document.addEventListener('click', (e) => {
    // Si el nav está abierto y el click NO es dentro del nav NI dentro de abrir
    if (nav.classList.contains('visible') && !nav.contains(e.target) && e.target !== abrir) {
        nav.classList.remove('visible');
        document.body.style.overflow = '';
    }
});

// Cerrar nav al hacer clic en cualquier enlace dentro del nav
const enlacesNav = nav.querySelectorAll('a');
enlacesNav.forEach((enlace) => {
    enlace.addEventListener('click', () => {
        nav.classList.remove('visible');
        document.body.style.overflow = '';
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let lastScrollTop = 0;
    let hideTimeout;
    let mouseOverHeader = false;
    const header = document.getElementById("header");

    if (!header) {
        console.error("No se encuentra el header en el DOM");
        return;
    }

    header.addEventListener("mouseenter", function() {
        mouseOverHeader = true;
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        header.classList.remove("hidden");
    });

    header.addEventListener("mouseleave", function() {
        mouseOverHeader = false;

        // Si estamos arriba de todo (scroll 0), NO ocultar
        if (window.pageYOffset === 0 || document.documentElement.scrollTop === 0) {
            return;
        }

        hideTimeout = setTimeout(function() {
            if (!mouseOverHeader) {
                header.classList.add("hidden");
            }
        }, 2000); // 1 segundo
    });

    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }

        if (currentScroll > lastScrollTop) {
            header.classList.add("hidden");
        } else {
            header.classList.remove("hidden");
        }

        // Solo ocultar automáticamente si NO estamos en la parte superior
        if (currentScroll > 0) {
            hideTimeout = setTimeout(function() {
                if (!mouseOverHeader) {
                    header.classList.add("hidden");
                }
            }, 2000);
        } else {
            header.classList.remove("hidden"); // Siempre visible en scroll 0
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
});



  
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          // Si el elemento se sale de la vista, lo restablecemos
          entry.target.classList.remove("show");
        }
      });
    }, {
      threshold: 0.3 // Cuando el 50% del elemento es visible
    });
  
    const targets = document.querySelectorAll('.fade-title, .parrafo, .anime-card, .pelicula-card,.peliculas-titulo,.animes-titulo,.title-advertencia,.mirecomendacion,.recomendacion-item,.propocito');
    targets.forEach(el => observer.observe(el));
  });
  