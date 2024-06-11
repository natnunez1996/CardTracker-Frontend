import { isPasswordCorrect } from '@/actions/auth'
import AccountSettingsTextField from '@/common/AccountSettingsForm/AccountSettingsTextField'
import { useAppDispatch, useAppSelector } from '@/hook'
import { type IUser } from '@/model/UserModel'
import { type IAccountSettings } from '@/model/auth/IAccountSettings'
import { Box, Button, Modal, type Theme, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { type SubmitHandler, type UseFormHandleSubmit, useForm } from 'react-hook-form'

interface Props {
  disabled?: boolean
  formRef: React.RefObject<HTMLFormElement>
  handleSubmit: UseFormHandleSubmit<IAccountSettings>
  style: any
  theme: Theme
  user: IUser
}

const PasswordVerification = ({ disabled = false, formRef, style, theme, user }: Props) => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.auth.message)
  const verifiedPassword = useAppSelector(state => state.auth.isPasswordCorrect)

  const [open, setOpen] = useState(false)
  const modalOpen = (): void => { setOpen(true) }
  const modalClose = (): void => { setOpen(false) }

  const { control, handleSubmit } = useForm<IAccountSettings>()

  const onSubmit: SubmitHandler<IAccountSettings> = (data: IAccountSettings) => {
    dispatch(isPasswordCorrect({ email: user.email, password: data.password }))
  }

  useEffect(() => {
    if (verifiedPassword) {
      if (formRef.current !== null) {
        formRef.current.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        )
      }
    }
  }, [formRef, verifiedPassword])

  return (
    <Box>
      <Button disabled={disabled} fullWidth onClick={modalOpen} >Update Changes</Button>
      <Modal
        open={open}
        onClose={modalClose}
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>Input Password to save changes.</Typography>
            <AccountSettingsTextField
              control={control}
              label="Password"
              name='password'
              autoFocus
              error={verifiedPassword ? '' : error}
              showPassword
            />
            <Button fullWidth type='submit'>Update</Button>
            <Button fullWidth color="error" onClick={modalClose}>Cancel</Button>
          </form>
        </Box>
      </Modal>
    </Box>
  )
}

export default PasswordVerification
