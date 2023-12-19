
import IRecordItem from '@/model/Record/IRecordItem'
import { TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

type Props = {
    control: Control<IRecordItem>,
    label: string
    name: keyof IRecordItem,
    type?: string
}

const NewRecordItemTextField = ({ control, label, name, type = 'string' }: Props) => {

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

export default NewRecordItemTextField