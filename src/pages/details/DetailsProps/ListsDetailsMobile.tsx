import ListItemDetailsPage from '@/common/ListItem/ListItemDetailsPage/ListItemDetailsPage'
import { CardType } from '@/enums/ECard'
import { type IRecordItem, type IRecord } from '@/model/CardModel'
import { NoteAdd } from '@mui/icons-material'
import { Button, ListSubheader, List } from '@mui/material'
import { type NavigateFunction } from 'react-router-dom'
import React from 'react'

interface Props {
    inputDateRecordList: IRecordItem[] | never[]
    navigate: NavigateFunction
    onDeleteCardDetail: (id: string) => void
    onEditCardDetail: (id: string) => void
    record: IRecord
    setShowConfirmDelete: React.Dispatch<React.SetStateAction<string | null>>
    showConfirmDelete: string | null
    totalBalance: number
}

const ListsDetailsMobile = ({
    inputDateRecordList,
    navigate,
    onDeleteCardDetail,
    onEditCardDetail,
    record,
    setShowConfirmDelete,
    showConfirmDelete,
    totalBalance
}: Props) => {
    return (
        <List sx={{ width: '100%' }}>
            <ListSubheader sx={{ display: 'flex', justifyContent: 'space-between' }}>
                Card Transactions
                {
                    (totalBalance > 0 || record.recordType === CardType.CREDIT_CARD) &&
                    <Button onClick={() => { navigate('newDetails') }} >
                        <NoteAdd /> Add New Data
                    </Button>
                }
            </ListSubheader>

            {
                inputDateRecordList.map(item =>
                    <ListItemDetailsPage
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
