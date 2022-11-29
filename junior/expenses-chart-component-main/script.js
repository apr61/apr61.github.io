

fetch('./data.json')
.then(res => res.json())
.then(data => {
    loadChart(data);
})

const loadChart = (data) => {
    const highest_amount = highestAmount(data);
    data.forEach(dayData => {
        const day = document.querySelector(`.${dayData.day}`);
        if(dayData.amount == highest_amount){
            day.classList.add('high');
        }
        const percentage = Math.round(350 * (dayData.amount/100));
        day.style.height = `${percentage}px`;
        day.setAttribute('data-amount', `$${dayData.amount}`);
        day.setAttribute('data-day', `${dayData.day}`);
    })
}

const highestAmount = (data) => {
    let max = Number.MIN_VALUE;
    data.forEach(day => {
        max = max > day.amount ? max : day.amount;
    })
    return max;
}