import { updateRecord } from "@/actions/record";
import { CardCategory } from "@/enums/ECard";
import { useAppDispatch } from "@/hook";
import { IRecord, IRecordItem } from "@/model/CardModel";
import { IProfile } from "@/model/UserModel";
import { filterRecordsListByDate } from "@/utils";
import { SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useDetailsPage = (
    cardDetails: IRecord | undefined,
    inputDate: Date,
    updateDetails: IRecord | undefined,
    user: IProfile | undefined,
    setAmountEarnLoss: React.Dispatch<SetStateAction<number>>,
    setInputDateRecordList: React.Dispatch<SetStateAction<IRecordItem[] | never>>,
    setUpdateDetails: React.Dispatch<SetStateAction<IRecord | undefined>>,
    toDelete: boolean,
) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (!user)
            navigate('/home', { replace: true });

        if (cardDetails !== undefined && cardDetails.recordItemsList) {
            if (cardDetails.recordItemsList.length > 0) {
                localStorage.setItem("lastKnownId",
                    cardDetails.recordItemsList[cardDetails.recordItemsList.length - 1].id.toString())
            }

            if (cardDetails.recordItemsList.length === 0) {
                localStorage.setItem("lastKnownId", "0");
            }

            setUpdateDetails(cardDetails);
        }
    }, [cardDetails])

    useEffect(() => {
        if (updateDetails) {
            dispatch(updateRecord(updateDetails, navigate))
            navigate(0)
        }
    }, [toDelete])

    useEffect(() => {
        localStorage.setItem("lastKnownInputDate", inputDate.toDateString())

        if (updateDetails !== undefined) {

            const filteredDetails = filterRecordsListByDate(updateDetails.recordItemsList, inputDate)
            setInputDateRecordList(filteredDetails)

            setAmountEarnLoss(0);
            filteredDetails.forEach(recordItem => {
                if (recordItem.category === CardCategory.INCOME)
                    setAmountEarnLoss(prevAmount => prevAmount += recordItem.amount);
                else
                    setAmountEarnLoss(prevAmount => prevAmount -= recordItem.amount);

            })
        }
    }, [inputDate, updateDetails])

}