import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import moment from "moment"
import React, { useState } from "react"
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate } from "react-router-dom"
import { CardCategory, CardType, IRecord, IRecordItem } from "@/model/CardModel";

type Props = {
    amountEarnLoss: number
    inputDate: Date,
    record: IRecord,
    setEditedItemId: React.Dispatch<React.SetStateAction<String>>,
    setToDelete: React.Dispatch<React.SetStateAction<Boolean>>
    setToEdit: React.Dispatch<React.SetStateAction<Boolean>>,
    setUpdateDetails: React.Dispatch<React.SetStateAction<IRecord | undefined>>,
}

interface ListHeader {
    id: 'date' | 'detail' | 'amount' | 'category' | 'edit' | 'delete',
    label: string,
    minWidth: number,
    align?: 'center' | 'right',
    format?: (value: number) => string

}

const ListsDetails = ({
    amountEarnLoss,
    inputDate,
    record,
    setEditedItemId,
    setToDelete,
    setToEdit,
    setUpdateDetails
}: Props) => {

    //Setting the id of the list that is meant to be deleted.
    const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
    const navigate = useNavigate();

    const onEditCardDetail = (id: String) => {
        setEditedItemId(id);
        setToEdit(true);
    }

    const onDeleteCardDetail = (id: String) => {
        setUpdateDetails(prevState => {
            const updatedItemsList = prevState?.recordItemsList.filter(
                recordItem => { return recordItem.id !== id }
            )
            return {
                ...prevState,
                recordItemsList: updatedItemsList
            } as IRecord
        })

        setToDelete(prevState => !prevState);
    }

    const columnsHeader: ListHeader[] = [
        {
            id: 'date',
            label: "Date",
            minWidth: 170,
            align: 'center'
        },
        {
            id: 'detail',
            label: "Detail",
            minWidth: 170,
            align: 'center'
        },
        {
            id: 'amount',
            label: "Amount",
            minWidth: 170,
            align: 'right'
        },
        {
            id: 'category',
            label: "Category",
            minWidth: 170,
            align: 'center'
        },
        {
            id: 'edit',
            label: "",
            minWidth: 170,
            align: 'center'
        },
        {
            id: 'delete',
            label: "",
            minWidth: 170,
            align: 'center'
        }
    ]

    return (
        <TableContainer sx={{ maxHeight: "35vh" }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {
                            columnsHeader.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {   //If Card Type is Gift Card, disable the Add Button if the balance is less than or equal to 0
                                        column.id === 'delete' &&
                                            (record.recordType === CardType.GIFT_CARD ? amountEarnLoss > 0 : true) ?
                                            <Button onClick={() => navigate('newDetails')}>
                                                <NoteAddIcon /> New Data
                                            </Button> : column.label
                                    }
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        record.recordItemsList
                            .filter(item =>
                                item.date.getFullYear() === inputDate.getFullYear() &&
                                item.date.getMonth() === inputDate.getMonth())
                            .sort((a: IRecordItem, b: IRecordItem) => {
                                const dateA = new Date(a.date)
                                const dateB = new Date(b.date)
                                return dateB.getTime() - dateA.getTime()
                            })
                            .map((data) =>
                                <TableRow key={data.id.toString()}>
                                    <TableCell align="center">{`${moment(data.date).format("MMMM DD YYYY")}`}</TableCell>
                                    <TableCell align="center">{data.name}</TableCell>
                                    <TableCell align="right">{`$ ${(data.amount).toFixed(2)}`}</TableCell>
                                    <TableCell align="center">{data.category.charAt(0).toUpperCase() + data.category.slice(1)}</TableCell>
                                    <TableCell align="center">
                                        {
                                            record.recordType === CardType.GIFT_CARD && data.category === CardCategory.INCOME ?
                                                <Button disabled onClick={() => onEditCardDetail(data.id)}>Edit</Button>
                                                :
                                                <Button onClick={() => onEditCardDetail(data.id)}>Edit</Button>
                                        }
                                    </TableCell>
                                    {
                                        //If showConfirmDelete id === data.id, new buttons will show for confirmation.
                                        //Disable Delete Button if CardType === GIFTCARD && Cell Category === INCOME

                                        showConfirmDelete === data.id ?
                                            <TableCell sx={{ width: 268 }} align="center">
                                                <Button color="error" onClick={() => onDeleteCardDetail(data.id)}>DELETE</Button>
                                                <Button color="success" onClick={() => setShowConfirmDelete(null)}>Cancel</Button>
                                            </TableCell>
                                            : < TableCell sx={{ width: 268 }} align="center">
                                                {
                                                    record.recordType === CardType.GIFT_CARD && data.category === CardCategory.INCOME ?
                                                        <Button disabled color="error" onClick={() => setShowConfirmDelete(data.id.toString())}>
                                                            Delete
                                                        </Button> :
                                                        <Button color="error" onClick={() => setShowConfirmDelete(data.id.toString())}>
                                                            Delete
                                                        </Button>

                                                }
                                            </TableCell>
                                    }
                                </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer >
    )

}

export default ListsDetails