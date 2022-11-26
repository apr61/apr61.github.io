const feedback = document.querySelector('.feedback');
const email = document.getElementById('email');
const btn = document.querySelector('.arrow-img');

const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

btn.addEventListener('click', () => {
    if(email.value.match(pattern)){
        feedback.textContent = 'Email Saved !';
    }else{
        email.style.border = '3px solid var(--clr-primary-soft-red)';
        email.classList.add('error');
        btn.style.height = '3.45rem';
        feedback.textContent = 'Please provide a valid email';
        email.focus();
    }
})