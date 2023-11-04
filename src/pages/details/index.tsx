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
import CardCategory from '@/model/Record/EcardCategory';
import { getUserIdHook } from '@/customHooks/getUserIdHook';
import { IProfile } from '@/model/UserModel/IProfile';
import DistributionDetails from './distributionDetails/index';


type Props = {}

const CardDetails = (props: Props) => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const { recordId } = useParams();
    const user: IProfile | undefined = getUserIdHook();

    const cardDetails: IRecord | undefined = getRecordHook(user?.result._id, recordId);

    const [updateDetails, setUpdateDetails] = useState<IRecord>();
    const [toDelete, setToDelete] = useState<Boolean>(false);
    const [toEdit, setToEdit] = useState<Boolean>(false);
    const [editedItemId, setEditedItemId] = useState<String>("");

    const storedDate = localStorage.getItem("lastKnownInputDate")
    const [inputDate, setInputDate] = useState<Date>(new Date());
    const [amountEarnLoss, setAmountEarnLoss] = useState<number>(0);


    const [cardData, setCardData] = useState<{
        labels: String[],
        datasets: [
            {
                label: string,
                data: number[],
                backgroundColor: string
            }, {
                label: string,
                data: number[],
                backgroundColor: string
            }, {
                label: string,
                data: number[],
                backgroundColor: string
            }
        ]
    }>();


    useEffect(() => {
        if (!user)
            navigate('/home', { replace: true });

        if (storedDate)
            setInputDate(new Date(storedDate))

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
    }, [cardDetails, user])



    useEffect(() => {
        if (updateDetails) {
            dispatch(updateRecord(updateDetails, navigate))
            navigate(0)
        }
    }, [toDelete])

    useEffect(() => {
        if (inputDate && updateDetails) {

            const filteredDetails: IRecordItem[] = updateDetails.recordItemsList
                .filter(recordItem => {
                    if (recordItem.date.getMonth() === inputDate.getMonth() &&
                        recordItem.date.getFullYear() === inputDate.getFullYear()) {
                        return recordItem;
                    }
                })
                .sort((a: IRecordItem, b: IRecordItem) => {
                    const dateA = new Date(a.date)
                    const dateB = new Date(b.date)
                    return dateA.getTime() - dateB.getTime()
                })

            let inputMonth: Date[] = [];
            let date = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1)
            while (date.getMonth() === inputDate.getMonth()) {
                (filteredDetails.find(item => {
                    if (item.date.getDate() === date.getDate()) {
                        inputMonth.push(new Date(date));
                    }
                }))
                date.setDate(date.getDate() + 1)
            }

            setCardData({
                labels: inputMonth.map(day => `${day.toLocaleString('default', { month: 'short' })} ${day.getDate()}`),
                datasets: [{
                    label: CardCategory.INCOME,
                    data: inputMonth.map((day) => {
                        let incomeData = filteredDetails.filter(i => i.category === CardCategory.INCOME)
                        let output: number = 0;
                        incomeData.find(item => {
                            if (item.date.getDate() === day.getDate())
                                output = item.amount
                        })
                        return output
                    }),
                    backgroundColor: "rgba(53, 162, 235, 0.5)"
                }, {
                    label: CardCategory.ENTERTAINMENT,
                    data: inputMonth.map((day) => {
                        let incomeData = filteredDetails.filter(i => i.category === CardCategory.ENTERTAINMENT)
                        let output: number = 0;
                        incomeData.find(item => {
                            if (item.date.getDate() === day.getDate())
                                output = item.amount
                        })
                        return output
                    }),
                    backgroundColor: "rgba(236, 167, 16, 0.5)"
                }, {
                    label: CardCategory.EXPENSES,
                    data: inputMonth.map((day) => {
                        let incomeData = filteredDetails.filter(i => i.category === CardCategory.EXPENSES)
                        let output: number = 0;
                        incomeData.find(item => {
                            if (item.date.getDate() === day.getDate())
                                output = item.amount
                        })
                        return output
                    }),
                    backgroundColor: "rgba(255, 99, 132, 0.5)"
                }]
            })

            setAmountEarnLoss(0)

            filteredDetails.forEach(recordItem => {
                if (recordItem.category === CardCategory.INCOME)
                    setAmountEarnLoss(prevAmount => prevAmount += recordItem.amount);
                else if (recordItem.category === CardCategory.ENTERTAINMENT ||
                    recordItem.category === CardCategory.EXPENSES)
                    setAmountEarnLoss(prevAmount => prevAmount -= recordItem.amount);

            })

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
                    <h1>{updateDetails ? updateDetails.name : "Card Name"}</h1>
                    <button onClick={() => navigate('newDetails')}>Add New Data</button>
                    <div className="inputDate">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label={'Month & Year'} views={['month', 'year']}
                                defaultValue={storedDate ? dayjs(`${inputDate}`) : dayjs(`${new Date()}`)}
                                onAccept={(v: any) => {
                                    if (v)
                                        setInputDate(v.$d)
                                }}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="amount">
                        <h1>You {amountEarnLoss >= 0 ? `saved $${amountEarnLoss}` : `lost $${amountEarnLoss}`}</h1>
                    </div>
                    {inputDate &&
                        <>
                            <div className="chartContainer">
                                {cardData && cardData.labels.length > 0 ?
                                    <Bar options={{ maintainAspectRatio: false }} data={cardData} width={200} height={400} />
                                    :
                                    <h2 style={{ height: "68vh" }}>No Data is available for this month.</h2>}
                            </div>
                            {updateDetails &&
                                <div className="distributionContainer">
                                    <DistributionDetails record={updateDetails} inputDate={inputDate} />
                                </div>
                            }
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