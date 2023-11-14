import CardCategory from "@/model/Record/EcardCategory"
import IRecord from "@/model/Record/IRecord"
import IRecordItem from "@/model/Record/IRecordItem"
import { Pie } from "react-chartjs-2"


type Props = {
    record: IRecord,
    inputDate: Date
}

const DistributionDetails = ({ record, inputDate }: Props) => {

    const monthRecordsList = record.recordItemsList.filter(item => item.date.getFullYear() === inputDate.getFullYear() &&
        item.date.getMonth() === inputDate.getMonth());

    const incomeItems = monthRecordsList.filter(item => item.category === CardCategory.INCOME)
    const entertainmentItems = monthRecordsList.filter(item => item.category === CardCategory.ENTERTAINMENT)
    const expensesItems = monthRecordsList.filter(item => item.category === CardCategory.EXPENSES)

    const gettingTotalSum = (array: IRecordItem[]) => {

        return array.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.amount
        }, 0)
    }

    const data = {
        labels: [CardCategory.INCOME, CardCategory.ENTERTAINMENT, CardCategory.EXPENSES],
        datasets: [
            {
                label: "% value",
                data: [
                    incomeItems.length > 0 ? gettingTotalSum(incomeItems) : 0,
                    entertainmentItems.length > 0 ? gettingTotalSum(entertainmentItems) : 0,
                    expensesItems.length > 0 ? gettingTotalSum(expensesItems) : 0
                ],
                backgroundColor: ["rgba(53, 162, 235, 0.5)",
                    "rgba(236, 167, 16, 0.5)",
                    "rgba(255, 99, 132, 0.5)"],
                borderColor: ["rgba(53, 162, 235, 0.5)",
                    "rgba(236, 167, 16, 0.5)",
                    "rgba(255, 99, 132, 0.5)"],
                borderWidth: 1
            }
        ]
    }

    return (
        <div>{
            monthRecordsList.length > 0 &&
            <>
                <h1>Distribution: </h1>
                <Pie data={data} ></Pie>
            </>}
        </div>
    )
}

export default DistributionDetails