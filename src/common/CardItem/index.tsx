import IRecord from "@/model/Record/IRecord"
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Popper, Typography } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import DeleteIcon from '@mui/icons-material/Delete';
import { NavigateFunction } from "react-router-dom";
import React from "react";


type Props = {
  anchorEl: HTMLElement | null,
  calculateBalance: (data: IRecord) => number,
  navigate: NavigateFunction,
  record: IRecord,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  setRecordIdToDelete: React.Dispatch<React.SetStateAction<string | null>>
}

const CardItem = ({
  anchorEl,
  calculateBalance,
  navigate,
  record,
  setAnchorEl,
  setRecordIdToDelete
}: Props) => {


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
        <IconButton sx={{ marginLeft: 'auto' }} size='small' color='error'
          onClick={(event) => {
            setAnchorEl(anchorEl ? null : event?.currentTarget)
            setRecordIdToDelete(record._id!.toString())
          }
          }>
          <DeleteIcon />
        </IconButton>
      </CardActions>

    </Card>
  )
}

export default CardItem