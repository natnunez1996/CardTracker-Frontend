import { CardCategory, CardCategoryColor, IRecord, IRecordItem } from '@/model/CardModel';
import { Container } from '@mui/material';
import { Bar } from 'react-chartjs-2';

type Props = {
    record: IRecord,
    inputDate: Date,
    choices: CardCategory[]
}

const MonthsDistributionDetails = ({ record, inputDate, choices }: Props) => {

    const lastMonth = inputDate.getMonth() !== 0 ? new Date(inputDate.getFullYear(), inputDate.getMonth() - 1) : new Date(inputDate.getFullYear() - 1, 11);
    const lastTwoMonths = lastMonth.getMonth() !== 0 ? new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1) : new Date(lastMonth.getFullYear() - 1, 11);

    const dataInput = [inputDate, lastMonth, lastTwoMonths];

    const getSum = (date: Date, category: CardCategory): number => {
        let sum = 0;

        const filteredDetails: IRecordItem[] = record.recordItemsList
            .filter(recordItem => {
                if (recordItem.date.getMonth() === date.getMonth() &&
                    recordItem.date.getFullYear() === date.getFullYear() &&
                    recordItem.category === category) {
                    return recordItem;
                }
            });

        filteredDetails.forEach(item => sum += item.amount)

        return sum;
    }

    const options = {
        indexAxis: "y" as const,
        plugins: {
            title: {
                display: true,
                text: "Month's Comparison",
            },
            legend: {
                position: 'right' as const
            }
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    }

    const data = {
        labels: [
            inputDate.toLocaleDateString('default', { month: 'long' }),
            lastMonth.toLocaleDateString('default', { month: 'long' }),
            lastTwoMonths.toLocaleDateString('default', { month: 'long' })
        ],
        datasets: choices.filter(choice => choice !== CardCategory.INCOME)
            .map(choice => {
                return {
                    label: choice,
                    data: dataInput.map((val) => {

                        return getSum(val, choice)
                    }),
                    backgroundColor: CardCategoryColor[choice]
                }
            })
    }

    return (
        <Container fixed>
            <Bar options={options} data={data} />
        </Container>
    )
}

export default MonthsDistributionDetails