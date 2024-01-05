import { IRecord } from '@/model/CardModel'
import { TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

type Props = {
    control: Control<IRecord>,
    label: string
    name: keyof IRecord,
    type?: string
}

const NewRecordTextField = ({ control, label, name, type = 'string' }: Props) => {

    return (
        <Controller
            defaultValue={''}
            name={name}
            control={control}
            rules={{ required: true }}
            render={({
                field,
                fieldState
            }) =>
                <TextField
                    {...field}
                    autoComplete={type === 'password' ? 'current-password' : 'off'}
                    error={!!fieldState.error!}
                    helperText={fieldState.error ? fieldState.error.message : null}
                    fullWidth
                    label={label}
                    margin='normal'
                    size='small'
                    type={type}
                    variant='standard'
                />
            }
        />
    )
}

export default NewRecordTextField