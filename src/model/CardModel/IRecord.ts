import { Key } from "react";
import { IRecordItem } from ".";

export interface IRecord {
    _id?: Key,
    createdBy: String,
    createdDate: Date,
    initialAmount?: number
    name: String,
    recordItemsList: IRecordItem[],
    recordType: String,
    updatedDate: Date,
}