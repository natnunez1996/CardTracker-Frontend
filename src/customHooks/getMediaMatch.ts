import { useMediaQuery } from "@mui/material";

export const getMediaMatch = (): boolean => {
    const match = useMediaQuery('(min-width: 600px', { noSsr: true });
    return match
}