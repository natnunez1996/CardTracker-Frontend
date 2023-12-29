import { ThemeProvider } from "@emotion/react";
import { useMediaQuery, PaletteMode, createTheme, Box } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserIdHook } from "./customHooks";
import Header from "./shared/header";

const Root = () => {

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
                width={'100%'}
                sx={{
                    backgroundColor: theme.palette.mode === 'dark'
                        ? theme.palette.background.default
                        : theme.palette.background.paper,
                }}
            >
                <Outlet />
            </Box>
        </ThemeProvider>
    )
}

export default Root;