/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hook'
import { useEffect, useState } from 'react'
import { updateRecord } from '@/actions/record'
import RecordItemForm from '@/common/RecordItemForm'
import { type IRecord, type IRecordItem } from '@/model/CardModel'
import { CardCategory } from '@/enums/ECard'
import React from 'react';

interface Props {
  id: string
  recordId: string
  recordItem: IRecord | undefined
  setToEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const EditRecordItemForm = ({ id, recordItem, setToEdit }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { control, handleSubmit, setValue } = useForm<IRecordItem>()

  const [editedCardDetails, setEditedCardDetails] = useState<IRecord>()
  const [toSubmit, setToSubmit] = useState<boolean>(false)

  const choices = (Object.keys(CardCategory) as Array<keyof typeof CardCategory>)

  useEffect(() => {
    if (recordItem !== undefined) {
      recordItem.recordItemsList.forEach(item => {
        if (item.id === id) {
          setValue('name', item.name)
          setValue('amount', item.amount)
          setValue('date', item.date)
          setValue('category', item.category)
        }
      })
    }
    setEditedCardDetails(recordItem)
  }, [])

  useEffect(() => {
    if (toSubmit && editedCardDetails !== undefined) {
      dispatch(updateRecord(editedCardDetails, navigate))
      navigate(0)
    }
  }, [toSubmit])

  const onSubmit: any = (data: IRecordItem) => {
    const editedRecordItem: IRecordItem = {
      name: data.name,
      amount: data.amount,
      date: new Date(data.date),
      category: data.category,
      id
    }

    if (recordItem !== undefined) {
      const newRecordItemsList: IRecordItem[] =
        recordItem.recordItemsList.map(item => {
          if (item.id === editedRecordItem.id) { return editedRecordItem }
          return item
        })

      setEditedCardDetails({
        ...recordItem,
        updatedDate: new Date(),
        recordItemsList: newRecordItemsList
      })

      localStorage.setItem('lastKnownInputDate', editedRecordItem.date.toDateString())

      setToSubmit(true)
    }
  }

  const onCancelEdit = (): void => {
    setToEdit(false)
  }

  return (
    <RecordItemForm
      cardType={editedCardDetails?.recordType}
      choices={choices}
      control={control}
      handleSubmit={handleSubmit}
      navigate={navigate}
      onCancelEdit={onCancelEdit}
      onSubmit={onSubmit}
    />
  )
}

export default EditRecordItemForm
