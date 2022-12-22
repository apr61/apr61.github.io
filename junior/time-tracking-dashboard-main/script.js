const time = {
    'daily': 'Yesterday',
    'weekly': 'Last Week',
    'monthly': 'Last Month'
}

async function getData() {
    let res = await fetch('./data.json');
    return res.json();
}

const data = await getData();

const dataWrapper = document.querySelector('[data-card-wrapper]');
const options = document.querySelector('.card__options');

options.addEventListener('click', (e) => {
    document.querySelector('.active').classList.remove('active')
    e.target.classList.add('active')
    displayData(e.target.textContent.toLowerCase())
})

displayData('daily')

function displayData(optionValue) {
    let filteredData = data.map(d => ({ title: d.title, summary: d.timeframes[optionValue] }))
    dataWrapper.innerHTML = filteredData.map(fdata =>
        `
        <div class="card card--color--${fdata.title.toLowerCase()}">
            <div class="card__data">
            <div class="card__data__title__menu">
                <h2 class="card__data__title">${fdata.title}</h2>
                <i class="fa-solid icon"></i>
            </div>
            <div class="card__data__summary">
                <div class="card__data__current">${fdata.summary.current}hrs</div>
                <div class="card__data__previous">${time[optionValue]} - ${fdata.summary.previous}hrs</div>
            </div>
            </div>
        </div>
        `
    ).join("")
}
