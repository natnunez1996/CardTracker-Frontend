import { CardType, IRecord } from "@/model/CardModel"
import { capitalize } from "@/utils"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Avatar, Collapse, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Theme } from "@mui/material"
import { deepOrange, green } from "@mui/material/colors"
import { useState } from "react"
import { NavigateFunction } from "react-router-dom"


type Props = {
    calculateBalance: (data: IRecord) => number,
    handleDelete: () => void,
    navigate: NavigateFunction,
    record: IRecord,
    setRecordIdToDelete: React.Dispatch<React.SetStateAction<string | null>>,
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
    const [open, setOpen] = useState<boolean>(false);
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(prevState => !prevState)
    }

    const deleteConfirmOpen = () => setDeleteConfirm(true)
    const deleteConfirmCancel = () => setDeleteConfirm(false)


    return (
        <>
            <ListItemButton onClick={handleOpen} key={record._id}>
                <ListItemAvatar>
                    <Avatar sx={record.recordType === CardType.CREDIT_CARD ? { bgcolor: deepOrange[200] } : { bgcolor: green[200] }}>
                        {record.recordType === CardType.CREDIT_CARD ? 'CC' : 'GC'}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText sx={{ color }} primary={`${capitalize(record.name)}`} />
                {open ? <ExpandLess sx={{ color }} /> : <ExpandMore sx={{ color }} />}
            </ListItemButton>
            <Collapse in={open}>
                {deleteConfirm ?
                    <>
                        <ListSubheader>Are you sure you want to delete this card?</ListSubheader>
                        <ListItemButton onClick={deleteConfirmCancel}>
                            <ListItemText sx={{ color: theme.palette.success.main }} primary={"Cancel"} />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            setRecordIdToDelete(record._id!.toString())
                            handleDelete()
                        }}>
                            <ListItemText sx={{ color: theme.palette.error.main }} primary={"Delete"} />
                        </ListItemButton>
                    </> :
                    <>
                        <ListSubheader>{`Current Balance: $ ${calculateBalance(record).toFixed(2)}`} </ListSubheader>
                        <ListItemButton onClick={() => navigate(record._id!.toString())}>
                            <ListItemText sx={{ color }} primary={"More Info"} />
                        </ListItemButton>
                        <ListItemButton onClick={deleteConfirmOpen}>
                            <ListItemText sx={{ color: theme.palette.error.main }} primary={"Delete"} />
                        </ListItemButton>
                    </>
                }

            </Collapse>
        </>
    )
}

export default ListItemHomePage