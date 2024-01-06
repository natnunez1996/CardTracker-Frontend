import { IRecordItem } from "@/model/CardModel";

export const filterRecordsListByDate = (recordsList: IRecordItem[], date: Date): IRecordItem[] | [] => {
    if (recordsList.length === 0)
        return []

    return recordsList.
        filter(item =>
            item.date.getFullYear() === date.getFullYear() &&
            item.date.getMonth() === date.getMonth())
        .sort((a: IRecordItem, b: IRecordItem) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)
            //If same date, the latest input will be the first recordItem to show.
            if (dateB.getTime() === dateA.getTime())
                return +b.id - +a.id
            return dateB.getTime() - dateA.getTime()
        })
}