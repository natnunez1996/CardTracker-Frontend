import { type IAccountSettings } from '@/model/auth/IAccountSettings'
import { Button, TextField } from '@mui/material'

type Props = {
  handleClick: (label: string, name: keyof IAccountSettings, type: 'string' | 'password', value: string) => void
  label: string
  name: keyof IAccountSettings
  showButton?: boolean
  type?: 'string' | 'password'
  value: string

}

const AccountSettingsDataField = ({ handleClick, label, name, showButton = false, type = 'string', value }: Props) => {
  return (
    <TextField
      disabled
      fullWidth
      label={label}
      margin='normal'
      name={name}
      type={type}
      value={value}

      InputProps={{
        endAdornment:
          showButton
            ? <Button onClick={() => { handleClick(label, name, type, value) }}>Change</Button>
            : <></>
      }}
    />
  )
}

export default AccountSettingsDataField
