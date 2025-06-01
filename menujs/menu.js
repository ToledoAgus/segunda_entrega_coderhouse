document.addEventListener('DOMContentLoaded', () => {
    const botonMenu = document.querySelector('.boton-menu');
    const menuDesplegable = document.querySelector('.menu-desplegable');
    const itemsConSubMenu = document.querySelectorAll('.item-con-sub-menu');

    // Toggle del menú principal para móvil
    botonMenu.addEventListener('click', () => {
        menuDesplegable.classList.toggle('menu-abierto');
        botonMenu.classList.toggle('activo'); // Para animar el icono de hamburguesa
    });

    // Toggle de los sub-menús en móvil
    itemsConSubMenu.forEach(item => {
        const linkPrincipal = item.querySelector('a');
        const subMenu = item.querySelector('.sub-menu');

        linkPrincipal.addEventListener('click', (e) => {
            // Solo prevenir el comportamiento por defecto si hay un sub-menú y estamos en móvil
            // o si el enlace principal no es el de navegación (ej. tiene solo '#')
            if (subMenu && window.innerWidth <= 768) { // Ajusta el breakpoint si es necesario
                e.preventDefault(); // Evita que el enlace principal navegue
                subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'flex'; // Usamos flex para la columna en CSS
            } else if (linkPrincipal.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });

        // Ocultar sub-menús cuando se redimensiona a escritorio si estaban abiertos
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) { // Ajusta el breakpoint si es necesario
                subMenu.style.display = ''; // Eliminar la propiedad display para que CSS se encargue
            }
        });
    });

    // Ocultar el menú principal al hacer clic fuera (solo en móvil)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !menuDesplegable.contains(e.target) && !botonMenu.contains(e.target)) {
            menuDesplegable.classList.remove('menu-abierto');
            botonMenu.classList.remove('activo');
            // Asegurarse de que los sub-menús también se cierren si estaban abiertos
            itemsConSubMenu.forEach(item => {
                const subMenu = item.querySelector('.sub-menu');
                if (subMenu) {
                    subMenu.style.display = 'none';
                }
            });
        }
    });
});