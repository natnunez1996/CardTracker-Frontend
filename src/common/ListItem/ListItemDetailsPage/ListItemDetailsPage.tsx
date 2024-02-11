import { CardType, CardCategory } from '@/enums/ECard'
import { type IRecordItem, type IRecord } from '@/model/CardModel'
import { Button, Collapse, ListItem, ListItemButton, ListItemText, capitalize } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import { type NavigateFunction } from 'react-router-dom'

interface Props {
    item: IRecordItem
    navigate: NavigateFunction
    onDeleteCardDetail: (id: string) => void
    onEditCardDetail: (id: string) => void
    record: IRecord
    setShowConfirmDelete: React.Dispatch<React.SetStateAction<string | null>>
    showConfirmDelete: string | null
}

const ListItemDetailsPage = ({
    item,
    record,
    onDeleteCardDetail,
    onEditCardDetail,
    setShowConfirmDelete,
    showConfirmDelete
}: Props) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <ListItem
            alignItems='flex-start'
            divider
            key={item.id}
            secondaryAction={
                showConfirmDelete === item.id
                    ? <>
                        <Button color="error" onClick={() => { onDeleteCardDetail(item.id) }}>DELETE</Button>
                        <Button color="success" onClick={() => { setShowConfirmDelete(null) }}>Cancel</Button>
                    </>
                    : <>
                        <Button
                            disabled={record.recordType === CardType.GIFT_CARD && item.category === CardCategory.INCOME}
                            onClick={() => { onEditCardDetail(item.id) }}
                        >Edit
                        </Button>
                        <Button
                            color="error"
                            disabled={record.recordType === CardType.GIFT_CARD && item.category === CardCategory.INCOME}
                            onClick={() => { setShowConfirmDelete(item.id) }}
                        >DELETE
                        </Button>
                    </>

            }
            sx={{ flexDirection: 'column', width: '100%' }}
        >
            <ListItemButton onClick={() => { setOpen(prevState => !prevState) }} sx={{ width: '100%' }} >
                <ListItemText
                    primary={item.name}
                    secondary={`${moment(item.date).format('MMMM DD YYYY')}`}
                />
            </ListItemButton>
            <Collapse in={open}>
                <ListItemText
                    primary={`$ ${(item.amount).toFixed(2)}`}
                    secondary={capitalize(item.category)}
                    sx={{ margin: '1rem' }}
                />
            </Collapse>
        </ListItem>
    )
}

export default ListItemDetailsPage
