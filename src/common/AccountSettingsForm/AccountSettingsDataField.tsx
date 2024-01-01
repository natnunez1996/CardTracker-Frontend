import { IAccountSettings } from '@/model/auth/IAccountSettings'
import { Button, TextField } from '@mui/material'

type Props = {
    handleClick: (label: string, name: keyof IAccountSettings, type: 'string' | 'password', value: String) => void,
    label: string,
    name: keyof IAccountSettings,
    type?: 'string' | 'password',
    value: String

}

const AccountSettingsDataField = ({ handleClick, label, name, type = 'string', value }: Props) => {
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
                endAdornment: <Button onClick={() => handleClick(label, name, type, value)}>Change</Button>
            }}
        />
    )
}

export default AccountSettingsDataField