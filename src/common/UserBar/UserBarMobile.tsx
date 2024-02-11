import { type IUser } from '@/model/UserModel'
import { LogoutButton, ProfileButton } from '@/common/Button'
import { MenuRounded } from '@mui/icons-material'
import { IconButton, Menu, MenuList, MenuItem, type Theme } from '@mui/material'
import React, { useState } from 'react'
import { type NavigateFunction } from 'react-router-dom'
import { capitalize } from '@/utils'

interface Props {
  navigate: NavigateFunction
  theme: Theme
  user: IUser | undefined
}

const UserBarMobile = ({ navigate, theme, user }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)

  const menuOpen = Boolean(menuAnchorEl)
  const menuClose = (): void => { setMenuAnchorEl(null) }

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setMenuAnchorEl(event.currentTarget)
  }

  return (
    user !== undefined
      ? <>
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
                buttonName={`${capitalize(user.firstName)} ${capitalize(user.lastName)}`}
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
      : <></>
  )
}

export default UserBarMobile
