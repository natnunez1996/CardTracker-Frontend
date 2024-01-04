import { CardCategory, IRecord } from "@/model/CardModel";

export const calculateBalance = (record: IRecord): number => {
    let sum = 0;

    record.recordItemsList.forEach(item => {
        if (item.category === CardCategory.INCOME)
            return sum += item.amount
        else
            return sum -= item.amount
    })

    return sum
}