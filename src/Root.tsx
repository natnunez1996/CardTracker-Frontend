import { ThemeProvider } from '@emotion/react'
import { useMediaQuery, type PaletteMode, createTheme, Box } from '@mui/material'
import { useState, useMemo, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getMediaMatch } from './customHooks'
import Header from './common/header'
import Footer from './common/footer'

const Root = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const storedMode: string | null = localStorage.getItem('mode')

  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light')
  const match = getMediaMatch()

  const toggleColorMode = (): void => {
    const newMode: 'light' | 'dark' = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('mode', newMode)
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  useEffect(() => {
    if (storedMode === 'light' || storedMode === 'dark') {
      setMode(storedMode)
    }
  }, [storedMode])

  return (
    <ThemeProvider theme={theme}>
      <Header match={match} mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        minHeight={'93vh'}
        width={'100%'}
        sx={{
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : theme.palette.background.paper
        }}
      >
        <Outlet context={match} />
      </Box>
      <Footer />
    </ThemeProvider>
  )
}

export default Root
