async function getWeatherForecast() {
    const apiKey = '961c9d902ebd6fae639683183a4db270'; // replace with your OpenWeatherMap API key
    const cityName = 'Round Rock';
    
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
      console.log(temperature)
      console.log(weatherData);
    } catch (error) {
      console.log('There was a problem with the fetch operation: ' + error.message);
    }
  }
  
  getWeatherForecast();
  