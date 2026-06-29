require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const { saveHistory } = require('./db');

let searchHistory = [];

function updateHistory(city) {
    const normalizedCity = city.trim().toLowerCase();
    
    const formatCity = normalizedCity.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') // Format city name to Title Case;

    const filteredHistory = saveHistory.filter(item => item.trim().toLowerCase() !== normalizedCity);
    
    return [formatCity, ...filteredHistory].slice(0, 5); // Add new city to the beginning and limit history to 5 items
}

app.use(cors());

app.get('/', (req, res) => {
    res.json(
        {
            "message": "Hello, World!",
            'status': 'success'
        }
    )
});

app.get('/about', (req, res) => {
    res.json(
        {
            "name": "Lei",
            "role": "Frontend Developer"
        }
    )
});

app.get('/weather/:city',  async (req, res) => {
    const city = req.params.city;

    try {
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`);
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error('City not found');
        }

        const weatherData = {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description
        };

        // Add city to search history
        await saveHistory(weatherData.city);

        res.json(weatherData);
    } catch (error) {
        res.status(404).json({ 
            message: error.message
        });
    }
});

app.get('/history', (req, res) => {
    res.json({
        history: searchHistory
    });
});

app.delete('/history', (req, res) => {
    searchHistory = [];
    res.json({
        message: 'Search history cleared'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

