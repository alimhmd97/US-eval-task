import { Paper } from '@mui/material';
import './App.css';
import Todo from './components/todoList/Todo';
import { ColorModeContextProvider } from './contexts/themeContext';
import { ToggleTheme } from './components/toggleTheme/ToggleTheme';
import { WeatherDialog } from './components/weather/weatherDialog';

function App() {
  return (
    <ColorModeContextProvider>
    <Paper elevation={0} className='app_wrapper'>
      <ToggleTheme/>
        <Todo/>
    <WeatherDialog/>
    </Paper>
    </ColorModeContextProvider>
  );
}

export default App;
