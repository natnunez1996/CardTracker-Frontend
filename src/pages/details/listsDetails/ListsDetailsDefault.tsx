import { CardType, IRecordItem, CardCategory, IRecord } from '@/model/CardModel'
import { NoteAdd } from '@mui/icons-material'
import { TableContainer, Table, TableHead, TableRow, TableCell, Button, TableBody } from '@mui/material'
import moment from 'moment'
import { NavigateFunction } from 'react-router-dom'

type Props = {
    amountEarnLoss: number
    inputDateRecordList: IRecordItem[] | never[],
    navigate: NavigateFunction,
    onDeleteCardDetail: (id: string) => void,
    onEditCardDetail: (id: string) => void,
    record: IRecord,
    setShowConfirmDelete: React.Dispatch<React.SetStateAction<string | null>>,
    showConfirmDelete: string | null
}

interface ListHeader {
    id: 'date' | 'detail' | 'amount' | 'category' | 'edit' | 'delete',
    label: string,
    minWidth: number,
    align?: 'center' | 'right',
}

const ListsDetailsDefault = ({
    amountEarnLoss,
    inputDateRecordList,
    navigate,
    onDeleteCardDetail,
    onEditCardDetail,
    record,
    setShowConfirmDelete,
    showConfirmDelete,
}: Props) => {


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
                                                <NoteAdd /> New Data
                                            </Button> : column.label
                                    }
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        inputDateRecordList
                            .map((item) =>
                                <TableRow key={item.id}>
                                    <TableCell align="center">{`${moment(item.date).format("MMMM DD YYYY")}`}</TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="right">{`$ ${(item.amount).toFixed(2)}`}</TableCell>
                                    <TableCell align="center">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            disabled={record.recordType === CardType.GIFT_CARD && item.category === CardCategory.INCOME}
                                            onClick={() => onEditCardDetail(item.id)}
                                        >Edit</Button>
                                    </TableCell>
                                    {
                                        //If showConfirmDelete id === item.id, new buttons will show for confirmation.
                                        //Disable Delete Button if CardType === GIFTCARD && Cell Category === INCOME

                                        showConfirmDelete === item.id ?
                                            <TableCell sx={{ width: 268 }} align="center">
                                                <Button color="error" onClick={() => onDeleteCardDetail(item.id)}>DELETE</Button>
                                                <Button color="success" onClick={() => setShowConfirmDelete(null)}>Cancel</Button>
                                            </TableCell>
                                            : < TableCell sx={{ width: 268 }} align="center">
                                                <Button
                                                    color="error"
                                                    disabled={record.recordType === CardType.GIFT_CARD && item.category === CardCategory.INCOME}
                                                    onClick={() => setShowConfirmDelete(item.id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                    }
                                </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default ListsDetailsDefault