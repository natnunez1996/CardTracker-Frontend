import IRecordItem from "@/model/Record/IRecordItem";
import { Key } from "react";

export default interface IRecord {
    _id?: Key,
    createdBy: String,
    createdDate: Date,
    initialAmount?: number
    name: String,
    recordItemsList: IRecordItem[],
    recordType: String,
    updatedDate: Date,
}