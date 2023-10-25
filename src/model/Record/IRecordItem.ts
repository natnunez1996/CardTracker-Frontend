import CardCategory from "@/model/Record/EcardCategory";

export default interface IRecordItem {
    name: String,
    amount: number,
    date: Date,
    category: CardCategory,
    id: String
}