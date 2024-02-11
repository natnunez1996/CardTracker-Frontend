import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { deepOrange, green } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import { type NavigateFunction } from 'react-router-dom'
import React from 'react'
import { type IRecord } from '@/model/CardModel'
import { CardType } from '@/enums/ECard'
import creditCardImg from '@/assets/img/credit_card.jpg'
import giftCardImg from '@/assets/img/gift_card.jpg'
import { calculateBalance } from '@/utils'

interface Props {
  anchorEl: HTMLElement | null
  navigate: NavigateFunction
  record: IRecord
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  setRecordIdToDelete: React.Dispatch<React.SetStateAction<string | null>>
}

const CardItem = ({
  anchorEl,
  navigate,
  record,
  setAnchorEl,
  setRecordIdToDelete
}: Props) => {
  return (
    <Card sx={{ maxWidth: 300, minWidth: 200 }} key={record._id}>
      <CardHeader
        avatar={
          <Avatar sx={record.recordType === CardType.CREDIT_CARD ? { bgcolor: deepOrange[200] } : { bgcolor: green[200] }}>
            {record.recordType === CardType.CREDIT_CARD ? 'CC' : 'GC'}
          </Avatar>}
        title={record.name}
      />
      <CardMedia
        image={record.recordType === CardType.CREDIT_CARD ? creditCardImg : giftCardImg}
        sx={{ height: 150 }}
      />
      <CardContent>
        <Typography variant='caption' color='text.secondary'>
          Balance: $ {calculateBalance(record.recordItemsList).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size='small' onClick={() => {
          if (record._id !== undefined) {
            navigate(record._id.toString())
          }
        }}>Details</Button>
        <IconButton sx={{ marginLeft: 'auto' }} size='small' color='error'
          onClick={(event) => {
            setAnchorEl(anchorEl !== null ? null : event?.currentTarget)
            if (record._id !== undefined) {
              setRecordIdToDelete(record._id.toString())
            }
          }
          }>
          <DeleteIcon />
        </IconButton>
      </CardActions>

    </Card>
  )
}

export default CardItem
