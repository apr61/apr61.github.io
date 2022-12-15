const openMenu = document.querySelector('.open-menu');
const nav = document.querySelector('nav')

openMenu.addEventListener('click', () => {
    nav.classList.toggle('open');
})