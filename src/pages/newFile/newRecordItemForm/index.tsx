/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hook'
import { getRecordHook } from '@/customHooks/getRecordHook'
import { useState, useEffect } from 'react'
import { updateRecord } from '@/actions/record'
import { getUserIdHook } from '@/customHooks/getUserIdHook'
import { type IProfile } from '@/model/UserModel'
import RecordItemForm from '@/common/RecordItemForm'
import { type IRecord, type IRecordItem } from '@/model/CardModel'
import { CardCategory } from '@/enums/ECard'


const NewRecordItemForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { recordId } = useParams()
  const userId: IProfile | undefined = getUserIdHook()
  const lastKnownId = localStorage.getItem('lastKnownId')
  const cardDetails: IRecord | undefined = getRecordHook(userId?.result._id, recordId)
  const [newCardDetails, setNewCardDetails] = useState<IRecord>()
  const [toSubmit, setToSubmit] = useState<boolean>(false)

  const { control, handleSubmit } = useForm<IRecordItem>()
  console.log("newRecordItemForm");

  useEffect(() => {
    if (cardDetails !== undefined) {
      setNewCardDetails(cardDetails)
    }
  }, [cardDetails])

  useEffect(() => {
    if (toSubmit && newCardDetails !== undefined) {
      dispatch(updateRecord(newCardDetails, navigate))
    }
  }, [toSubmit])

  const onSubmit: any = (data: IRecordItem) => {
    if (lastKnownId !== null && newCardDetails !== undefined) {
      const recordItem: IRecordItem = {
        name: data.name,
        amount: data.amount,
        category: data.category,
        date: new Date(data.date),
        id: (+lastKnownId + 1).toString()
      }

      setNewCardDetails(prevState => {
        if (prevState !== undefined) {
          prevState.updatedDate = new Date()
          prevState.recordItemsList.push(recordItem)
          return prevState
        }
      })

      localStorage.setItem('lastKnownInputDate', new Date(recordItem.date).toDateString())
      setToSubmit(true)
    }
  }

  const choices = (Object.keys(CardCategory) as Array<keyof typeof CardCategory>)

  return (
    <>
      {lastKnownId !== null &&
        <RecordItemForm
          cardType={newCardDetails?.recordType}
          choices={choices}
          control={control}
          handleSubmit={handleSubmit}
          navigate={navigate}
          onSubmit={onSubmit}
        />
      }
    </>
  )
}

export default NewRecordItemForm
