import { RouterProvider } from 'react-router-dom'
import './App.css'
import Header from '@/shared/header'
import { getUserIdHook } from '@/customHooks';
import router from '@/routes'
import { Box, PaletteMode, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';


function App() {

  const user = getUserIdHook();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const storedMode: string | null = localStorage.getItem('mode')

  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light')

  const toggleColorMode = () => {
    const newMode: 'light' | 'dark' = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('mode', newMode)
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        },
      }),
    [mode]
  );


  useEffect(() => {
    if (storedMode === 'light' || storedMode === 'dark') {
      setMode(storedMode);
    }
  }, [storedMode])

  return (
    <ThemeProvider theme={theme}>
      <Header mode={mode} toggleColorMode={toggleColorMode} userProfile={user} />
      <Box
        minHeight={'93vh'}
        sx={{
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : theme.palette.background.paper,
        }}
      >
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  )
}

export default App
