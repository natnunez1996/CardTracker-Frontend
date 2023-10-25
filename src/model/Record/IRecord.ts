import IRecordItem from "@/model/Record/IRecordItem";
import { Key } from "react";

export default interface IRecord {
    name: String,
    recordItemsList: IRecordItem[] | [],
    amount: number,
    createdBy: String,
    createdDate: Date,
    updatedDate: Date,
    _id: Key
}