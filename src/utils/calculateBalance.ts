import { CardCategory } from "@/enums/ECard";
import { IRecordItem } from "@/model/CardModel";

export const calculateBalance = (recordList: IRecordItem[]): number => {
    let sum = 0;

    recordList.forEach(item => {
        if (item.category === CardCategory.INCOME)
            return sum += item.amount
        else
            return sum -= item.amount
    })

    return sum
}