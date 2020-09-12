const todayDate = document.querySelector('#todayDate');
const todayDay = document.querySelector('#todayDay');
const m = moment();

// Set Today's Date using Moment JS
todayDate.innerHTML = `<span>${m.format("Do MMMM")}</span> ${m.format("YYYY")}`;
todayDay.textContent = m.format("dddd");