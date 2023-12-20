import { SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch } from "@/hook";
import { useNavigate } from "react-router-dom";
import { createRecord } from "@/actions/record";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { IRecord, IRecordItem, CardCategory, CardType } from "@/model/CardModel";
import { NewRecordSelect, NewRecordTextField } from "@/common/NewRecordFormItems";

type Props = {}

const NewRecord = (props: Props) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { control, handleSubmit, watch } = useForm<IRecord>();

    const onSubmit: SubmitHandler<IRecord> = (data: IRecord) => {
        let userId: String = "";

        const storedData = localStorage.getItem("profile")

        if (storedData !== null) {
            const result = JSON.parse(storedData);
            userId = result.result._id;
        }

        const tempRecordItem: IRecordItem = {
            amount: data.initialAmount ?? 0,
            category: CardCategory.INCOME,
            date: new Date(),
            id: '1',
            name: "Gift Card's Initial Balance"
        }
        const newRecord: IRecord = {
            name: data.name,
            recordItemsList: [] as IRecordItem[],
            recordType: data.recordType,
            createdBy: userId,
            createdDate: new Date(),
            updatedDate: new Date(),
        }

        if (data.recordType === CardType.GIFT_CARD)
            newRecord.recordItemsList.push(tempRecordItem)

        dispatch(createRecord(newRecord, navigate));
    }


    const choices = (Object.keys(CardType) as Array<keyof typeof CardType>)


    return (
        <Box
            alignItems={'center'}
            display={'flex'}
            flexDirection={'column'}
            height={'100vh'}
            width={'100vw'}
        >
            <Container maxWidth="sm" sx={{ margin: '1rem' }} >
                <Paper variant="outlined" sx={{ padding: "1rem", borderRadius: '1rem', textAlign: 'center' }} >
                    <Typography variant="h5">New Card</Typography>
                    <form className="newRecordForm" onSubmit={handleSubmit(onSubmit)}>
                        <NewRecordTextField name={"name"} control={control} label={"Name"} />
                        <NewRecordSelect choices={choices} control={control} label={"Type of Card"} name="recordType" />
                        {
                            watch(['recordType']).toString() === CardType.GIFT_CARD &&
                            <NewRecordTextField control={control} label="Gift Card's Amount" name="initialAmount" type="number" />
                        }
                        <Button type="submit">Submit</Button>
                        <Button color="error" onClick={() => navigate('/home')}>Cancel</Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}

export default NewRecord