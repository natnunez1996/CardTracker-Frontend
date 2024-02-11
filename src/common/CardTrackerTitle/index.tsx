import CardLogo from '@/assets/img/CardTrackerLogo.png'
import { IconButton, Avatar, Typography, type Theme } from '@mui/material'
import { type NavigateFunction } from 'react-router-dom'

interface Props {
  navigate: NavigateFunction
  theme: Theme
}

const CardTrackerTitle = ({ navigate, theme }: Props) => {
  return (
    <IconButton onClick={() => { navigate('/home', { replace: true }) }} sx={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
      <Avatar src={CardLogo} alt="CardTrackerLogo" sx={{ width: 40, height: 40, borderRadius: 0 }} />
      <Typography variant="h4">Card Tracker</Typography>
    </IconButton>
  )
}

export default CardTrackerTitle
