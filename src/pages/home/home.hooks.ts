import { getAllRecordsOfUser } from "@/actions/record"
import { useAppDispatch } from "@/hook"
import { IRecord } from "@/model/CardModel"
import { useEffect } from "react"
import { NavigateFunction } from "react-router-dom"

type Props = {
    navigate: NavigateFunction,
    records: any,
    reload: boolean,
    setUserRecords: React.Dispatch<React.SetStateAction<IRecord[] | null>>,
    userId: string | null
}

export const useHomePage = ({ navigate, records, reload, setUserRecords, userId }: Props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        //Navigate to Log In if there is no user logged in.
        if (userId === undefined) {
            navigate('/login', { replace: true })
        }
    }, [])

    useEffect(() => {
        localStorage.removeItem("lastKnownInputDate")

        if (userId)
            dispatch(getAllRecordsOfUser(userId))
    }, [userId, reload])

    useEffect(() => {

        setUserRecords(prevState => [...records.records]);
    }, [records])
}