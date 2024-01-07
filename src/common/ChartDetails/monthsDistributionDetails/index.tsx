import { CardCategory, CardCategoryColor } from '@/enums/ECard';
import { IRecord, IRecordItem } from '@/model/CardModel';
import { Container, Theme } from '@mui/material';
import { Bar } from 'react-chartjs-2';

type Props = {
    choices: CardCategory[],
    inputDate: Date,
    record: IRecord
    theme: Theme
}

export const MonthsDistributionDetails = ({ choices, inputDate, record, theme }: Props) => {

    const lastMonth = inputDate.getMonth() !== 0 ? new Date(inputDate.getFullYear(), inputDate.getMonth() - 1) : new Date(inputDate.getFullYear() - 1, 11);
    const lastTwoMonths = lastMonth.getMonth() !== 0 ? new Date(lastMonth.getFullYear(), lastMonth.getMonth() - 1) : new Date(lastMonth.getFullYear() - 1, 11);

    const colorPalette = theme.palette.text.primary;
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
            layout: {
                autoPadding: true
            },
            title: {
                display: true,
                text: "Past 3 months Comparison",
                color: colorPalette
            },
            legend: {
                display: false
            }
        },
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: colorPalette
                },
                stacked: true,
                ticks: {
                    color: colorPalette
                }
            },
            y: {
                grid: {
                    color: colorPalette
                },
                stacked: true,
                ticks: {
                    color: theme.palette.text.primary
                }
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
