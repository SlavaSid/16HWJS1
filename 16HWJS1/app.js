const blockTop = document.querySelector('.top');
const blockBottom = document.querySelector('.bottom')
const topTown = blockTop.querySelector('.top-town')
const topTime = blockTop.querySelector('.top-time')
const divTopCenter = blockTop.querySelector('.top__center')
const topBottomText = blockTop.querySelector('.top__bottom-text')
const topBottomSpeed = blockTop.querySelector('.top__bottom-speed')


function renderMain(town, img, event, temp, speed) {
    
    topTown.textContent = town
    topTime.textContent = new Date().toLocaleTimeString();
    setInterval(() => {
        const watch = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
        topTime.textContent = watch;
    }, 1000);
    divTopCenter.insertAdjacentHTML('beforeend', `
    <img src="./images/${img}.png" alt="icon" >
    <p class="top__center-event">${event}</p>
    <p class="top__center-temp">${Math.round(temp)} °C</p>
    `);
    topBottomText.textContent = 'Speed'
    topBottomSpeed.textContent = `${speed.toFixed(1)} m/s`
}

function renderRow(date, img, temp) {
    const data = date.slice(0, 10)
    const time = date.slice(11)
    blockBottom.insertAdjacentHTML('beforeend', `
    <div class="bottom__item">
        <div>
            <p>${data}</p>
            <p>${time}</p>
        </div>
        <img class="left" src="./images/${img}.png" alt="icon">
        <p>${Math.round(temp)} °C</p>
    </div>
    `);
}
    
navigator.geolocation.getCurrentPosition(
    function (position) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b840a0bd0069942bd7b12a2f58f18778&units=metric`)
        .then(response => {
            if(!response.ok){
             console.error('не верное значение')
            
         }else{
             return response.json();
            }
             
         })
         .then(data => {
           renderMain(data.city.name, data.list[0].weather[0].icon, data.list[0].weather[0].description, data.list[0].main.temp, data.list[0].wind.speed);
           for (let i = 0; i < 40; i += 8) {
               renderRow(data.list[i].dt_txt, data.list[i].weather[0].icon, data.list[i].main.temp);
           }

         });

    }
);

