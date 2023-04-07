import { Paper } from '@mui/material';
import './App.css';
import Todo from './components/todoList/Todo';
import { CurrentWeather } from './components/weather/weather';
import { ColorModeContextProvider } from './contexts/themeContext';
import { ToggleTheme } from './components/toggleTheme/ToggleTheme';

function App() {
  return (
    <ColorModeContextProvider>
    <Paper elevation={0} className='app_wrapper'>
      <ToggleTheme/>
        <Todo/>
    <CurrentWeather/>
    </Paper>
    </ColorModeContextProvider>
  );
}

export default App;
