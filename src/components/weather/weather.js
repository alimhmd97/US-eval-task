import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
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



  return (
    <Box >
      {weather ? (
        <>
          <Typography sx={{display:'inline-block'}} >{weather.name}, {weather.sys.country}</Typography>
          <Typography sx={{display:'inline-block'}} >{weather.weather[0].description}</Typography>
          <Typography sx={{display:'inline-block'}} >{Math.round(weather.main.temp)}°C</Typography>
        </>
      ) : (
        <Typography sx={{display:'inline-block'}} >Loading...</Typography>
      )}
    </Box>
  );
}

export  {CurrentWeather};
