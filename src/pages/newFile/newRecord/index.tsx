import IRecord from "@/model/Record/IRecord";
import { SubmitHandler, useForm } from "react-hook-form"
import "./newRecord.css"
import { useAppDispatch } from "@/hook";
import { useNavigate } from "react-router-dom";
import { createRecord } from "@/actions/record";
import { CardType } from "@/model/Record/ECardType";

type Props = {}

const NewRecord = (props: Props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit: SubmitHandler<any> = (data: IRecord) => {
        let userId: String = "";

        const storedData = localStorage.getItem("profile")

        if (storedData !== null) {
            const result = JSON.parse(storedData);
            userId = result.result._id;
        }

        const newRecord: IRecord = {
            name: data.name,
            recordItemsList: [],
            recordType: data.recordType,
            createdBy: userId,
            createdDate: new Date(),
            updatedDate: new Date(),
        }
        console.log(data.recordType);


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
                            return <option value={CardType[choice]}>{choice.replace(/_/, ' ')}</option>
                        })
                    }
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewRecord