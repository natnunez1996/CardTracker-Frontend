import { useForm } from 'react-hook-form'
import CardCategory from '@/model/Record/EcardCategory'
import IRecordItem from '@/model/Record/IRecordItem'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hook'
import IRecord from '@/model/Record/IRecord'
import { getRecordHook } from '@/customHooks/getRecordHook'
import { useState, useEffect } from 'react';
import { updateRecord } from '@/actions/record'
import { getUserIdHook } from '@/customHooks/getUserIdHook'
import { IProfile } from '@/model/UserModel/IProfile'
import RecordItemForm from '@/common/RecordItemForm'


type Props = {
}

const NewRecordItemForm = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { recordId } = useParams();
    const userId: IProfile | undefined = getUserIdHook();
    const lastKnownId = localStorage.getItem("lastKnownId");
    const cardDetails: IRecord | undefined = getRecordHook(userId?.result._id, recordId);
    const [newCardDetails, setNewCardDetails] = useState<IRecord>();
    const [toSubmit, setToSubmit] = useState<Boolean>(false);

    const { control, handleSubmit } = useForm<IRecordItem>();

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
                date: data.date,
                id: (+lastKnownId + 1).toString()
            }

            setNewCardDetails(prevState => {
                return { ...prevState, recordItemsList: [...prevState?.recordItemsList as [], recordItem] } as IRecord
            })
            localStorage.setItem('lastKnownInputDate', new Date(recordItem.date).toDateString())
            setToSubmit(true);
        }
    }

    const choices = (Object.keys(CardCategory) as Array<keyof typeof CardCategory>);


    return (
        <>
            {lastKnownId &&
                <RecordItemForm
                    cardType={newCardDetails?.recordType}
                    choices={choices}
                    control={control}
                    handleSubmit={handleSubmit}
                    navigate={navigate}
                    onSubmit={onSubmit}
                    recordId={recordId!}
                />
            }
        </>
    )
}

export default NewRecordItemForm