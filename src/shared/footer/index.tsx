import { BottomNavigation, Box, Link, Paper, Typography, useTheme } from '@mui/material'

type Props = {}

const Footer = (props: Props) => {
    const theme = useTheme();
    return (
        <Box position={'fixed'} bottom={0} width={'100%'} bgcolor={theme.palette.background.paper}>
            <Typography variant='caption' sx={{ color: theme.palette.text.primary }} > &#169; Authored by: <Link href="https://github.com/natnunez1996">Nathaniel Nunez</Link></Typography>
        </Box>
    )
}

export default Footer