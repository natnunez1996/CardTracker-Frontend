/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Container, Paper, Typography, Button } from '@mui/material'
import { type Control, type SubmitHandler, type UseFormHandleSubmit } from 'react-hook-form'
import { type NavigateFunction } from 'react-router-dom'
import { type IRecordItem } from '@/model/CardModel'
import { NewRecordItemTextField, NewRecordItemDateField, NewRecordItemSelect } from '../NewRecordItemFormItems'
import { type CardCategory } from '@/enums/ECard'

interface Props {
  cardType?: string
  choices: Array<keyof typeof CardCategory>
  control: Control<IRecordItem>
  handleSubmit: UseFormHandleSubmit<IRecordItem>
  navigate: NavigateFunction
  onCancelEdit?: () => void
  onSubmit: SubmitHandler<IRecordItem>
}

const RecordItemForm = ({ cardType, choices, control, handleSubmit, navigate, onCancelEdit, onSubmit }: Props) => {
  return (
    <Box
      alignItems={'center'}
      display={'flex'}
      flexDirection={'column'}
      height={'100vh'}
      width={'100%'}
    >
      <Container maxWidth="sm" sx={{ margin: '1rem' }} >
        <Paper variant="outlined" sx={{ padding: '1rem', borderRadius: '1rem', textAlign: 'center' }} >
          <Typography variant="h5">New Transaction</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <NewRecordItemTextField control={control} name="name" label="Transaction Name" />
            <NewRecordItemTextField control={control} name="amount" label="Amount" />
            <NewRecordItemDateField control={control} name="date" label="Date" />
            <NewRecordItemSelect cardType={cardType} control={control} name="category" label="Category" choices={choices} />
            <Button type="submit">Submit</Button>
            <Button color="error" onClick={() => {
              onCancelEdit !== undefined
                ? onCancelEdit()
                : navigate(-1)
            }}>Cancel</Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default RecordItemForm
