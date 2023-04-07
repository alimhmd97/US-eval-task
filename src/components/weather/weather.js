import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
console.log(API_KEY);
function CurrentWeather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Send request to weather API
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  const handleViewMore = () => {
    // Navigate to page with weather for next 5 days
    // You can use React Router or another navigation library to accomplish this
  };

  return (
    <Box>
      {weather ? (
        <>
          <Typography variant="h4">{weather.name}, {weather.sys.country}</Typography>
          <Typography variant="h6">{weather.weather[0].description}</Typography>
          <Typography variant="h1">{Math.round(weather.main.temp)}°C</Typography>
          <Button variant="contained" onClick={handleViewMore}>View More</Button>
        </>
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </Box>
  );
}

export  {CurrentWeather};
