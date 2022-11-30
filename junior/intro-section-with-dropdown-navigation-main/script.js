const openMenu = document.querySelector('.open-menu');
const closeMenu = document.querySelector('.close-menu');
const nav = document.querySelector('nav');
const featuresDropdown = document.querySelector('.features-dropdown');
const companyDropdown = document.querySelector('.company-dropdown');


openMenu.addEventListener('click', () => {
    nav.classList.add('open');
})

closeMenu.addEventListener('click', () => {
    nav.classList.remove('open');
})

featuresDropdown.addEventListener('click', () => {
    const dropdown = featuresDropdown.querySelector('.dropdown-content');
    dropdown.style.right = 0;
    dropdown.classList.toggle('show-dropdown');
})

companyDropdown.addEventListener('click', () => {
    const dropdown = companyDropdown.querySelector('.dropdown-content');
    dropdown.classList.toggle('show-dropdown');
})