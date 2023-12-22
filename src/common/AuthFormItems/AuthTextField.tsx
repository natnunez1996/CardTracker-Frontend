import { ISignInFormData } from "@/model/auth"
import { IconButton, TextField } from "@mui/material"
import { Control, Controller } from "react-hook-form"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"

type Props = {
    autoFocus?: boolean,
    control: Control<ISignInFormData>,
    error?: string,
    label: string,
    name: keyof ISignInFormData,
    showPassword?: boolean,
    type?: 'string' | 'password'
}

const AuthTextField = ({ autoFocus = false, control, error, label, name, showPassword = false, type = 'string' }: Props) => {
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
                        error={error ? true : false}
                        helperText={error}
                        InputProps={showPassword ? {
                            endAdornment:
                                <IconButton onClick={handleVisibility}>
                                    {currentType === 'password' ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                        } : {
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