# Weather Dashboard

## Description

Weather Dashboard is a web application designed to provide weather forecast information for any city in the world. The application uses the OpenWeatherMap API to gather data and display the current weather conditions, as well as a five-day forecast.

The application is intuitive and user-friendly, offering a simple search functionality to quickly fetch weather data. Cities searched for are stored and displayed in a list for easy future reference. 

## Features

- Current weather information including temperature, wind speed, and humidity.
- Five-day forecast including temperature, wind speed, and humidity.
- Persistent data: previously searched cities are stored in local storage for easy future access.
- Mobile-responsive design, so you can check your forecast on the go.

## Installation

This is a web application and does not need to be installed. Simply visit the live application https://landywandy.github.io/Weather-Dashboard/ to start using.

## Usage

1. Enter a city name in the "Search for a City:" input box.
2. Click the "Search" button.
3. The current weather and the five-day forecast for that city will be displayed on the screen.
4. The searched city will be saved and displayed under the "Cities" list on the sidebar.

## Development

This project was developed with JavaScript, using the Fetch API to make HTTP requests to the OpenWeatherMap API. The page layout was designed with Bootstrap and custom CSS. Persistent data is handled using the Web Storage API (localStorage).
