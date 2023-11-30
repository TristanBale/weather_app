const apiKey = '749bf247d9bb492e9bb192226232511';
let country = 'singapore';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const weatherInfoHTML = document.getElementById('weatherInfo');

const locationHTML = document.querySelector('.location');
const dateAndTime = document.querySelector('.dateAndTime');
const weatherLogo = document.querySelector('.weatherLogo');
const weatherDescription = document.querySelector('.weatherDescription');
const temperatureActual = document.querySelector('.temperatureActual');
const temperatureFeelsLike = document.querySelector('.temperatureFeelsLike');






searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    const searchTermProcessed = searchTerm.toLowerCase();
    //console.log(searchTerm);
    console.log(searchTermProcessed);
    getForecastWeatherData(searchTermProcessed).catch(err => {
        console.log(err.error['message']);
    });
});

async function getCurrentWeatherData(country) {
    const weatherResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country}&aqi=no`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    weatherInfoHTML.innerText += weatherData.location['country'];
}

async function getForecastWeatherData(country) {
    const weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country}&days=3&aqi=no&alerts=no`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    const feelsLikeC = weatherData.current.feelslike_c;
    const feelsLikeF = weatherData.current.feelslike_f;
    const tempC = weatherData.current.temp_c;
    const tempF = weatherData.current.temp_f;

    const weatherTextInfo = weatherData.current.condition['text'];
    const weatherInfoIcon = weatherData.current.condition['icon'];

    const percipitation = weatherData.current.percip_mm;
    const humidity = weatherData.current.humidity;
    const windSpeed = weatherData.current.wind_kph;
    const windDirection = weatherData.current.wind_dir;
    const visibility = weatherData.current.vis_km;
    const uv = weatherData.current.uv;

    const localTime = weatherData.location.localtime;
    const location = weatherData.location.country;

    console.log(tempC);
    //weatherInfoHTML.innerText += weatherData.location['country'];

    locationHTML.innerText = location;
    dateAndTime.innerText = localTime;
    weatherLogo.src = weatherInfoIcon;
    weatherDescription.innerText = weatherTextInfo;
    temperatureActual = tempC;
    temperatureFeelsLike = feelsLikeC;


}

//getForecastWeatherData(country);
//getCurrentWeatherData(country);