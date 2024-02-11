/* eslint-disable react-hooks/rules-of-hooks */
import { getRecord } from '@/actions/record'
import { useAppDispatch, useAppSelector } from '@/hook'
import { type IRecord, type IRecordItem } from '@/model/CardModel'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

export function getRecordHook(userId: string | undefined, recordId: string | undefined): IRecord | undefined {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const result = useAppSelector(state => state.userRecords.recordDetails)
  const error = useAppSelector(state => state.userRecords.message)

  const [recordDetail, setRecordDetail] = useState<IRecord>()

  useEffect(() => {
    if (recordId !== undefined && userId !== undefined) {
      dispatch(getRecord(userId, recordId))
    }
  }, [dispatch, recordId, userId])

  useEffect(() => {
    if (result !== null) {
      let convertedResult: IRecordItem[]

      if (result.recordItemsList !== null && result.recordItemsList.length > 0) {
        convertedResult = result.recordItemsList.map((item: IRecordItem) => ({
          ...item,
          date: new Date(item.date)
        }))

        const newRecord: IRecord = { ...result, recordItemsList: convertedResult }

        setRecordDetail(newRecord)
      }
    }
  }, [result])

  useEffect(() => {
    if (error !== '') { navigate('/error', { replace: true }) }
  }, [error, navigate])

  return recordDetail
}
