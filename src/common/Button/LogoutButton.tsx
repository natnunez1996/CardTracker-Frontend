import { logout } from '@/actions/auth'
import { useAppDispatch } from '@/hook'
import { LogoutOutlined } from '@mui/icons-material'
import { IconButton, ListItemIcon, Theme, Typography } from '@mui/material'
import { NavigateFunction } from 'react-router-dom'

type Props = {
    navigate: NavigateFunction,
    theme: Theme
}

export const LogoutButton = ({ navigate, theme }: Props) => {
    const dispatch = useAppDispatch();


    const onLogOut = () => {
        dispatch(logout);
        navigate('/login', { replace: true })
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
