import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from 'react';
import 'chart.js/auto';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getRecordHook } from '@/customHooks/getRecordHook';
import { useAppDispatch } from '@/hook';
import { updateRecord } from '@/actions/record';
import EditRecordItemForm from '../newFile/editRecordItemForm';
import dayjs from 'dayjs';
import { getUserIdHook } from '@/customHooks/getUserIdHook';
import { IProfile } from '@/model/UserModel/IProfile';
import DistributionDetails from './distributionDetails/index';
import ExpensesDetails from '@/pages/details/expensesDetails';
import ListsDetails from '@/pages/details/listsDetails';
import MonthsDistributionDetails from '@/pages/details/monthsDistributionDetails';
import { CardCategory, IRecord } from '@/model/CardModel';
import { Box, Container, Typography } from '@mui/material';


type Props = {}

const CardDetails = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { recordId } = useParams();
    const user: IProfile | undefined = getUserIdHook();
    const cardDetails: IRecord | undefined = getRecordHook(user?.result._id, recordId);

    const [toDelete, setToDelete] = useState<Boolean>(false);
    const [toEdit, setToEdit] = useState<Boolean>(false);
    const [editedItemId, setEditedItemId] = useState<String>("");
    const [updateDetails, setUpdateDetails] = useState<IRecord>();

    const [amountEarnLoss, setAmountEarnLoss] = useState<number>(0);
    const [inputDate, setInputDate] = useState<Date>(new Date());
    const storedDate = localStorage.getItem("lastKnownInputDate");

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

    useEffect(() => {
        localStorage.setItem("lastKnownInputDate", inputDate.toDateString())
    }, [inputDate])


    return (
        <>
            {
                toEdit ? <EditRecordItemForm id={editedItemId} recordId={recordId!} recordItem={updateDetails} setToEdit={setToEdit} /> :
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        width={'100vw'}
                    >
                        <Typography variant='h5'>{updateDetails ? updateDetails.name : "Card Name"}</Typography>
                        <Container >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    autoFocus
                                    label={'Month & Year'}
                                    openTo='month'
                                    views={['year', 'month']}
                                    defaultValue={storedDate ? dayjs(`${new Date(storedDate)}`) : dayjs(`${new Date()}`)}
                                    onAccept={(v: any) => {
                                        setInputDate(v.$d)
                                    }}
                                    onChange={(v: any) => {
                                        setInputDate(v.$d)
                                    }}
                                />
                            </LocalizationProvider>
                        </Container>

                        <Typography variant='h6'>You {amountEarnLoss >= 0 ? `saved $${amountEarnLoss.toFixed(2)}` : `lost $${amountEarnLoss.toFixed(2)}`}</Typography>
                        {
                            inputDate &&
                            <>
                                {updateDetails &&
                                    <Box
                                        display={'flex'}
                                        maxWidth={'100vw'}
                                        height={400}
                                        alignItems={'center'}
                                    >
                                        <DistributionDetails record={updateDetails} inputDate={inputDate} choices={choices} />

                                        <ExpensesDetails inputDate={inputDate} record={updateDetails}
                                            setAmountEarnLoss={setAmountEarnLoss} choices={choices} />

                                        <MonthsDistributionDetails record={updateDetails} inputDate={inputDate} choices={choices} />
                                    </Box>
                                }
                                <div className="transactions">
                                    {updateDetails &&
                                        <ListsDetails
                                            amountEarnLoss={amountEarnLoss}
                                            inputDate={inputDate}
                                            record={updateDetails}
                                            setEditedItemId={setEditedItemId}
                                            setToDelete={setToDelete}
                                            setToEdit={setToEdit}
                                            setUpdateDetails={setUpdateDetails} />
                                    }
                                </div>
                            </>
                        }
                    </Box>
            }
        </>
    )
}

export default CardDetails