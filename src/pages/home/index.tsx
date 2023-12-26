import { useAppDispatch, useAppSelector } from '@/hook';
import { useEffect, useState } from 'react';
import { deleteRecord, getAllRecordsOfUser } from '@/actions/record';
import { useNavigate } from 'react-router-dom';
import CardItem from '@/common/CardItem';
import { Paper, IconButton, Popper, Box, Button, Grid } from '@mui/material';
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
        <Box display={'flex'} flexDirection={'column'}>
            {userId &&
                <>
                    <Paper elevation={3} sx={{ height: 50, alignSelf: 'center', width: '100 %', margin: '1rem' }}>
                        <IconButton color='primary' onClick={() => navigate('/newRecord', { replace: true })}>
                            Add Card <PostAddIcon />
                        </IconButton>
                    </Paper>
                    {userRecords ?
                        <Grid container spacing={1} justifyContent={'space-around'} >
                            {userRecords.sort((a: IRecord, b: IRecord) => {
                                const dateA = new Date(a.updatedDate);
                                const dateB = new Date(b.updatedDate);
                                return dateB.getTime() - dateA.getTime();
                            })
                                .map((record) => (
                                    <Grid item key={record._id?.toString()}>
                                        <CardItem
                                            anchorEl={anchorEl}
                                            calculateBalance={calculateBalance}
                                            navigate={navigate}
                                            record={record}
                                            setAnchorEl={setAnchorEl}
                                            setRecordIdToDelete={setRecordIdToDelete}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                        :
                        <h1>No Records Found for this user.</h1>}

                    <Popper open={open} anchorEl={anchorEl}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} >
                            <Button color='error' onClick={handleDelete}> DELETE </Button>
                            <Button color='success' onClick={() => setAnchorEl(null)}> Cancel </Button>
                        </Box>
                    </Popper>
                </>
            }
        </Box >
    )
}

export default Home