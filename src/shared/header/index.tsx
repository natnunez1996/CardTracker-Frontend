import { AppBar, Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardTrackerTitle from "@/common/CardTrackerTitle";
import UserBar from "@/common/UserBar/UserBar";
import { useEffect, useState } from "react";
import { getUserIdHook } from "@/customHooks";
import { IUser } from "@/model/UserModel";
import UserBarMobile from "@/common/UserBar/UserBarMobile";
import ThemeSwitch from "@/common/ThemeSwitch";

type Props = {
    mode: 'light' | 'dark',
    toggleColorMode: () => void,
}


const Header = ({ mode, toggleColorMode }: Props) => {
    const match = useMediaQuery('(min-width: 600px');
    const navigate = useNavigate();
    const theme = useTheme();

    const userData = getUserIdHook()
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        if (userData !== undefined)
            setUser(userData.result)
    }, [])




    return (
        <AppBar sx={{
            backgroundColor: theme.palette.background.paper,
        }} position="sticky">
            {user &&
                (match ?
                    //UI for PC
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <CardTrackerTitle navigate={navigate} theme={theme} />
                        <UserBar mode={mode} navigate={navigate} theme={theme} toggleColorMode={toggleColorMode} user={user} />
                    </Box>
                    :
                    //UI for Mobile Devices
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <UserBarMobile navigate={navigate} theme={theme} user={user} />
                        <CardTrackerTitle navigate={navigate} theme={theme} />
                        <ThemeSwitch mode={mode} handleClick={toggleColorMode} theme={theme} />
                    </Box>
                )
            }
        </AppBar >
    )
}

export default Header