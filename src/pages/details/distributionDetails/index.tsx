import { CardCategory, CardCategoryColor, IRecord, IRecordItem } from "@/model/CardModel";
import { Container, Theme } from "@mui/material";
import { Pie } from "react-chartjs-2"


type Props = {
    choices: CardCategory[],
    inputDate: Date,
    record: IRecord,
    theme: Theme
}

const DistributionDetails = ({ choices, inputDate, record, theme }: Props) => {

    const colorPalette = theme.palette.text.primary;

    const monthRecordsList = record.recordItemsList.filter(item => item.date.getFullYear() === inputDate.getFullYear() &&
        item.date.getMonth() === inputDate.getMonth());


    const filterItemsByCategory = (list: IRecordItem[], category: CardCategory) => {
        return list.filter(item => item.category === category)
    }

    const gettingTotalSum = (array: IRecordItem[]) => {

        return array.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.amount
        }, 0)
    }

    const data = {
        labels: choices,
        datasets: [
            {
                label: "$",
                data: choices.map(choice => {
                    const list = filterItemsByCategory(monthRecordsList, choice);
                    if (list.length > 0)
                        return gettingTotalSum(list);
                    return 0;
                }),
                backgroundColor: choices.map(choice => CardCategoryColor[choice]),
                borderColor: choices.map(choice => CardCategoryColor[choice]),
                borderWidth: 1
            }
        ]
    }
    return (
        <Container>{
            monthRecordsList.length > 0 &&
            <>
                <Pie data={data} options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Distribution",
                            color: colorPalette
                        },
                        legend: {
                            labels: {
                                color: colorPalette
                            }
                        }
                    }
                }} ></Pie>
            </>}
        </Container>
    )
}

export default DistributionDetails