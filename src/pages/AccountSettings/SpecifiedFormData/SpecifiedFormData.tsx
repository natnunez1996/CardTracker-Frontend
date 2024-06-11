/* eslint-disable @typescript-eslint/no-misused-promises */
import AccountSettingsTextField from '@/common/AccountSettingsForm/AccountSettingsTextField'
import { Box, Modal, useTheme, Button, Typography } from '@mui/material'
import { type Control, type SubmitHandler, type UseFormHandleSubmit, type UseFormWatch } from 'react-hook-form'
import { type IUser } from '@/model/UserModel'
import { type IAccountSettings } from '@/model/auth/IAccountSettings'
import { updateUser } from '@/actions/auth'
import { useAppDispatch } from '@/hook'
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import PasswordVerification from '../PasswordVerification/PasswordVerification'

interface Props {
  control: Control<IAccountSettings>
  editedData: any
  handleSubmit: UseFormHandleSubmit<IAccountSettings>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: IUser
  watch: UseFormWatch<IAccountSettings>
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const SpecifiedFormData = ({ control, editedData, handleSubmit, open, setOpen, user, watch }: Props) => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const { id } = useParams()

  const formRef = useRef<HTMLFormElement>(null)

  const modalClose = (): void => { setOpen(false) }
  const watchFields = watch(['password', 'confirmNewPassword'])

  const onSubmit: SubmitHandler<IAccountSettings> = (data: IAccountSettings) => {
    let dataField: keyof IAccountSettings | null = null
    let dataFieldValue: IAccountSettings[keyof IAccountSettings] | null = null

    // Get both field and value in data.
    Object.entries(data).forEach(([fieldName, fieldValue]) => {
      if (fieldName !== 'confirmNewPassword') {
        dataField = fieldName as keyof IAccountSettings
        dataFieldValue = fieldValue
      }
    })
    if (id !== undefined) {
      dispatch(updateUser(id, user.email, dataField, dataFieldValue))
    }
  }

  return (
    <Modal
      open={open}
      onClose={modalClose}
    >
      <Box sx={style}>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          {editedData.name === 'password'
            ? <>
              <AccountSettingsTextField
                control={control}
                label={'New Password'}
                name={editedData.name}
                autoFocus
                key={editedData.name}
                showPassword
              />
              {watchFields[0] !== watchFields[1] &&
                <Typography variant='caption' color='error'>
                  New Password & Confirm New Password is not equal.
                </Typography>}
              {watchFields[0].length < 6 &&
                <Typography variant='caption' color='error'>
                  Password must be greater than or equal  to 6 characters
                </Typography>
              }<AccountSettingsTextField
                control={control}
                label="Confirm New Password"
                name='confirmNewPassword'
                key='confirmNewPassword'
                showPassword
              />
            </>
            : < AccountSettingsTextField
              control={control}
              label={editedData.label}
              name={editedData.name}
              autoFocus
              key={editedData.name}
            />
          }
        </form>
        <PasswordVerification
          disabled={!!((editedData.name === 'password' && watchFields[0] !== watchFields[1]))}
          formRef={formRef}
          handleSubmit={handleSubmit}
          style={style}
          theme={theme}
          user={user}
        />
        <Button fullWidth color="error" onClick={modalClose}>Cancel</Button>

      </Box>
    </Modal>
  )
}

export default SpecifiedFormData
