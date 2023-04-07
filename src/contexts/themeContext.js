import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { createContext } from "react";

export const ColorModeContext=createContext({
    toggleTheme:()=>{},
    theme:'light'
})

export const ColorModeContextProvider =({children})=>{
    const [mode, setMode] = React.useState(localStorage.getItem('theme')||'dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
            localStorage.setItem('theme',prevMode === 'light' ? 'dark' : 'light')
            return prevMode === 'light' ? 'dark' : 'light'});
      },
    }),
    [],
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
       {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}