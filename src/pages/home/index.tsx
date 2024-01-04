import { useAppDispatch, useAppSelector } from '@/hook';
import { useEffect, useState } from 'react';
import { deleteRecord, getAllRecordsOfUser } from '@/actions/record';
import { useNavigate } from 'react-router-dom';
import CardItem from '@/common/CardItem';
import { Paper, IconButton, Popper, Box, Button, Grid, useTheme, Typography } from '@mui/material';
import { IRecord } from '@/model/CardModel';
import { CreditCardTwoTone } from '@mui/icons-material';
import { calculateBalance } from '@/utils';
import { getMediaMatch } from '@/customHooks';
import { useHomePage } from './home.hooks';

type Props = {
    userId: string | null;
}

const Home = ({ userId }: Props) => {
    const dispatch = useAppDispatch();
    const match = getMediaMatch();
    const navigate = useNavigate();
    const theme = useTheme()
    const records = useAppSelector(state => state.userRecords);

    const [userRecords, setUserRecords] = useState<IRecord[]>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [recordIdToDelete, setRecordIdToDelete] = useState<string | null>(null);
    const [reload, setReload] = useState(true);

    const handleDelete = () => {
        if (recordIdToDelete) {
            dispatch(deleteRecord(recordIdToDelete, navigate))
            setReload(prevState => !prevState)
        }
    }

    useHomePage({ navigate, records, reload, setUserRecords, userId })



    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            sx={{
                backgroundColor: theme.palette.mode === 'dark'
                    ? theme.palette.background.default
                    : theme.palette.background.paper,
            }}
        >
            {userId &&
                <>
                    <Paper elevation={3} sx={{ height: 50, alignSelf: 'center', margin: '1rem' }}>
                        <IconButton color='primary' onClick={() => navigate('/newRecord', { replace: true })}>
                            Add Card <CreditCardTwoTone />
                        </IconButton>
                    </Paper>
                    {userRecords && userRecords.length > 0 ?
                        <Grid
                            container spacing={2}
                            justifyContent={'flex-start'}
                            alignSelf={'center'}
                        >
                            {userRecords.sort((a: IRecord, b: IRecord) => {
                                const dateA = new Date(a.updatedDate);
                                const dateB = new Date(b.updatedDate);
                                return dateB.getTime() - dateA.getTime();
                            })
                                .map((record) => (
                                    <Grid item key={record._id?.toString()}  >
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
                        <Typography variant='h2' sx={{ color: 'red' }} alignSelf={'center'}>
                            {records.message}
                        </Typography>}

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