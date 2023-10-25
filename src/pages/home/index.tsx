import { useEffect, useState } from 'react';
import './home.css';
import IRecord from '@/model/Record/IRecord';
import { useAppDispatch, useAppSelector } from '@/hook';
import { getAllRecordsOfUser, getRecord } from '@/actions/record';
import { useNavigate } from 'react-router-dom';

type Props = {
    userId: String | undefined;
}

const Home = ({ userId }: Props) => {
    const dispatch = useAppDispatch();
    const records = useAppSelector(state => state.userRecords);
    const navigate = useNavigate();


    const [userRecords, setUserRecords] = useState<IRecord[]>();



    useEffect(() => {
        if (userId)
            dispatch(getAllRecordsOfUser(userId))
    }, [userId])

    useEffect(() => {
        setUserRecords(records.records);
    }, [records])



    return (
        <div className='home'>

            {userId && <> <div className="upperCard">
                {userRecords ?
                    <>
                        {userRecords.map((record) => (
                            <button key={record._id} onClick={() =>
                                navigate(`${record._id.toString()}`, { replace: true })}  >
                                {record.name}
                            </button>
                        ))}
                    </> :
                    <h1>No Records Found for this user.</h1>}
            </div>

                <div className="lowerCard">
                    <div className="leftCard">
                        <h1>LEFT CARD HERE</h1>
                    </div>
                    <div className="rightCard">
                        <h1>RIGHT CARD HERE</h1>
                    </div>
                </div>
            </>}
        </div >
    )
}

export default Home