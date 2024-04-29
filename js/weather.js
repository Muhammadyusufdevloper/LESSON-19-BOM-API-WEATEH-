const weatherForm = document.querySelector(".weather__form")
const searchInput = document.querySelector("#search-input")
const weatherBoxes = document.querySelector(".weather__boxes")

async function getWeather() {
    let data = await fetch("https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=Tashkent&days=7&aqi=yes&alerts=yes")
    data
        .json()
        .then(respons => mapWeatherType(respons))
        .catch(error => console.log(error))
}
getWeather()


function mapWeatherType(weatherType) {
    weatherBoxes.innerHTML =   `
        <h2 class="weather__title">${weatherType.location.name}. ${weatherType.location.country}</h2>
        <div class="weather__card">
        <img src=${weatherType.current.condition.icon} alt="Weather icon">
        <h2 class="weather__card__title">234°</h2>
        <p class="weather__card__desc">${weatherType.forecast.forecastday.hour.temp_c}</p>
        </div>
        <p class="weather__title">Updated as of 6:16 PM</p>
        <div class="weather__info">
        <p class="weather__info__desc"></p>
        <p class="weather__info__desc"></p>
        <p class="weather__info__desc"></p>
        <p class="weather__info__desc"></p>
        <p class="weather__info__desc"></p>
        <p class="weather__info__desc"></p>
        <p class="weather__info__desc"></p>
        </div>
    `
}