import IRecord from "@/model/Record/IRecord";
import { SubmitHandler, useForm } from "react-hook-form"
import "./newRecord.css"
import { useAppDispatch } from "@/hook";
import { useNavigate } from "react-router-dom";
import { createRecord } from "@/actions/record";
import { CardType } from "@/model/Record/ECardType";
import IRecordItem from "@/model/Record/IRecordItem";
import CardCategory from "@/model/Record/EcardCategory";

type Props = {}

const NewRecord = (props: Props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, watch } = useForm();

    const onSubmit: SubmitHandler<any> = (data: IRecord) => {
        let userId: String = "";

        const storedData = localStorage.getItem("profile")

        if (storedData !== null) {
            const result = JSON.parse(storedData);
            userId = result.result._id;
        }

        const tempRecordItem: IRecordItem = {
            amount: data.initialAmount ?? 0,
            category: CardCategory.INCOME,
            date: new Date(),
            id: '1',
            name: "Gift Card's Initial Balance"
        }
        const newRecord: IRecord = {
            name: data.name,
            recordItemsList: [] as IRecordItem[],
            recordType: data.recordType,
            createdBy: userId,
            createdDate: new Date(),
            updatedDate: new Date(),
        }

        if (data.recordType === CardType.GIFT_CARD)
            newRecord.recordItemsList.push(tempRecordItem)


        dispatch(createRecord(newRecord, navigate));


    }


    const choices = (Object.keys(CardType) as Array<keyof typeof CardType>)


    return (
        <div className="newRecord">
            <form className="newRecordForm" onSubmit={handleSubmit(onSubmit)}>
                Record Name:
                <input {...register("name", { "required": true })} />
                Type of Card:
                <select {...register("recordType")}>
                    {
                        choices.map(choice => {
                            return <option key={choice} value={CardType[choice]}>{choice.replace(/_/, ' ')}</option>
                        })
                    }
                </select>
                {
                    watch(['recordType']).toString() === CardType.GIFT_CARD &&
                    <>
                        Gift Card's Amount
                        <input type="number" step=".01" {...register("initialAmount", { "required": true })} />
                    </>
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewRecord