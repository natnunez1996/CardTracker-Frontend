import { useEffect, useState } from 'react';
import './home.css';
import IRecord from '@/model/Record/IRecord';
import { useAppDispatch, useAppSelector } from '@/hook';
import { deleteRecord, getAllRecordsOfUser } from '@/actions/record';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Popper, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import CardCategory from '@/model/Record/EcardCategory';
import DeleteIcon from '@mui/icons-material/Delete';

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
                    {userRecords ?
                        <>
                            {userRecords.map((record) => (
                                <Card sx={{ maxWidth: 350 }} key={record._id}>
                                    <CardHeader
                                        avatar={<Avatar sx={{ bgcolor: deepOrange[200] }}>CC</Avatar>}
                                        title={record.name}
                                    />
                                    <CardMedia
                                        image='src/img/td_credit.jpg'
                                        sx={{ height: 100 }}
                                    />
                                    <CardContent>
                                        <Typography variant='caption' color='text.secondary'>
                                            Balance: $ {calculateBalance(record).toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Button size='small' onClick={() => navigate(record._id!.toString(), { replace: true })}>Details</Button>
                                        <IconButton sx={{ marginLeft: 'auto' }} size='small' color='error' onClick={(event) => setAnchorEl(anchorEl ? null : event?.currentTarget)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <Popper id={record._id?.toString()} open={open} anchorEl={anchorEl}>
                                            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} >
                                                <Button color='error' onClick={() => { handleDelete(record._id!.toString()) }}> Delete </Button>
                                                <Button color='success' onClick={(event) => setAnchorEl(anchorEl ? null : event?.currentTarget)}> Cancel </Button>
                                            </Box>
                                        </Popper>
                                    </CardActions>

                                </Card>
                            ))}
                        </> :
                        <h1>No Records Found for this user.</h1>}
                </>
            }
        </div >
    )
}

export default Home