import { useForm } from 'react-hook-form'
import './editRecordItemForm.css'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hook'
import { useState } from 'react';
import { useEffect } from 'react';
import { updateRecord } from '@/actions/record'
import RecordItemForm from '@/common/RecordItemForm'
import { CardCategory, IRecord, IRecordItem } from '@/model/CardModel';


type Props = {
    id: String,
    recordId: string,
    recordItem: IRecord | undefined,
    setToEdit: React.Dispatch<React.SetStateAction<Boolean>>
}

const EditRecordItemForm = ({ id, recordId, recordItem, setToEdit }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { control, handleSubmit, setValue } = useForm<IRecordItem>();

    const [editedCardDetails, setEditedCardDetails] = useState<IRecord>();
    const [toSubmit, setToSubmit] = useState<Boolean>(false);

    const choices = (Object.keys(CardCategory) as Array<keyof typeof CardCategory>)

    useEffect(() => {
        if (recordItem) {
            recordItem.recordItemsList.map(item => {
                if (item.id === id) {
                    setValue("name", item.name)
                    setValue("amount", item.amount)
                    setValue("date", item.date)
                    setValue("category", item.category)
                }
            })
        }
        setEditedCardDetails(recordItem);
    }, [])

    useEffect(() => {
        if (toSubmit == true && editedCardDetails !== undefined) {
            dispatch(updateRecord(editedCardDetails, navigate))
            navigate(0);
        }

    }, [toSubmit])

    const onSubmit: any = (data: IRecordItem) => {

        const editedRecordItem: IRecordItem = {
            name: data.name,
            amount: data.amount,
            date: data.date,
            category: data.category,
            id: id
        }


        if (recordItem) {
            const newRecordItemsList: IRecordItem[] =
                recordItem.recordItemsList.map(item => {
                    if (item.id === editedRecordItem.id)
                        return editedRecordItem as IRecordItem
                    return item as IRecordItem
                })

            setEditedCardDetails({ ...recordItem, recordItemsList: newRecordItemsList })

            localStorage.setItem('lastKnownInputDate', editedRecordItem.date.toDateString())

            setToSubmit(true)
        }

    }

    const onCancelEdit = () => {
        setToEdit(false);
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
            recordId={recordId!}
        />
    )
}

export default EditRecordItemForm