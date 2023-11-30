const apiKey = '749bf247d9bb492e9bb192226232511';
let country = 'singapore';
let currentMode = 'C';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const temperatureToggle = document.querySelector('.temperatureToggle'); 
const weatherInfoHTML = document.getElementById('weatherInfo');

const locationHTML = document.querySelector('.location');
const dateAndTime = document.querySelector('.dateAndTime');
const weatherLogo = document.querySelector('.weatherLogo');
const weatherDescription = document.querySelector('.weatherDescription');
const temperatureActual = document.querySelector('.temperatureActual');
const temperatureFeelsLike = document.querySelector('.temperatureFeelsLike');

const weatherTextData = document.querySelector('#weatherTextData');

const dateAndTime0 = document.querySelector('.dateAndTime0');
const percipChance0 = document.querySelector('.chanceOfRain0');
const weatherLogo0 = document.querySelector('.weatherLogo0');
const avgTemp0 = document.querySelector('.avgTemp0');

const dateAndTime1 = document.querySelector('.dateAndTime1');
const percipChance1 = document.querySelector('.chanceOfRain1');
const weatherLogo1 = document.querySelector('.weatherLogo1');
const avgTemp1 = document.querySelector('.avgTemp1');

const dateAndTime2 = document.querySelector('.dateAndTime2');
const percipChance2 = document.querySelector('.chanceOfRain2');
const weatherLogo2 = document.querySelector('.weatherLogo2');
const avgTemp2 = document.querySelector('.avgTemp2');

temperatureToggle.addEventListener('click', () => {
    if (currentMode == 'C') {
        currentMode = 'F';
        temperatureToggle.innerHTML = '<span>°C / <b>°F</b></span>';
    } else if (currentMode == 'F') {
        currentMode = 'C';
        temperatureToggle.innerHTML = '<span><b>°C</b> / °F</span>';
    }
    getForecastWeatherData(country).catch(err => {
        console.log(err.error['message']);
    });
});


searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    const searchTermProcessed = searchTerm.toLowerCase();
    //console.log(searchTerm);
    console.log(searchTermProcessed);
    country = searchTermProcessed;
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
    const highestTempC = weatherData.forecast.forecastday['0'].day.maxtemp_c;
    const lowestTempC = weatherData.forecast.forecastday['0'].day.mintemp_c;
    const highestTempF = weatherData.forecast.forecastday['0'].day.maxtemp_f;
    const lowestTempF = weatherData.forecast.forecastday['0'].day.mintemp_f;
    const chanceOfRain = weatherData.forecast.forecastday['0'].day.daily_chance_of_rain;

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

   
    locationHTML.innerText = location;
    dateAndTime.innerText = localTime;
    weatherLogo.src = weatherInfoIcon;
    weatherDescription.innerText = weatherTextInfo;
    //temperatureActual.innerText = `${tempC}°`;
    //temperatureFeelsLike.innerText = `Feels like ${feelsLikeC}°`;
    //highLow.innerText = `H: ${highestTempC} L: ${lowestTempC}`;

    //weatherTextData.innerText = `Today: ${weatherTextInfo}. Currently feels like ${feelsLikeC}°. The high will be ${highestTempC}°. The low tonight will be ${lowestTempC}°.`;

    dateAndTime0.innerText = getDaysDigitFromDate(weatherData.forecast.forecastday['0']['date']);
    percipChance0.innerText = `Chance of rain: ${chanceOfRain}%`;
    weatherLogo0.src = weatherData.forecast.forecastday['0'].day.condition['icon'];
    //avgTemp0.innerText = weatherData.forecast.forecastday['0'].day.avgtemp_c;

    dateAndTime1.innerText = getDaysDigitFromDate(weatherData.forecast.forecastday['1']['date']);
    percipChance1.innerText = `Chance of rain: ${weatherData.forecast.forecastday['1'].day.daily_chance_of_rain}%`;
    weatherLogo1.src = weatherData.forecast.forecastday['1'].day.condition['icon'];
    //avgTemp1.innerText = weatherData.forecast.forecastday['1'].day.avgtemp_c;

    dateAndTime2.innerText = getDaysDigitFromDate(weatherData.forecast.forecastday['2']['date']);
    percipChance2.innerText = `Chance of rain: ${weatherData.forecast.forecastday['2'].day.daily_chance_of_rain}%`;
    weatherLogo2.src = weatherData.forecast.forecastday['2'].day.condition['icon'];
    //avgTemp2.innerText = weatherData.forecast.forecastday['2'].day.avgtemp_c;

    if (currentMode == 'C') {
        temperatureActual.innerText = `${tempC}°`;
        weatherTextData.innerText = `Today: ${weatherTextInfo}. Currently feels like ${feelsLikeC}°. The high will be ${highestTempC}°. The low tonight will be ${lowestTempC}°.`;
        avgTemp0.innerText = weatherData.forecast.forecastday['0'].day.avgtemp_c;
        avgTemp1.innerText = weatherData.forecast.forecastday['1'].day.avgtemp_c;
        avgTemp2.innerText = weatherData.forecast.forecastday['2'].day.avgtemp_c;
    }

    if (currentMode == 'F') {
        temperatureActual.innerText = `${tempF}°`;
        weatherTextData.innerText = `Today: ${weatherTextInfo}. Currently feels like ${feelsLikeF}°. The high will be ${highestTempF}°. The low tonight will be ${lowestTempF}°.`;
        avgTemp0.innerText = weatherData.forecast.forecastday['0'].day.avgtemp_f;
        avgTemp1.innerText = weatherData.forecast.forecastday['1'].day.avgtemp_f;
        avgTemp2.innerText = weatherData.forecast.forecastday['2'].day.avgtemp_f;
    }

}

function getDaysDigitFromDate(date) {
    let result = '';
    result = date.slice(-2);
    return result;
}

getForecastWeatherData('singapore');
//getCurrentWeatherData(country);