import { getRecord } from '@/actions/record';
import { useAppDispatch, useAppSelector } from '@/hook';
import { IRecord, IRecordItem } from '@/model/CardModel';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function getRecordHook(userId: String | undefined, recordId: String | undefined) {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const result = useAppSelector(state => state.userRecords.recordDetails);
    const error = useAppSelector(state => state.userRecords.message);

    const [recordDetail, setRecordDetail] = useState<IRecord>();

    useEffect(() => {
        if (recordId && userId)
            dispatch(getRecord(userId, recordId))
    }, [])

    useEffect(() => {
        if (result) {
            let convertedResult: IRecordItem[]

            if (result.recordItemsList && result.recordItemsList.length > 0) {
                convertedResult = result.recordItemsList.map((item: IRecordItem) => ({
                    ...item,
                    date: new Date(item.date)
                }))
                setRecordDetail({ ...result, recordItemsList: convertedResult });
                return
            }

            setRecordDetail(result)
        }
    }, [result])


    useEffect(() => {
        if (error)
            navigate("/error", { replace: true })

    }, [error])

    return recordDetail;
}

