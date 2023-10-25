import IRecord from "@/model/Record/IRecord";
import { SubmitHandler, useForm } from "react-hook-form"
import "./newRecord.css"
import { useAppDispatch } from "@/hook";
import { useNavigate } from "react-router-dom";
import { createRecord } from "@/actions/record";

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
            amount: 0,
            createdBy: userId,
            createdDate: new Date(),
            updatedDate: new Date(),
        }

        dispatch(createRecord(newRecord, navigate));


    }



    return (
        <div className="newRecord">
            <form className="newRecordForm" onSubmit={handleSubmit(onSubmit)}>
                Record Name:
                <input {...register("name", { "required": true })} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewRecord