import React, { useState } from 'react';
import axios from 'axios';
import './WeatherPage.css'; // Import the CSS file

const API_KEY = '8d15b2ceec7b0af86d29df8bf2d3796d';

function WeatherPage({ user }) {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(currentWeatherUrl).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  const getWeatherForecast = () => {
    axios.get(forecastUrl).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation('');
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}

        <div className="buttons">
          <button onClick={() => getWeatherForecast()}>Today's Weather</button>
          <button onClick={() => getWeatherForecast(7)}>View More (7-day forecast)</button>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;