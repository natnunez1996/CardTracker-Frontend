import { type IUser } from '@/model/UserModel'
import { AccountCircleOutlined } from '@mui/icons-material'
import { IconButton, ListItemIcon, type Theme, Typography } from '@mui/material'
import { type NavigateFunction } from 'react-router-dom'

interface Props {
  buttonName?: string
  navigate: NavigateFunction
  theme: Theme
  user: IUser
}

export const ProfileButton = ({ buttonName = 'Profile', navigate, theme, user }: Props) => {
  return (
    <IconButton
      onClick={() => { navigate(`/accountSettings/${user?._id}`) }}
      sx={{ color: theme.palette.text.primary }}
    >
      <ListItemIcon>
        <AccountCircleOutlined />
      </ListItemIcon>
      <Typography sx={{ textTransform: 'none' }} variant="button">{buttonName}</Typography>
    </IconButton>
  )
}
