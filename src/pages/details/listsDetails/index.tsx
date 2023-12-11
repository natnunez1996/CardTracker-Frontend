import IRecord from "@/model/Record/IRecord"
import IRecordItem from "@/model/Record/IRecordItem"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import moment from "moment"
import React from "react"

type Props = {
    record: IRecord,
    inputDate: Date,
    setEditedItemId: React.Dispatch<React.SetStateAction<String>>,
    setToEdit: React.Dispatch<React.SetStateAction<Boolean>>,
    setUpdateDetails: React.Dispatch<React.SetStateAction<IRecord | undefined>>,
    setToDelete: React.Dispatch<React.SetStateAction<Boolean>>
}

interface ListHeader {
    id: 'date' | 'detail' | 'amount' | 'category' | 'edit' | 'delete',
    label: string,
    minWidth: number,
    align?: 'center' | 'right',
    format?: (value: number) => string

}

const ListsDetails = ({ inputDate, record, setEditedItemId, setToEdit, setToDelete, setUpdateDetails }: Props) => {

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

    //Header Content
    return (
        <TableContainer sx={{ maxHeight: "300px" }}>
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
                                    {column.label}
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
                                return dateA.getTime() - dateB.getTime()
                            })
                            .map((data) =>
                                <TableRow key={data.id.toString()}>
                                    <TableCell align="center">{`${moment(data.date).format("MMMM DD YYYY")}`}</TableCell>
                                    <TableCell align="center">{data.name}</TableCell>
                                    <TableCell align="right">{`$${data.amount}`}</TableCell>
                                    <TableCell align="center">{data.category.charAt(0).toUpperCase() + data.category.slice(1)}</TableCell>
                                    <TableCell align="center"><Button onClick={() => onEditCardDetail(data.id)}>Edit</Button></TableCell>
                                    <TableCell align="center"><Button color="error" onClick={() => onDeleteCardDetail(data.id)}>Delete</Button></TableCell>
                                </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default ListsDetails