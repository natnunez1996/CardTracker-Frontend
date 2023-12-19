import { CardCategory, CardType, IRecordItem } from "@/model/CardModel";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Control, Controller } from "react-hook-form"

type Props = {
    cardType?: String
    choices: Array<keyof typeof CardCategory>;
    control: Control<IRecordItem>;
    name: keyof IRecordItem;
    label: string;
};

const NewRecordItemSelect = ({ cardType, choices, control, name, label }: Props) => {
    choices = cardType === CardType.CREDIT_CARD ? choices : choices.filter(c => CardCategory[c] !== CardCategory.INCOME)

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
                            <MenuItem key={choice} value={CardCategory[choice]}>
                                {choice.replace(/_/, ' ')}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                defaultValue={CardCategory[choices[0]]}
            />
        </FormControl>
    );
};

export default NewRecordItemSelect;