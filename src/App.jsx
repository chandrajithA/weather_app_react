import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import './App.css'; // For overall app styling

// Accessing environment variable prefixed with VITE_
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async (cityName) => {
    if (!cityName) {
      setError('Please enter a city name.');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try again.');
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
        <form onSubmit={handleSubmit} className="city-input-form">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="city-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </header>

      <main className="App-main">
        {loading && <div className="loader"></div>}
        {error && <p className="error-message">{error}</p>}
        {weatherData && <WeatherCard data={weatherData} />}
      </main>
    </div>
  );
}

export default App;