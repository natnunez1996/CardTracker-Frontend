import { useAppDispatch, useAppSelector } from '@/hook';
import { useState } from 'react';
import { deleteRecord } from '@/actions/record';
import { useNavigate } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';
import { IRecord } from '@/model/CardModel';
import { getMediaMatch } from '@/customHooks';
import { useHomePage } from './home.hooks';
import HomePage from './Home/HomePage';
import HomePageMobile from './Home/HomePageMobile';

type Props = {
    userId: string;
}

const Home = ({ userId }: Props) => {
    const dispatch = useAppDispatch();
    const match = getMediaMatch();
    const navigate = useNavigate();
    const theme = useTheme()
    const records = useAppSelector(state => state.userRecords);

    const [userRecords, setUserRecords] = useState<IRecord[] | null>(null);
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
        <>
            {userRecords && userRecords.length > 0 ?
                (
                    match ?
                        <HomePage
                            handleDelete={handleDelete}
                            records={records}
                            setRecordIdToDelete={setRecordIdToDelete}
                            theme={theme}
                            userRecords={userRecords}
                        />
                        :
                        <HomePageMobile
                            handleDelete={handleDelete}
                            records={records}
                            setRecordIdToDelete={setRecordIdToDelete}
                            theme={theme}
                            userRecords={userRecords}
                        />)
                :
                <Typography variant='h2' sx={{ color: 'red' }} alignSelf={'center'}>
                    {records.message}
                </Typography>
            }
        </>
    )
}

export default Home