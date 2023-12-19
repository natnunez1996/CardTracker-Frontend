import { IRecordItem } from "@/model/CardModel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form"

type Props = {
    control: Control<IRecordItem>;
    label: string;
    name: keyof IRecordItem;
};

const NewRecordItemDateField = ({ control, label, name }: Props) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={label} value={value ? dayjs(value.toString()) : dayjs(new Date())} onChange={date => onChange(date)} />
                </LocalizationProvider>
            )}
        />
    );
};

export default NewRecordItemDateField;