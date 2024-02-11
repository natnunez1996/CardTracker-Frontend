import { type Key } from 'react'
import { type IRecordItem } from '.'

export interface IRecord {
  _id?: Key
  createdBy: string
  createdDate: Date
  initialAmount?: number
  name: string
  recordItemsList: IRecordItem[]
  recordType: string
  updatedDate: Date
}
