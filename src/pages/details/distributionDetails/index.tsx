import CardCategory from "@/model/Record/EcardCategory"
import CardCategoryColor from "@/model/Record/EcardCategoryColor"
import IRecord from "@/model/Record/IRecord"
import IRecordItem from "@/model/Record/IRecordItem"
import { Pie } from "react-chartjs-2"


type Props = {
    record: IRecord,
    inputDate: Date,
    choices: CardCategory[]
}

const DistributionDetails = ({ record, inputDate, choices }: Props) => {

    const monthRecordsList = record.recordItemsList.filter(item => item.date.getFullYear() === inputDate.getFullYear() &&
        item.date.getMonth() === inputDate.getMonth());

    // const incomeItems = monthRecordsList.filter(item => item.category === CardCategory.INCOME)
    // const entertainmentItems = monthRecordsList.filter(item => item.category === CardCategory.ENTERTAINMENT)
    // const expensesItems = monthRecordsList.filter(item => item.category === CardCategory.EXPENSES)

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
                label: "% value",
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