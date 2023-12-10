import CardCategory from "@/model/Record/EcardCategory"
import CardCategoryColor from "@/model/Record/EcardCategoryColor"
import IRecord from "@/model/Record/IRecord"
import IRecordItem from "@/model/Record/IRecordItem"
import { useEffect } from "react"
import { Bar } from "react-chartjs-2"


type Props = {
    record: IRecord,
    inputDate: Date,
    setAmountEarnLoss: React.Dispatch<React.SetStateAction<number>>,
    choices: CardCategory[]
}

const ExpensesDetails = ({ choices, record, inputDate, setAmountEarnLoss }: Props) => {
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
            ) {
                if (inputMonth.length > 0) {
                    if (inputMonth[inputMonth.length - 1].getDate() !== date.getDate())
                        inputMonth.push(new Date(date));
                }
                else if (inputMonth.length === 0)
                    inputMonth.push(new Date(date));

            }
        }))
        date.setDate(date.getDate() + 1)
    }

    const cardData = {
        labels: inputMonth.map(day => `${day.toLocaleString('default', { month: 'short' })} ${day.getDate()}`),
        datasets: choices.filter(choice => choice !== CardCategory.INCOME)
            .map(choice => {
                return {
                    label: choice,
                    data: inputMonth.map((day) => {
                        let incomeData = filteredDetails.filter(i => i.category === choice)
                        let output: number = 0;
                        incomeData.filter(item => {
                            if (item.date.getDate() === day.getDate())
                                output += item.amount
                        })
                        return output
                    }),
                    backgroundColor: CardCategoryColor[choice]
                }
            })
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Expenses this ${inputDate.toLocaleString('default', { month: 'long' })}`
            }
        }
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
        <div className="expensesDetails">
            <Bar options={options}
                data={cardData} />
        </div>
    )
}

export default ExpensesDetails