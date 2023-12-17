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
import { getUserIdHook } from '@/customHooks/getUserIdHook'
import { IProfile } from '@/model/UserModel/IProfile'
import { CardType } from '@/model/Record/ECardType'


type Props = {
}

const NewRecordItemForm = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { register, handleSubmit } = useForm();
    const { recordId } = useParams();
    const userId: IProfile | undefined = getUserIdHook();
    const lastKnownId = localStorage.getItem("lastKnownId");
    const cardDetails: IRecord | undefined = getRecordHook(userId?.result._id, recordId);
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
            localStorage.setItem('lastKnownInputDate', recordItem.date.toDateString())
            setToSubmit(true);
        }
    }

    const choicesArray = (Object.keys(CardCategory) as Array<keyof typeof CardCategory>);

    const choices = newCardDetails?.recordType !== CardType.GIFT_CARD ?
        choicesArray.map(key => CardCategory[key]) :
        choicesArray.filter(key => CardCategory[key] !== CardCategory.INCOME)
            .map(key => CardCategory[key]);


    return (
        <div className="newRecordItem">
            {lastKnownId && <form className="newRecordItemForm" onSubmit={handleSubmit(onSubmit)}>
                Record Name:
                <input {...register("name", { "required": true })} />
                Amount:
                <input type="number" step=".01" {...register("amount", { "required": true })} />
                Date:
                <input type="date" {...register("date", { "required": true })} />
                Category
                <select {...register("category")}>
                    {
                        choices.map(choice => {
                            return <option value={choice}>{choice[0].toUpperCase() + choice.slice(1)}</option>
                        })
                    }
                </select>
                <button type="submit">Submit</button>
            </form>}
        </div>
    )
}

export default NewRecordItemForm