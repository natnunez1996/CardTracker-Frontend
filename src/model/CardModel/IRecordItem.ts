import { CardCategory } from ".";

export interface IRecordItem {
    name: string,
    amount: number,
    date: Date,
    category: CardCategory,
    id: string
}