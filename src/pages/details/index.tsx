import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './details.css'
import { useState } from 'react';
import 'chart.js/auto';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import IRecord from '@/model/Record/IRecord';
import { getRecordHook } from '@/customHooks/getRecordHook';
import { useAppDispatch } from '@/hook';
import { deleteRecord, updateRecord } from '@/actions/record';
import EditRecordItemForm from '../newFile/editRecordItemForm';
import dayjs from 'dayjs';
import { getUserIdHook } from '@/customHooks/getUserIdHook';
import { IProfile } from '@/model/UserModel/IProfile';
import DistributionDetails from './distributionDetails/index';
import ExpensesDetails from './expensesDetails';
import ListsDetails from './listsDetails';
import MonthsDistributionDetails from './monthsDistributionDetails';
import CardCategory from '@/model/Record/EcardCategory';


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

    const choices: CardCategory[] = (Object.keys(CardCategory) as Array<keyof typeof CardCategory>).map(key => CardCategory[key]);



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
    }, [cardDetails])



    useEffect(() => {

        if (updateDetails) {
            dispatch(updateRecord(updateDetails, navigate))
            navigate(0)
        }
    }, [toDelete])





    return (
        <>
            {
                toEdit ? <EditRecordItemForm setToEdit={setToEdit} id={editedItemId} recordItem={updateDetails} /> :
                    <div className='cardDetails'>
                        <h1>{updateDetails ? updateDetails.name : "Card Name"}</h1>
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
                            <h1>You {amountEarnLoss >= 0 ? `saved $${amountEarnLoss.toFixed(2)}` : `lost $${amountEarnLoss.toFixed(2)}`}</h1>
                        </div>
                        {
                            inputDate &&
                            <>
                                {updateDetails &&
                                    <div className="chartContainer">
                                        <DistributionDetails record={updateDetails} inputDate={inputDate} choices={choices} />

                                        <ExpensesDetails inputDate={inputDate} record={updateDetails}
                                            setAmountEarnLoss={setAmountEarnLoss} choices={choices} />

                                        <MonthsDistributionDetails record={updateDetails} inputDate={inputDate} choices={choices} />
                                    </div>
                                }
                                <div className="transactions">
                                    {updateDetails &&
                                        <ListsDetails inputDate={inputDate} record={updateDetails}
                                            setEditedItemId={setEditedItemId} setToDelete={setToDelete}
                                            setToEdit={setToEdit} setUpdateDetails={setUpdateDetails} />
                                    }
                                </div>
                            </>
                        }
                    </div>
            }
        </>
    )
}

export default CardDetails