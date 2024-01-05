import { AddItemButton } from '@/common/Button';
import CardItem from '@/common/CardItem';
import { IRecord } from '@/model/CardModel';
import { calculateBalance } from '@/utils';
import { Box, Grid, Typography, Popper, Button, Theme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    handleDelete: () => void,
    records: any,
    setRecordIdToDelete: React.Dispatch<React.SetStateAction<string | null>>,
    theme: Theme,
    userRecords: IRecord[],
}

const HomePage = ({ handleDelete, setRecordIdToDelete, theme, userRecords }: Props) => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


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


            <Popper open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} >
                    <Typography variant='body1' sx={{ color: theme.palette.text.primary }}> Delete this Card?</Typography>
                    <Button color='error' onClick={handleDelete}> DELETE </Button>
                    <Button color='success' onClick={() => setAnchorEl(null)}> Cancel </Button>
                </Box>
            </Popper>
        </Box >
    )
}

export default HomePage