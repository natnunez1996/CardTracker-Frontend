import { CardCategory } from ".";

export interface IRecordItem {
    name: String,
    amount: number,
    date: Date,
    category: CardCategory,
    id: String
}