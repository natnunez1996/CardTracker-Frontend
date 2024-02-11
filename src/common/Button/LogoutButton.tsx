import { logout } from '@/actions/auth'
import { useAppDispatch } from '@/hook'
import { LogoutOutlined } from '@mui/icons-material'
import { IconButton, ListItemIcon, type Theme, Typography } from '@mui/material'
import { type NavigateFunction } from 'react-router-dom'

interface Props {
  navigate: NavigateFunction
  theme: Theme
}

export const LogoutButton = ({ navigate, theme }: Props) => {
  const dispatch = useAppDispatch()

  const onLogOut = (): void => {
    dispatch(logout)
    navigate('/', { replace: true })
    window.location.reload()
  }
  return (
    <IconButton onClick={onLogOut}>
      <ListItemIcon>
        <LogoutOutlined color="error" />
      </ListItemIcon>
      <Typography variant="button" sx={{ color: theme.palette.error.main }}>Log Out</Typography>
    </IconButton>
  )
}
