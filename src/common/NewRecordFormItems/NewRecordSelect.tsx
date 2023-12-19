import CardType from "@/model/Record/ECardType"
import IRecord from "@/model/Record/IRecord";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Control, Controller } from "react-hook-form"

type Props = {
    choices: Array<keyof typeof CardType>,
    control: Control<IRecord>,
    name: keyof IRecord,
    label: string,
};

const NewRecordSelect = ({ choices, control, name, label }: Props) => {
    return (
        <FormControl variant="standard" fullWidth margin="normal">
            <InputLabel id="formInputSelectLabel">{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <Select sx={{ textAlign: 'center' }} labelId="formInputSelectLabel" autoWidth {...field}>
                        {choices.map((choice) => (
                            <MenuItem key={choice} value={CardType[choice]}>
                                {choice.replace(/_/, ' ')}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                defaultValue={CardType[choices[0]]}
            />
        </FormControl>
    );
};

export default NewRecordSelect;