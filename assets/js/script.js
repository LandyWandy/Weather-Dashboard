// require('dotenv').config();

const cityInputButton = document.getElementById('cityInputButton');

// Load cities from local storage at startup
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
storedCities.forEach(city => {
    createButton(city);
});

cityInputButton.addEventListener("click", (e) => {
  e.preventDefault();
  
  const cityInput = document.getElementById('cityInput').value;
  
  createButton(cityInput);

  // Store cities in local storage
  storedCities.push(cityInput);
  localStorage.setItem('cities', JSON.stringify(storedCities));
});

function createButton(cityName) {
  const ul = document.getElementById('cityList');
  const button = document.createElement('button');

  button.textContent = cityName;

  button.classList.add('selectCityButton');

  button.addEventListener('click', () => {
    getWeatherForecast(cityName);
  });

  ul.appendChild(button);
}



async function getWeatherForecast(cityInput) {
  const apiKey = '961c9d902ebd6fae639683183a4db270'; // replace with your OpenWeatherMap API key
  const cityName = cityInput;
  
  const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

  let lat, lon;

  try {
    const response = await fetch(url1);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const coordinateSync = await response.json();
    
    lat = coordinateSync[0].lat;
    lon = coordinateSync[0].lon;
    
    console.log(coordinateSync)
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  } catch (error) {
    console.log('There was a problem with the fetch operation: ' + error.message);
  }

  const url2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url2);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const weatherData = await response.json();
    
    const temperature = weatherData.list[0].main.temp;
    const wind = weatherData.list[0].wind.speed;
    const humidity = weatherData.list[0].main.humidity;

    // Get the elements from the HTML
    const currentCity = document.getElementById('currentCity')
    const tempElement = document.querySelector('#weatherData li:nth-child(2)');
    const windElement = document.querySelector('#weatherData li:nth-child(3)');
    const humidityElement = document.querySelector('#weatherData li:nth-child(4)');

    // Set the content of the elements
    currentCity.textContent = "Current City: " + cityName;
    tempElement.textContent = "Temp: " + temperature;
    windElement.textContent = "Wind: " + wind;
    humidityElement.textContent = "Humidity: " + humidity;

    for(let i = 1; i <= 5; i++) {
      // Get the forecast data for the next five days at the same time as the current forecast
      // The API gives forecasts in three-hour intervals, so we multiply i by 8 to get the same time on each day
      createForecast(i, weatherData.list[i * 8]);
  }
    
  } catch (error) {
    console.log('There was a problem with the fetch operation: ' + error.message);
  }
}

function createForecast(day, data) {
  const dayElement = document.getElementById(`day${day}`);

  // Clear out the existing contents of the dayElement
  dayElement.innerHTML = '';

  // Create HTML structure for the day
  const dateElement = document.createElement('p');
  const tempElement = document.createElement('p');
  const windElement = document.createElement('p');
  const humidityElement = document.createElement('p');

  // Set the content of the elements
  dateElement.textContent = "Date: " + data.dt_txt;
  tempElement.textContent = "Temp: " + data.main.temp;
  windElement.textContent = "Wind: " + data.wind.speed;
  humidityElement.textContent = "Humidity: " + data.main.humidity;

  // Append the elements to the dayElement
  dayElement.appendChild(dateElement);
  dayElement.appendChild(tempElement);
  dayElement.appendChild(windElement);
  dayElement.appendChild(humidityElement);
}
  
//   getWeatherForecast();
  