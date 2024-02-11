import { type ISignInFormData } from '@/model/auth'
import { IconButton, TextField } from '@mui/material'
import { type Control, Controller } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

interface Props {
  autoFocus?: boolean
  control: Control<ISignInFormData>
  disabled?: boolean
  error?: string
  label: string
  name: keyof ISignInFormData
  showPassword?: boolean
  type?: 'string' | 'password'
  value?: string
}

const AuthTextField = ({ autoFocus = false, control, disabled = false, error, label, name, showPassword = false, type = 'string', value = '' }: Props) => {
  const [currentType, setCurrentType] = useState(type)

  const handleVisibility = (): void => {
    currentType === 'password' ? setCurrentType('string') : setCurrentType('password')
  }

  return (
    <Controller
      defaultValue={value}
      name={name}
      control={control}
      rules={{ required: true }}
      render={({
        field
      }) =>
        <>
          <TextField
            {...field}
            autoFocus={autoFocus}
            disabled={disabled}
            error={error !== undefined}
            helperText={error}
            InputProps={showPassword
              ? {
                endAdornment:
                  <IconButton onClick={handleVisibility}>
                    {currentType === 'password' ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              }
              : {
                endAdornment: <> </>
              }}
            fullWidth
            label={label}
            margin='normal'
            size='small'
            type={currentType}
            variant='standard'
          />
        </>

      }
    />
  )
}

export default AuthTextField
