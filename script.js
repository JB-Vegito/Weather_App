// IMPORTANT !!!!

// const apikey = "Create an api key on openweather website and use it"

const weatherDataEl = document.getElementById("weather-data")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event) => {
    
    event.preventDefault();
    
    const cityValue = cityInputEl.value;

    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response is not ok")
        }

        const data = await response.json()

        const temp = Math.round(data.main.temp)
        const desc = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temp}°C`;
        weatherDataEl.querySelector(".description").textContent = desc;
        weatherDataEl.querySelector(".details").innerHTML = details.map(
            (detail) => `<div>${detail}</div>`
        ).join("");
    }
    catch(error){
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error occurred ! Please try again later.";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}
