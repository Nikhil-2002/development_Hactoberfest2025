import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

const API_KEY = "292a81682b5777a6a35868ff8094ef5c";

const WeatherApp = () => {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [isDay, setIsDay] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
        const currentTime = new Date().getTime() / 1000;
        setIsDay(currentTime > data.sys.sunrise && currentTime < data.sys.sunset);
      }
    } catch (err) {
      setError('Unable to fetch weather',err);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSearch = () => {
    if (city) fetchWeather();
  };

  return (
    <div className={`weather-container ${isDay ? 'day' : 'night'}`}>
      <div className="weather-box">
        <h1>Find Weather in your City</h1>
        <div className="search">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{weather.weather[0].main}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p>Feels Like: {Math.round(weather.main.feels_like)}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>
              Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p>
              Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
