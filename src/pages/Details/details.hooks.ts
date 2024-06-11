import { updateRecord } from '@/actions/record'
import { CardCategory } from '@/enums/ECard'
import { useAppDispatch } from '@/hook'
import { type IRecord, type IRecordItem } from '@/model/CardModel'
import { type IProfile } from '@/model/UserModel'
import { calculateBalance, filterRecordsListByDate } from '@/utils'
import React, { type SetStateAction, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useDetailsPage = (
  cardDetails: IRecord | undefined,
  inputDate: Date,
  updateDetails: IRecord | undefined,
  user: IProfile | undefined,
  setAmountEarnLoss: React.Dispatch<SetStateAction<number>>,
  setInputDateRecordList: React.Dispatch<SetStateAction<IRecordItem[] | never>>,
  setTotalBalance: React.Dispatch<SetStateAction<number>>,
  setUpdateDetails: React.Dispatch<SetStateAction<IRecord | undefined>>,
  toDelete: boolean
): void => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === undefined) {
      navigate('/home', { replace: true })
    }

    if (cardDetails !== undefined) {
      if (cardDetails.recordItemsList.length > 0) {
        localStorage.setItem('lastKnownId',
          cardDetails.recordItemsList[cardDetails.recordItemsList.length - 1].id.toString())
        setTotalBalance(calculateBalance(cardDetails.recordItemsList))
      }

      if (cardDetails.recordItemsList.length === 0) {
        localStorage.setItem('lastKnownId', '0')
      }

      setUpdateDetails(cardDetails)
    }
  }, [cardDetails, navigate, setUpdateDetails, setTotalBalance, user])

  useEffect(() => {
    if (toDelete) {
      if (updateDetails !== undefined) {
        dispatch(updateRecord(updateDetails, navigate))
        navigate(0)
      }
    }
  }, [dispatch, navigate, toDelete, updateDetails])

  useEffect(() => {
    localStorage.setItem('lastKnownInputDate', inputDate.toDateString())

    if (updateDetails !== undefined) {
      const filteredDetails = filterRecordsListByDate(updateDetails.recordItemsList, inputDate)
      setInputDateRecordList(filteredDetails)

      setAmountEarnLoss(0)
      filteredDetails.forEach(recordItem => {
        if (recordItem.category === CardCategory.INCOME) {
          setAmountEarnLoss(prevAmount => {
            const newAmount: number = prevAmount + recordItem.amount
            return newAmount;
          })
        } else {
          setAmountEarnLoss(prevAmount => {
            const newAmount = prevAmount - recordItem.amount
            return newAmount
          })
        }
      })
    }
  }, [inputDate, setAmountEarnLoss, setInputDateRecordList, updateDetails])
}
