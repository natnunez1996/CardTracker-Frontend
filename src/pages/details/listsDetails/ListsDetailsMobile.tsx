import ListItemDetailsPage from '@/common/ListItem/ListItemDetailsPage/ListItemDetailsPage'
import { CardType, IRecordItem, CardCategory, IRecord } from '@/model/CardModel'
import { capitalize } from '@/utils'
import { NoteAdd } from '@mui/icons-material'
import { TableContainer, Table, TableHead, TableRow, TableCell, Button, TableBody, ListItem, ListItemButton, ListItemText, ListSubheader, List, Collapse } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
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


const ListsDetailsMobile = ({
    amountEarnLoss,
    inputDateRecordList,
    navigate,
    onDeleteCardDetail,
    onEditCardDetail,
    record,
    setShowConfirmDelete,
    showConfirmDelete,
}: Props) => {



    return (
        <List sx={{ width: '100%' }}>
            <ListSubheader sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Card's Transactions
                <Button onClick={() => navigate('newDetails')} >
                    <NoteAdd /> Add New Data
                </Button>
            </ListSubheader>

            {
                inputDateRecordList.map(item =>
                    <ListItemDetailsPage
                        amountEarnLoss={amountEarnLoss}
                        item={item}
                        navigate={navigate}
                        onDeleteCardDetail={onDeleteCardDetail}
                        onEditCardDetail={onEditCardDetail}
                        record={record}
                        setShowConfirmDelete={setShowConfirmDelete}
                        showConfirmDelete={showConfirmDelete}
                        key={item.id}
                    />
                )
            }
        </List >
    )
}

export default ListsDetailsMobile