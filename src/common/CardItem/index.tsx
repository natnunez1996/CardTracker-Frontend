import IRecord from "@/model/Record/IRecord"
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Popper, Typography } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import DeleteIcon from '@mui/icons-material/Delete';
import { NavigateFunction } from "react-router-dom";


type Props = {
  record: IRecord,
  calculateBalance: (data: IRecord) => number,
  handleDelete: (recordId: string) => void
  navigate: NavigateFunction,
  anchorEl: HTMLElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  open: boolean
}

const CardItem = ({ record, calculateBalance, handleDelete, navigate, anchorEl, setAnchorEl, open }: Props) => {
  return (
    <Card sx={{ width: 200, maxWidth: 350 }} key={record._id}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: deepOrange[200] }}>CC</Avatar>}
        title={record.name}
      />
      <CardMedia
        image={`src/img/${record.recordType}`}
        sx={{ height: 150 }}
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
  )
}

export default CardItem