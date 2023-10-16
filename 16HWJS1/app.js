const divBase = document.querySelector('.base');
const divBottom = document.querySelector('.bottom')
const baseTown = divBase.querySelector('.base-town')
const baseTime = divBase.querySelector('.base-time')
const divTopCenter = divBase.querySelector('.base__center')
const baseBottomText = divBase.querySelector('.base__bottom-text')
const baseBottomSpeed = divBase.querySelector('.base__bottom-speed')


function renderMain(town, img, event, temp, speed) {
    
    baseTown.textContent = town
    baseTime.textContent = new Date().toLocaleTimeString();
    setInterval(() => {
        const watch = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
        baseTime.textContent = watch;
    }, 1000);
    divTopCenter.insertAdjacentHTML('beforeend', `
    <img src="./images/${img}.png" alt="icon" >
    <p class="top__center-event">${event}</p>
    <p class="top__center-temp">${Math.round(temp)} °C</p>
    `);
    baseBottomText.textContent = 'Speed'
    baseBottomSpeed.textContent = `${speed.toFixed(1)} m/s`
}

function renderRow(date, img, temp) {
    const data = date.slice(0, 10)
    const time = date.slice(11)
    divBottom.insertAdjacentHTML('beforeend', `
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
    function (instal) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${instal.coords.latitude}&lon=${instal.coords.longitude}&appid=cce47a5ecf3da9ec417a11a3844e2f70&units=metric`)
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

