import { useForm } from 'react-hook-form'
import './newRecordItemForm.css'
import CardCategory from '@/model/Record/EcardCategory'
import IRecordItem from '@/model/Record/IRecordItem'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hook'
import IRecord from '@/model/Record/IRecord'
import { getRecordHook } from '@/customHooks/getRecordHook'
import { useState } from 'react';
import { useEffect } from 'react';
import { updateRecord } from '@/actions/record'
import moment from 'moment'


type Props = {
}

const NewRecordItemForm = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, handleSubmit } = useForm();
    const { recordId } = useParams();
    const lastKnownId = localStorage.getItem("lastKnownId");
    const cardDetails: IRecord | undefined = getRecordHook(recordId);
    const [newCardDetails, setNewCardDetails] = useState<IRecord>();
    const [toSubmit, setToSubmit] = useState<Boolean>(false);

    useEffect(() => {
        if (cardDetails) {
            setNewCardDetails(cardDetails)
        }

    }, [cardDetails])

    useEffect(() => {
        if (toSubmit == true && newCardDetails !== undefined) {
            dispatch(updateRecord(newCardDetails, navigate))
        }

    }, [toSubmit])

    const onSubmit: any = (data: IRecordItem) => {

        if (lastKnownId && newCardDetails && newCardDetails) {
            const recordItem: IRecordItem = {
                name: data.name,
                amount: data.amount,
                category: data.category,
                date: new Date(moment(data.date).format("yyyy/MM/DD")),
                id: (+lastKnownId + 1).toString()
            }

            setNewCardDetails(prevState => {
                return { ...prevState, recordItemsList: [...prevState?.recordItemsList as [], recordItem] } as IRecord
            })

            setToSubmit(true);

        }


    }



    return (
        <div className="newRecordItem">
            {lastKnownId && <form className="newRecordItemForm" onSubmit={handleSubmit(onSubmit)}>
                Record Name:
                <input {...register("name", { "required": true })} />
                Amount:
                <input type="number" {...register("amount", { "required": true })} />
                Date:
                <input type="date" {...register("date", { "required": true })} />
                Category
                <select {...register("category")}>
                    <option value={CardCategory.ENTERTAINMENT}>Entertainment</option>
                    <option value={CardCategory.EXPENSES}>Expenses</option>
                    <option value={CardCategory.INCOME}>Income</option>
                </select>
                <button type="submit">Submit</button>
            </form>}
        </div>
    )
}

export default NewRecordItemForm