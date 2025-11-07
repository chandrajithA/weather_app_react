import React from 'react';
import './WeatherCard.css'; // For WeatherCard specific styling

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const iconCode = weather[0].icon;
  // Use HTTPS for the icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-card">
      <h2 className="city-name">{name}</h2>
      <div className="weather-info-main">
        <img src={iconUrl} alt={weather[0].description} className="weather-icon" />
        <p className="temperature">{Math.round(main.temp)}°C</p>
      </div>
      <p className="description">{weather[0].description}</p>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Humidity:</span>
          <span className="value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Feels Like:</span>
          <span className="value">{Math.round(main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind Speed:</span>
          <span className="value">{wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="label">Min Temp:</span>
          <span className="value">{Math.round(main.temp_min)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Max Temp:</span>
          <span className="value">{Math.round(main.temp_max)}°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;