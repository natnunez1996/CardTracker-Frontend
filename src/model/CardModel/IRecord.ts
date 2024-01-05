import { Key } from "react";
import { IRecordItem } from ".";

export interface IRecord {
    _id?: Key,
    createdBy: string,
    createdDate: Date,
    initialAmount?: number
    name: string,
    recordItemsList: IRecordItem[],
    recordType: string,
    updatedDate: Date,
}