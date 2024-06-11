import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type IRecord, type IRecordItem } from '@/model/CardModel'
import { getMediaMatch } from '@/customHooks'
import ListsDetailsDefault from './ListsDetailsDefault'
import ListsDetailsMobile from './ListsDetailsMobile'

interface Props {
  amountEarnLoss: number
  inputDateRecordList: IRecordItem[]
  record: IRecord
  setEditedItemId: React.Dispatch<React.SetStateAction<string>>
  setToDelete: React.Dispatch<React.SetStateAction<boolean>>
  setToEdit: React.Dispatch<React.SetStateAction<boolean>>
  setUpdateDetails: React.Dispatch<React.SetStateAction<IRecord | undefined>>,
  totalBalance: number
}

const ListsDetails = ({
  inputDateRecordList,
  record,
  setEditedItemId,
  setToDelete,
  setToEdit,
  setUpdateDetails,
  totalBalance
}: Props) => {
  // Setting the id of the list that is meant to be deleted.
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null)
  const match = getMediaMatch()
  const navigate = useNavigate()

  const onEditCardDetail = (id: string): void => {
    setEditedItemId(id)
    setToEdit(true)
  }

  const onDeleteCardDetail = (id: string): void => {
    setUpdateDetails(prevState => {
      if (prevState !== undefined) {
        const updatedItemsList = prevState?.recordItemsList.filter(
          recordItem => { return recordItem.id !== id }
        )

        prevState.recordItemsList = updatedItemsList
        prevState.updatedDate = new Date()
        return prevState
      }
    })

    setToDelete(prevState => !prevState)
  }

  return (
    <>
      {match
        ? <ListsDetailsDefault
          inputDateRecordList={inputDateRecordList}
          navigate={navigate}
          onDeleteCardDetail={onDeleteCardDetail}
          onEditCardDetail={onEditCardDetail}
          record={record}
          setShowConfirmDelete={setShowConfirmDelete}
          showConfirmDelete={showConfirmDelete}
          totalBalance={totalBalance}
        />
        : <ListsDetailsMobile
          inputDateRecordList={inputDateRecordList}
          navigate={navigate}
          onDeleteCardDetail={onDeleteCardDetail}
          onEditCardDetail={onEditCardDetail}
          record={record}
          setShowConfirmDelete={setShowConfirmDelete}
          showConfirmDelete={showConfirmDelete}
          totalBalance={totalBalance}
        />
      }
    </>
  )
}

export default ListsDetails
