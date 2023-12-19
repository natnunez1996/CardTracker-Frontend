import { useEffect, useState } from 'react';
import './home.css';
import { useAppDispatch, useAppSelector } from '@/hook';
import { deleteRecord, getAllRecordsOfUser } from '@/actions/record';
import { useNavigate } from 'react-router-dom';
import CardItem from '@/common/CardItem';
import { Paper, IconButton, Stack, Popper, Box, Button } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { CardCategory, IRecord } from '@/model/CardModel';

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
    const [recordIdToDelete, setRecordIdToDelete] = useState<string | null>(null);
    const [reload, setReload] = useState(true);

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

    const handleDelete = () => {
        if (recordIdToDelete) {
            dispatch(deleteRecord(recordIdToDelete, navigate))
            setReload(prevState => !prevState)
        }
    }


    useEffect(() => {
        localStorage.removeItem("lastKnownInputDate")

        if (userId)
            dispatch(getAllRecordsOfUser(userId))
    }, [userId, reload])

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
                                    navigate={navigate}
                                    record={record}
                                    setAnchorEl={setAnchorEl}
                                    setRecordIdToDelete={setRecordIdToDelete}
                                />
                            ))}
                        </Stack> :
                        <h1>No Records Found for this user.</h1>}

                    <Popper open={open} anchorEl={anchorEl}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} >
                            <Button color='error' onClick={handleDelete}> DELETE </Button>
                            <Button color='success' onClick={() => setAnchorEl(null)}> Cancel </Button>
                        </Box>
                    </Popper>
                </>
            }
        </div >
    )
}

export default Home