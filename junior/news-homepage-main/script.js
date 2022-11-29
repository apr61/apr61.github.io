const openMenu = document.querySelector('.menu-open-btn');
const closeMenu = document.querySelector('.menu-close-btn');
const nav = document.querySelector('nav');


openMenu.addEventListener('click', () => {
    nav.classList.add('open-menu');
})

closeMenu.addEventListener('click', () => {
    nav.classList.remove('open-menu');
})
