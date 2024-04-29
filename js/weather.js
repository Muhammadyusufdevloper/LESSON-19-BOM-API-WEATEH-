const form = document.querySelector("#form")
const searchInput = document.querySelector("#search-input")
const weatherCards = document.querySelector(".weather__cards")
const weatherBottomCard = document.querySelector(".weather__bottom__cards")

async function getWeather(searchText="Toshkent") {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${searchText}&days=7&aqi=yes&alerts=yes`)
    data
        .json()
        .then(respons => {
            if (respons.error) {
                throw new Error("Bunday qiymat qabul qilinmadi bu nom ostidagi DAVLAT yoki SHAXAR mavjud emas")
            }
            mapWeatherType(respons)
        })
        .catch(error => {
            alert(error)
        })
}
getWeather()

function mapWeatherType(weatherType) {
    console.log(weatherType);

    weatherCards.innerHTML =   `
        <h2 class="weather__title">${weatherType.location.name}. ${weatherType.location.country}</h2>
        <div class="weather__card">
            <img src=${weatherType.current.condition.icon} alt="Weather icon">
            <h2 class="weather__card__title">${weatherType.current.temp_c}°</h2>
            <p class="weather__card__desc">C</p>
        </div>
        <p class="weather__title">Updated as of ${weatherType.location.localtime.split(" ").slice(1)} PM</p>
        <div class="weather__info">
            <p class="weather__info__desc">Feels Like: ${weatherType.current.feelslike_c}°</p>
            <p class="weather__info__desc">Wind: ${weatherType.current.wind_mph} mph</p>
            <p class="weather__info__desc">Visibility: ${weatherType.current.vis_miles} mi</p>
            <p class="weather__info__desc">Vis km: ${weatherType.current.vis_km} in</p>
            <p class="weather__info__desc">Humidity: ${weatherType.current.humidity}%</p>
        </div>
    `
    let cardInfo = ""
    let date = new Date()
    let hours = date.getHours()
    weatherType.forecast.forecastday[0].hour.slice(hours+1).forEach((hour)=>{
        cardInfo +=`
            <div class="weather__bottom__part">
                <h3 class="weather__bottom__hour">Time: ${hour.time.split(" ").slice(1)}</h3>
                <img src=${hour.condition.icon} alt="Weather icon" />
                <p class="weather__bottom__deg">${hour.temp_c}°</p>
                <p class="weather__bottom__text">${hour.condition.text}</p>
            </div>
        `
    })
    weatherBottomCard.innerHTML = cardInfo
}

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    let value = searchInput.value
    getWeather(value)
    searchInput.value=""
})