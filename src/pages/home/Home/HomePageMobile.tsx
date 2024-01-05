import { AddItemButton } from '@/common/Button';
import ListItem from '@/common/ListItem';
import { IRecord } from '@/model/CardModel';
import { calculateBalance } from '@/utils';
import { Box, Grid, Theme, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
    handleDelete: () => void,
    records: any,
    setRecordIdToDelete: React.Dispatch<React.SetStateAction<string | null>>,
    theme: Theme,
    userRecords: IRecord[]
}

const HomePageMobile = ({ handleDelete, setRecordIdToDelete, theme, userRecords }: Props) => {

    const navigate = useNavigate()


    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            justifyContent={'center'}
            sx={{
                backgroundColor: theme.palette.mode === 'dark'
                    ? theme.palette.background.default
                    : theme.palette.background.paper,
            }}
        >
            <AddItemButton />
            <List
                sx={{ width: '100%' }}
            >
                {userRecords.sort((a: IRecord, b: IRecord) => {
                    const dateA = new Date(a.updatedDate);
                    const dateB = new Date(b.updatedDate);
                    return dateB.getTime() - dateA.getTime();
                })
                    .map((record) => (
                        <Grid item key={record._id?.toString()}  >
                            <ListItem
                                calculateBalance={calculateBalance}
                                handleDelete={handleDelete}
                                navigate={navigate}
                                record={record}
                                setRecordIdToDelete={setRecordIdToDelete}
                                theme={theme}
                                key={record._id}
                            />
                        </Grid>
                    ))}
            </List>
        </Box >
    )
}

export default HomePageMobile