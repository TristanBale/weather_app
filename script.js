const apiKey = '749bf247d9bb492e9bb192226232511';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const currentWeather = document.getElementById('currentWeather')

async function getWeatherData() {
    const weatherResponse = await fetch('http://api.weatherapi.com/v1/current.json?key=749bf247d9bb492e9bb192226232511&q=singapore&aqi=no', {mode: 'cors'});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    currentWeather.innerText = weatherData.current.feelslike_c;
}

getWeatherData();
