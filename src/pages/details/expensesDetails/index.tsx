import CardCategory from "@/model/Record/EcardCategory"
import IRecord from "@/model/Record/IRecord"
import IRecordItem from "@/model/Record/IRecordItem"
import { useEffect } from "react"
import { Bar } from "react-chartjs-2"


type Props = {
    record: IRecord,
    inputDate: Date,
    setAmountEarnLoss: React.Dispatch<React.SetStateAction<number>>
}

const ExpensesDetails = ({ record, inputDate, setAmountEarnLoss }: Props) => {

    const filteredDetails: IRecordItem[] = record.recordItemsList
        .filter(recordItem => {
            if (recordItem.date.getMonth() === inputDate.getMonth() &&
                recordItem.date.getFullYear() === inputDate.getFullYear()) {
                return recordItem;
            }
        })
        .sort((a: IRecordItem, b: IRecordItem) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            return dateA.getTime() - dateB.getTime()
        })

    const inputMonth: Date[] = [];
    const date = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1)
    while (date.getMonth() === inputDate.getMonth()) {
        (filteredDetails.find(item => {
            if (item.date.getDate() === date.getDate() &&
                item.category !== CardCategory.INCOME
                && inputMonth[inputMonth.length - 1]?.getDay() !== date.getDay()) {
                inputMonth.push(new Date(date));
            }
        }))
        date.setDate(date.getDate() + 1)
    }

    const cardData = {
        labels: inputMonth.map(day => `${day.toLocaleString('default', { month: 'short' })} ${day.getDate()}`),
        datasets: [{
            label: CardCategory.ENTERTAINMENT,
            data: inputMonth.map((day) => {
                let incomeData = filteredDetails.filter(i => i.category === CardCategory.ENTERTAINMENT)
                let output: number = 0;
                incomeData.filter(item => {
                    if (item.date.getDate() === day.getDate())
                        output += item.amount
                })
                return output
            }),
            backgroundColor: "rgba(236, 167, 16, 0.5)"
        }, {
            label: CardCategory.EXPENSES,
            data: inputMonth.map((day) => {
                let incomeData = filteredDetails.filter(i => i.category === CardCategory.EXPENSES)
                let output: number = 0;
                incomeData.filter(item => {
                    if (item.date.getDate() === day.getDate())
                        output += item.amount
                })
                return output
            }),
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        }]
    }



    useEffect(() => {
        setAmountEarnLoss(0);
        filteredDetails.forEach(recordItem => {
            if (recordItem.category === CardCategory.INCOME)
                setAmountEarnLoss(prevAmount => prevAmount += recordItem.amount);
            else if (recordItem.category === CardCategory.ENTERTAINMENT ||
                recordItem.category === CardCategory.EXPENSES)
                setAmountEarnLoss(prevAmount => prevAmount -= recordItem.amount);

        })
    }, [inputDate])

    return (
        <div>
            <Bar options={{ maintainAspectRatio: false }} data={cardData} width={200} height={400} />
        </div>
    )
}

export default ExpensesDetails