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
    match: boolean,
    mode: 'light' | 'dark',
    toggleColorMode: () => void,
}


const Header = ({ match, mode, toggleColorMode }: Props) => {
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
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                {match ?
                    //UI for PC
                    <>
                        <CardTrackerTitle navigate={navigate} theme={theme} />
                        <UserBar mode={mode} navigate={navigate} theme={theme} toggleColorMode={toggleColorMode} user={user} />
                    </>
                    :
                    //UI for Mobile Devices
                    <>
                        <UserBarMobile navigate={navigate} theme={theme} user={user} />
                        <CardTrackerTitle navigate={navigate} theme={theme} />
                        <ThemeSwitch mode={mode} handleClick={toggleColorMode} theme={theme} />
                    </>
                }
            </Box>

        </AppBar >
    )
}

export default Header