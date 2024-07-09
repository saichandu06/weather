// script.js

// Function to fetch weather data from OpenWeatherMap
async function fetchWeatherData(city) {
    const apiKey = '0475da2ff5583218d6442b948e8bf4a1'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Function to process and display weather data using Chart.js
function displayWeatherGraph(weatherData) {
    const ctx = document.getElementById('weatherChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Temperature', 'Humidity', 'Pressure'],
            datasets: [{
                label: 'Weather Information',
                data: [
                    weatherData.main.temp,
                    weatherData.main.humidity,
                    weatherData.main.pressure
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to handle button click and fetch weather data
async function fetchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    try {
        const weatherData = await fetchWeatherData(cityInput);
        displayWeatherGraph(weatherData);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}
