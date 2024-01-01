import { IconButton, TextField } from "@mui/material"
import { Control, Controller } from "react-hook-form"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"
import { IAccountSettings } from "@/model/auth/IAccountSettings"

type Props = {
  autoFocus?: boolean,
  control: Control<IAccountSettings>,
  disabled?: boolean,
  error?: string,
  label: string,
  name: keyof IAccountSettings,
  showPassword?: boolean,
  type?: 'string' | 'password'
}

const AccountSettingsTextField = ({ autoFocus = false, control, disabled = false, error, label, name, showPassword = false, type = 'string' }: Props) => {
  const [currentType, setCurrentType] = useState(type);

  const handleVisibility = () => {
    currentType === 'password' ? setCurrentType('string') : setCurrentType('password')
  }

  return (
    <Controller
      defaultValue={''}
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
            error={error ? true : false}
            helperText={error}
            InputProps={{
              endAdornment: showPassword ?
                <IconButton onClick={handleVisibility}>
                  {currentType === 'password' ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                : <></>
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

export default AccountSettingsTextField