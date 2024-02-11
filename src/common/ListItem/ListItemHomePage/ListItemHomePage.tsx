import { CardType } from '@/enums/ECard'
import { type IRecord, type IRecordItem } from '@/model/CardModel'
import { capitalize } from '@/utils'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Avatar, Collapse, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, type Theme } from '@mui/material'
import { deepOrange, green } from '@mui/material/colors'
import React, { useState } from 'react'
import { type NavigateFunction } from 'react-router-dom'

interface Props {
    calculateBalance: (data: IRecordItem[]) => number
    handleDelete: () => void
    navigate: NavigateFunction
    record: IRecord
    setRecordIdToDelete: React.Dispatch<React.SetStateAction<string | null>>
    theme: Theme
}

const ListItemHomePage = ({
    calculateBalance,
    handleDelete,
    navigate,
    record,
    setRecordIdToDelete,
    theme
}: Props) => {
    const color = theme.palette.text.primary
    const [open, setOpen] = useState<boolean>(false)
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false)

    const handleOpen = (): void => {
        setOpen(prevState => !prevState)
    }

    const deleteConfirmOpen = (): void => { setDeleteConfirm(true) }
    const deleteConfirmCancel = (): void => { setDeleteConfirm(false) }

    return (
        <>
            <ListItemButton onClick={handleOpen} key={record._id}>
                <ListItemAvatar>
                    <Avatar sx={record.recordType === CardType.CREDIT_CARD ? { bgcolor: deepOrange[200] } : { bgcolor: green[200] }}>
                        {record.recordType === CardType.CREDIT_CARD ? 'CC' : 'GC'}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${capitalize(record.name)}`}
                    secondary={`Current Balance: $ ${calculateBalance(record.recordItemsList).toFixed(2)}`}
                    sx={{ color }}
                />
                {open ? <ExpandLess sx={{ color }} /> : <ExpandMore sx={{ color }} />}
            </ListItemButton>
            <Collapse in={open}>
                {deleteConfirm
                    ? <>
                        <ListSubheader>Are you sure you want to delete this card?</ListSubheader>
                        <ListItemButton onClick={deleteConfirmCancel}>
                            <ListItemText
                                primary={'Cancel'}
                                sx={{ color: theme.palette.success.main }}
                            />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            if (record._id !== undefined) {
                                setRecordIdToDelete(record._id.toString())
                            }
                            handleDelete()
                        }}>
                            <ListItemText sx={{ color: theme.palette.error.main }} primary={'Delete'} />
                        </ListItemButton>
                    </>
                    : <>
                        <ListItemButton onClick={() => {
                            if (record._id !== undefined) {
                                navigate(record._id.toString())
                            }
                        }}>
                            <ListItemText sx={{ color }} primary={'More Info'} />
                        </ListItemButton>
                        <ListItemButton onClick={deleteConfirmOpen}>
                            <ListItemText sx={{ color: theme.palette.error.main }} primary={'Delete'} />
                        </ListItemButton>
                    </>
                }

            </Collapse>
        </>
    )
}

export default ListItemHomePage
