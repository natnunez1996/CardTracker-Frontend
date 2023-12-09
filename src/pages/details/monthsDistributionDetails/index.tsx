import CardCategory from '@/model/Record/EcardCategory';
import IRecord from '@/model/Record/IRecord'
import IRecordItem from '@/model/Record/IRecordItem';
import { Bar } from 'react-chartjs-2';

type Props = {
    record: IRecord,
    inputDate: Date
}

const MonthsDistributionDetails = ({ record, inputDate }: Props) => {

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

        console.log(sum, category);



        return sum;
    }

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Month's Comparison",
            },
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
        datasets: [
            {
                label: CardCategory.ENTERTAINMENT,
                data: dataInput.map((val) => {

                    return getSum(val, CardCategory.ENTERTAINMENT)
                })
            },
            {
                label: CardCategory.EXPENSES,
                data: dataInput.map((val) => {
                    return getSum(val, CardCategory.EXPENSES)
                })
            }
        ]
    }



    return (
        <div> <Bar options={options} data={data} /></div>
    )
}

export default MonthsDistributionDetails