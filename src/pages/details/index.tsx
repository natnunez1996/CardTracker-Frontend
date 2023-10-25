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

    const [inputDate, setInputDate] = useState<Date>();


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
                setCardData({
                    labels: cardDetails.recordItemsList.map(recordItem => recordItem.name),
                    datasets: [{
                        label: cardDetails.name.toString(),
                        data: cardDetails.recordItemsList.map(recordItem => recordItem.amount)
                    }]
                })
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
        if (inputDate)
            console.log(inputDate);


    }, [inputDate])


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
                                {!cardData ? <h2>Loading Data from the server</h2> : <Bar data={cardData} />}
                            </div>
                            <div className="transactions">
                                {updateDetails && updateDetails.recordItemsList.length > 0 ? <table className="table-auto w-full text-center">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Date</th>
                                            <th>Detail</th>
                                            <th>Amount</th>
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            updateDetails.recordItemsList.map((data) =>
                                                <tr key={data.id.toString()}>
                                                    <td>{`${data.id}`}</td>
                                                    <td>{`${moment(data.date).format("MMMM DD YYYY")}`}</td>
                                                    <td>{data.name}</td>
                                                    <td>{`$${data.amount}`}</td>
                                                    <td>{data.category.charAt(0).toUpperCase() + data.category.slice(1)}</td>
                                                    <td><button onClick={() => onEditCardDetail(data.id)}>Edit</button></td>
                                                    <td><button onClick={() => onDeleteCardDetail(data.id)}>Delete</button></td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table> :
                                    <h2>No Data Available</h2>}
                            </div>
                        </>}
                </div>}
        </div>
    )
}

export default CardDetails