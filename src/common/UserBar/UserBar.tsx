import { Box, Button, Typography, Menu, MenuList, MenuItem, type Theme } from '@mui/material'
import ThemeSwitch from '@/common/ThemeSwitch'
import { type IUser } from '@/model/UserModel'
import React, { useState } from 'react'
import { type NavigateFunction } from 'react-router-dom'
import { LogoutButton, ProfileButton } from '@/common/Button'
import { capitalize } from '@/utils'

interface Props {
    mode: 'light' | 'dark'
    navigate: NavigateFunction
    theme: Theme
    toggleColorMode: () => void
    user: IUser | undefined
}

const UserBar = ({ mode, navigate, theme, toggleColorMode, user }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>()

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (): void => {
        setAnchorEl(null)
    }

    return (
        <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
            {
                user !== undefined &&
                <>
                    <Button sx={{ textTransform: 'none' }} onClick={handleClick}>
                        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>{`${capitalize(user.firstName)} ${capitalize(user.lastName)}`}</Typography>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuList>
                            <MenuItem>
                                <ProfileButton navigate={navigate} theme={theme} user={user} />
                            </MenuItem>
                            <MenuItem>
                                <LogoutButton navigate={navigate} theme={theme} />
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </>
            }

            <ThemeSwitch mode={mode} handleClick={toggleColorMode} theme={theme} />
        </Box >
    )
}

export default UserBar
