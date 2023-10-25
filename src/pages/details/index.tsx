import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './details.css'
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import IRecord from '@/model/Record/IRecord';
import { getRecordHook } from '@/customHooks/getRecordHook';
import { useAppDispatch } from '@/hook';
import { updateRecord } from '@/actions/record';
import EditRecordItemForm from '../newFile/editRecordItemForm';
import moment from 'moment';
import IRecordItem from '@/model/Record/IRecordItem';
import dayjs from 'dayjs';


type Props = {}

const CardDetails = (props: Props) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const { recordId } = useParams();
    const cardDetails: IRecord | undefined = getRecordHook(recordId);

    const [updateDetails, setUpdateDetails] = useState<IRecord>();
    const [toDelete, setToDelete] = useState<Boolean>(false);
    const [toEdit, setToEdit] = useState<Boolean>(false);
    const [editedItemId, setEditedItemId] = useState<String>("");

    const [inputDate, setInputDate] = useState<Date>(new Date());


    const [cardData, setCardData] = useState<{
        labels: String[],
        datasets: [
            {
                label: string,
                data: number[]
            }
        ]
    }>();



    useEffect(() => {

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

        if (inputDate && updateDetails) {

            setCardData({
                labels: updateDetails.recordItemsList
                    .filter(recordItem =>
                        recordItem.date.getMonth() === inputDate.getMonth() &&
                        recordItem.date.getFullYear() === inputDate.getFullYear()
                    )
                    .map(recordItem => recordItem.name),
                datasets: [{
                    label: updateDetails.name.toString(),
                    data: updateDetails.recordItemsList
                        .filter(recordItem =>
                            recordItem.date.getMonth() === inputDate.getMonth() &&
                            recordItem.date.getFullYear() === inputDate.getFullYear()
                        )
                        .map(recordItem => recordItem.amount)
                }]
            });
        }


    }, [inputDate, updateDetails])


    const onDeleteCardDetail = (id: String) => {
        setUpdateDetails(prevState => {
            const updatedItemsList = prevState?.recordItemsList.filter(
                recordItem => { return recordItem.id !== id }
            )
            return {
                ...prevState,
                recordItemsList: updatedItemsList
            } as IRecord
        })

        setToDelete(prevState => !prevState);
    }

    const onEditCardDetail = (id: String) => {
        setEditedItemId(id);
        setToEdit(true);
    }



    return (
        <div className='cardDetails'>
            {toEdit ? <EditRecordItemForm setToEdit={setToEdit} id={editedItemId} recordItem={updateDetails} /> :
                <div>
                    <h1>Card Name</h1>
                    <button onClick={() => navigate('newDetails')}>Add New Data</button>
                    <div className="inputDate">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label={'Month & Year'} views={['month', 'year']}
                                defaultValue={dayjs(`${new Date()}`)}
                                onAccept={(v: any) => {
                                    if (v)
                                        setInputDate(v.$d)
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    {inputDate &&
                        <>
                            <div className="chartContainer">
                                {cardData && cardData.labels.length > 0 ? <Bar data={cardData} /> : <h2>No Data is available for this month.</h2>}
                            </div>
                            <div className="transactions">
                                {updateDetails && cardData && cardData.labels.length > 0 &&
                                    <table className="table-auto w-full text-center">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Detail</th>
                                                <th>Amount</th>
                                                <th>Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                updateDetails.recordItemsList
                                                    .filter(item =>
                                                        item.date.getFullYear() === inputDate.getFullYear() &&
                                                        item.date.getMonth() === inputDate.getMonth())
                                                    .sort((a: IRecordItem, b: IRecordItem) => {
                                                        const dateA = new Date(a.date)
                                                        const dateB = new Date(b.date)
                                                        return dateA.getTime() - dateB.getTime()
                                                    })
                                                    .map((data) =>
                                                        <tr key={data.id.toString()}>
                                                            <td>{`${moment(data.date).format("MMMM DD YYYY")}`}</td>
                                                            <td>{data.name}</td>
                                                            <td>{`$${data.amount}`}</td>
                                                            <td>{data.category.charAt(0).toUpperCase() + data.category.slice(1)}</td>
                                                            <td><button onClick={() => onEditCardDetail(data.id)}>Edit</button></td>
                                                            <td><button onClick={() => onDeleteCardDetail(data.id)}>Delete</button></td>
                                                        </tr>
                                                    )}
                                        </tbody>
                                    </table>}
                            </div>
                        </>}
                </div>}
        </div>
    )
}

export default CardDetails