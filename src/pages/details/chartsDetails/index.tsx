import { DistributionDetails, ExpensesDetails, MonthsDistributionDetails } from "@/common/ChartDetails";
import { CardCategory } from "@/enums/ECard";
import { IRecord, IRecordItem } from "@/model/CardModel";
import { Box, Theme } from "@mui/material";

type Props = {
    inputDate: Date,
    inputDateRecordList: IRecordItem[] | never,
    record: IRecord,
    theme: Theme,
}

const ChartsDetails = ({ inputDate, inputDateRecordList, record, theme }: Props) => {
    const choices: CardCategory[] = (Object.keys(CardCategory) as Array<keyof typeof CardCategory>).map(key => CardCategory[key]);

    return (
        <Box
            display={'flex'}
            maxWidth={'100vw'}
            height={400}
            alignItems={'center'}
        >
            <DistributionDetails
                choices={choices}
                inputDate={inputDate}
                inputDateRecordList={inputDateRecordList}
                theme={theme}
            />

            <ExpensesDetails
                choices={choices}
                inputDate={inputDate}
                inputDateRecordList={inputDateRecordList}
                theme={theme}
            />

            <MonthsDistributionDetails
                choices={choices}
                inputDate={inputDate}
                record={record}
                theme={theme}
            />
        </Box>
    )
}

export default ChartsDetails