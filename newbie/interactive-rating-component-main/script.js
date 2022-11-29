const rating = document.querySelector('.rating');
const submit = document.querySelector('.submit');
const ratingRes = document.querySelector('#rating');
const form = document.querySelector('.form');
const thankyou = document.querySelector('.thankyou');


let ratingValue;
let selecteddiv;
rating.addEventListener('click', (e) => {
    let target = e.target;
    ratingValue = target.textContent;
    highlight(target);
})

const highlight = (target) => {
    if(selecteddiv){
        selecteddiv.classList.remove('highlight');
    }
    selecteddiv = target;
    selecteddiv.classList.add('highlight');
}

submit.addEventListener('click', () => {
    form.style.display = 'none';
    thankyou.style.display = 'block';
    ratingRes.textContent = ratingValue;
})
