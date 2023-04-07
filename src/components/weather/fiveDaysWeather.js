//  FiveDaysWeather;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const HourlyWeatherWrapper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
}));

const DailyWeatherWrapper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
}));

function FiveDaysWeather() {
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const [dailyWeather, setDailyWeather] = useState([]);

    useEffect(() => {
        // Get user's location
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            // Send request to weather API for hourly forecast
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
                .then((response) => {
                    const hourlyData = response.data.list.filter((data) => data.dt_txt.includes('12:00:00'));
                    setHourlyWeather(hourlyData);
                })
                .catch((error) => {
                    console.error(error);
                });

            // Send request to weather API for daily forecast
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=daily&appid=${API_KEY}&units=metric`)
                .then((response) => {
                    setDailyWeather(response?.data.list?.slice(0,5));
                })
                .catch((error) => {
                    console.error(error);
                    console.log(error);
                });
        });
    }, []);

    return (
        <Box sx={{ p: 3 }} >
            <Typography variant="h4" gutterBottom>
                Today's Weather
            </Typography>
            <Grid container spacing={3}>
                {hourlyWeather.map((data) => (
                    <Grid item xs={3} key={data.dt}>
                        <HourlyWeatherWrapper>
                            {/* <Typography variant="subtitle1">{new Date(data.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric' })}</Typography> */}
                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={data.weather[0].description} />
                            <Typography variant="subtitle2">{data.main.temp.toFixed(0)}°C</Typography>
                        </HourlyWeatherWrapper>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" gutterBottom>
                Next 5 Days
            </Typography>
            <Grid container spacing={3}>
                {dailyWeather.map((data) => (
                    <Grid item xs={4} key={data.dt} color='primary'>
                        <DailyWeatherWrapper>
                            <Typography variant="subtitle1">{new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</Typography>
                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={data.weather[0].description} />
                      {   console.log(data)}
                            <Typography variant="subtitle2">{data?.main?.temp?.toFixed(0)}°C</Typography>
                        </DailyWeatherWrapper>
                    </Grid>
                ))}
            </Grid>
        </Box>)
}
export {FiveDaysWeather}