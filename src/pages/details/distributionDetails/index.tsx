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
        <div className="distributionDetails">{
            monthRecordsList.length > 0 &&
            <>
                <Pie data={data} options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Distribution"
                        },

                    }
                }} ></Pie>
            </>}
        </div>
    )
}

export default DistributionDetails