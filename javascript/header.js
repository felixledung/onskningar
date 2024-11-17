document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        navbar.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});