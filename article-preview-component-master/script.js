const shareIcon = document.querySelector('.share-icon-btn');
const modal = document.querySelector('.modal');

shareIcon.addEventListener('click', () => {
    modal.classList.toggle('show-modal');
})