import CardLogo from '@/assets/img/CardTrackerLogo.png'
import { IconButton, Avatar, Typography, Theme } from "@mui/material"
import { NavigateFunction } from 'react-router-dom'

type Props = {
    navigate: NavigateFunction,
    theme: Theme
}

const CardTrackerTitle = ({ navigate, theme }: Props) => {
    return (
        <IconButton onClick={() => navigate('/home', { replace: true })} sx={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
            <Avatar src={CardLogo} alt="CardTrackerLogo" sx={{ width: 40, height: 40, borderRadius: 0 }} />
            <Typography variant="h4">Card Tracker</Typography>
        </IconButton>
    )
}

export default CardTrackerTitle