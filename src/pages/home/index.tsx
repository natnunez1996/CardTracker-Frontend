import { useEffect, useState } from 'react';
import './home.css';
import IRecord from '@/model/Record/IRecord';
import { useAppDispatch, useAppSelector } from '@/hook';
import { deleteRecord, getAllRecordsOfUser } from '@/actions/record';
import { useNavigate } from 'react-router-dom';
import CardCategory from '@/model/Record/EcardCategory';
import CardItem from '@/common/CardItem';
import { Paper, IconButton, Stack } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

type Props = {
    userId: String | undefined;
}

const Home = ({ userId }: Props) => {
    const dispatch = useAppDispatch();
    const records = useAppSelector(state => state.userRecords);
    const navigate = useNavigate();

    const [userRecords, setUserRecords] = useState<IRecord[]>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const calculateBalance = (record: IRecord): number => {
        let sum = 0;

        record.recordItemsList.forEach(item => {
            if (item.category === CardCategory.INCOME)
                return sum += item.amount
            else
                return sum -= item.amount
        })

        return sum
    }

    const handleDelete = (recordId: string) => {
        if (recordId)
            dispatch(deleteRecord(recordId, navigate))
        window.location.reload();
    }


    useEffect(() => {
        localStorage.removeItem("lastKnownInputDate")

        if (userId)
            dispatch(getAllRecordsOfUser(userId))
    }, [userId])

    useEffect(() => {
        setUserRecords(records.records);
    }, [records])



    return (
        <div className='home'>
            {userId &&
                <>
                    <Paper elevation={3} sx={{ height: 50, alignSelf: 'center', width: '100 %' }}>
                        <IconButton color='primary' onClick={() => navigate('/newRecord', { replace: true })}>
                            Add Card <PostAddIcon />
                        </IconButton>
                    </Paper>
                    {userRecords ?
                        <Stack sx={{ margin: '1rem' }} direction='row' spacing={2}>
                            {userRecords.map((record) => (
                                <CardItem key={record._id?.toString()}
                                    anchorEl={anchorEl}
                                    calculateBalance={calculateBalance}
                                    handleDelete={handleDelete}
                                    navigate={navigate}
                                    open={open}
                                    record={record}
                                    setAnchorEl={setAnchorEl}
                                />
                            ))}
                        </Stack> :
                        <h1>No Records Found for this user.</h1>}
                </>
            }
        </div >
    )
}

export default Home