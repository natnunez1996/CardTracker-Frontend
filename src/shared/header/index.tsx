import { useAppDispatch } from "@/hook";
import IUser from '@/model/UserModel/IUser'
import { useEffect, useState } from "react";
import { logout } from "@/actions/auth";
import { IProfile } from "@/model/UserModel/IProfile";
import { AppBar, Box, Button, Link, Menu, Typography, useTheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

type Props = {
    mode: 'light' | 'dark',
    toggleColorMode: () => void,
    userProfile: IProfile | undefined
}


const Header = ({ mode, toggleColorMode, userProfile }: Props) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const userData = localStorage.getItem('profile');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
    const [user, setUser] = useState<IUser>();

    const open = Boolean(anchorEl)



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    useEffect(() => {
        if (userData !== null) {
            const getUser = JSON.parse(userData)
            setUser(getUser.result)
        }

    }, [])

    const onLogOut = () => {
        dispatch(logout);
    }



    return (
        <AppBar sx={{
            backgroundColor: theme.palette.background.paper,
        }} position="sticky">
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h4" >
                    <Link href='/home' sx={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
                        Card Tracker
                    </Link>
                </Typography>
                {!userProfile && <div className="middle"> <h1>Please <a href="/login">Login</a> first</h1></div>}
                <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
                    {
                        user &&
                        <Button onClick={handleClick}>
                            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>{`${user.name}`}</Typography>
                        </Button>
                    }
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Button color="error" onClick={onLogOut}>Log out</Button>
                    </Menu>
                    <Button onClick={toggleColorMode}>
                        {mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
                    </Button>
                </Box>
            </Box>
        </AppBar >
    )
}

export default Header