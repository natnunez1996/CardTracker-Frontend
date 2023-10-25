import { useForm } from 'react-hook-form'
import './editRecordItemForm.css'
import CardCategory from '@/model/Record/EcardCategory'
import IRecordItem from '@/model/Record/IRecordItem'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hook'
import IRecord from '@/model/Record/IRecord'
import { useState } from 'react';
import { useEffect } from 'react';
import { updateRecord } from '@/actions/record'
import moment from 'moment'


type Props = {
    recordItem: IRecord | undefined,
    id: String,
    setToEdit: React.Dispatch<React.SetStateAction<Boolean>>
}

const EditRecordItemForm = ({ recordItem, id, setToEdit }: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm();

    const [editedCardDetails, setEditedCardDetails] = useState<IRecord>();
    const [toSubmit, setToSubmit] = useState<Boolean>(false);

    useEffect(() => {
        if (recordItem) {
            recordItem.recordItemsList.map(item => {
                if (item.id === id) {
                    setValue("name", item.name)
                    setValue("amount", item.amount)
                    setValue("date", moment(item.date).format("yyyy-MM-DD"))
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
            date: new Date(moment(data.date).format("yyyy/MM/DD")),
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

            setToSubmit(true)
        }

    }

    const onCancelEdit = () => {
        setToEdit(false);
    }



    return (
        <div className="editRecordItem">
            <form className="editRecordItemForm" onSubmit={handleSubmit(onSubmit)}>
                Record Name:
                <input {...register("name", { "required": true })} />
                Amount:
                <input type="number" {...register("amount", { "required": true, valueAsNumber: true })} />
                Date:
                <input type="date" {...register("date", { "required": true })} />
                Category
                <select {...register("category")}>
                    <option value={CardCategory.ENTERTAINMENT}>Entertainment</option>
                    <option value={CardCategory.EXPENSES}>Expenses</option>
                    <option value={CardCategory.INCOME}>Income</option>
                </select>
                <button type="submit">Submit</button>
                <button onClick={() => onCancelEdit()}>Cancel</button>
            </form>
        </div>
    )
}

export default EditRecordItemForm