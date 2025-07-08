const apiKey = "a408e41bcb7c8db4ddade5d78b0c7788"; 
const unsplashAccessKey = "ogvQqtW7M-R-8JJNfk8zL9dpwKioiHnWQliOTwLX7bk"; // Substitua pela sua chave de acesso do Unsplash

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funcoes

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
}

const setCityBackground = async (city) => {
    try {
        const unsplashURL = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(city)}&client_id=${unsplashAccessKey}&orientation=landscape`;
        const res = await fetch(unsplashURL);
        const data = await res.json();
        if (data && data.urls && data.urls.full) {
            document.body.style.backgroundImage = `linear-gradient(180deg, #594cee99 0%, #8DD0F599 100%), url('${data.urls.full}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
        }
    } catch (error) {
        document.body.style.background = "linear-gradient(180deg, #594cee 0%, #8DD0F5 100%)";
    }
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    // Bandeira correta usando flagsapi.com
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    umidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

    weatherContainer.classList.remove("hide");

    setCityBackground(city);
}

// eventos 

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});