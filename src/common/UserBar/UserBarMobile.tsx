import { IUser } from "@/model/UserModel"
import { LogoutButton, ProfileButton } from "@/common/Button"
import { MenuRounded } from "@mui/icons-material"
import { IconButton, Menu, MenuList, MenuItem, Theme } from "@mui/material"
import { useState } from "react"
import { NavigateFunction } from "react-router-dom"

type Props = {
    navigate: NavigateFunction,
    theme: Theme,
    user: IUser
}

const UserBarMobile = ({ navigate, theme, user }: Props) => {
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

    const menuOpen = Boolean(menuAnchorEl);
    const menuClose = () => setMenuAnchorEl(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    }

    return (<>
        <IconButton onClick={handleMenu} >
            <MenuRounded />
        </IconButton>
        <Menu
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={menuClose}
            onClick={menuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuList>
                <MenuItem>
                    <ProfileButton
                        buttonName={`${user.firstName} ${user.lastName}`}
                        navigate={navigate} theme={theme}
                        user={user}
                    />
                </MenuItem>
                <MenuItem>
                    <LogoutButton navigate={navigate} theme={theme} />
                </MenuItem>
            </MenuList>
        </Menu>
    </>
    )
}

export default UserBarMobile