import { getRecord } from '@/actions/record';
import { useAppDispatch, useAppSelector } from '@/hook';
import IRecord from '@/model/Record/IRecord';
import IRecordItem from '@/model/Record/IRecordItem';
import { useEffect } from 'react';
import { useState } from 'react';


export function getRecordHook(recordId: String | undefined) {
    const dispatch = useAppDispatch();
    const result = useAppSelector(state => state.userRecords.recordDetails);

    const [recordDetail, setRecordDetail] = useState<IRecord>();

    useEffect(() => {
        if (recordId)
            dispatch(getRecord(recordId))
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

    return recordDetail;
}

