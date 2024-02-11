import * as actionTypes from '@/constants/actionTypes'
import AccountSettingsDataField from '@/common/AccountSettingsForm/AccountSettingsDataField'
import { type IUser } from '@/model/UserModel'
import { type IAccountSettings } from '@/model/auth/IAccountSettings'
import { Box, Container, Paper, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SpecifiedFormData from '@/pages/AccountSettings/SpecifiedFormData'
import { useAppDispatch, useAppSelector } from '@/hook'

interface Props {
  user: IUser
}

const AccountSettings = ({ user }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const specialMessage = useAppSelector(state => state.auth.specialMessage)

  const { control, handleSubmit, setValue, watch } = useForm<IAccountSettings>()
  const [open, setOpen] = useState(false)
  const modalOpen = (): void => { setOpen(true) }

  const [editedData, setEditedData] = useState({
    label: '',
    name: 'email' as keyof IAccountSettings,
    type: 'string',
    value: '' as string
  })

  const handleClick = (
    label: string,
    name: keyof IAccountSettings,
    type: 'string' | 'password',
    value: string): void => {
    modalOpen()
    setValue(name, value)
    setEditedData({ label, name, type, value })
  }

  useEffect(() => {
    if (user === undefined) {
      navigate('/login', { replace: true })
    }
  }, [user, navigate])

  useEffect(() => {
    if (specialMessage !== '') {
      alert(specialMessage)
      dispatch({ type: actionTypes.CLEAR_SPECIAL_MESSAGE })
      window.location.reload()
    }
  }, [dispatch, specialMessage])

  return (
    <Box
      alignItems={'center'}
      display={'flex'}
      flexDirection={'column'}
      height={'100vh'}
      width={'100%'}
    >
      <Container maxWidth="sm" sx={{ margin: '1rem' }} >
        <Paper variant="outlined" sx={{ padding: '1rem', borderRadius: '1rem', textAlign: 'center' }} >
          <Typography variant="h5">Account</Typography>
          <AccountSettingsDataField
            handleClick={handleClick}
            label='Email'
            name='email'
            value={user.email}
          />
          <AccountSettingsDataField
            handleClick={handleClick}
            label='First Name'
            name='firstName'
            showButton
            value={user.firstName}
          />
          <AccountSettingsDataField
            handleClick={handleClick}
            label='Last Name'
            name='lastName'
            showButton
            value={user.lastName}
          />
          <AccountSettingsDataField
            handleClick={handleClick}
            label='Password'
            name='password'
            showButton
            type='password'
            value={''}
          />
          <Button color='error' onClick={() => { navigate(-1) }}>Cancel</Button>
          <SpecifiedFormData
            control={control}
            editedData={editedData}
            handleSubmit={handleSubmit}
            open={open}
            setOpen={setOpen}
            user={user}
            watch={watch}
            key={editedData.name}
          />

        </Paper>
      </Container>
    </Box >
  )
}

export default AccountSettings
