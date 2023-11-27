const apiKey = '749bf247d9bb492e9bb192226232511';
let country = 'singapore';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const weatherInfoHTML = document.getElementById('weatherInfo');

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
    const weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country}&days=5&aqi=no&alerts=no`, {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    const feelsLikeC = weatherData.current.feelslike_c;
    const feelsLikeF = weatherData.current.feelslike_f;
    const tempC = weatherData.current.temp_c;
    const tempF = weatherData.current.temp_f;
    const weatherTextInfo = weatherData.current.condition['text'];
    const weatherInfoIcon = weatherData.current.condition['icon'];
    const humidity = weatherData.current.humidity;
    const windSpeed = weatherData.current.wind_kph;
    const windDirection = weatherData.current.wind_dir;
    const uv = weatherData.current.uv;
    const localTime = weatherData.location.localtime;

    console.log(tempC);
    weatherInfoHTML.innerText += weatherData.location['country'];
}

//getForecastWeatherData(country);
//getCurrentWeatherData(country);