import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IRecord, IRecordItem } from "@/model/CardModel";
import ListsDetailsDefault from "./ListsDetailsDefault";
import { getMediaMatch } from "@/customHooks";
import ListsDetailsMobile from "./ListsDetailsMobile";

type Props = {
    amountEarnLoss: number
    inputDateRecordList: IRecordItem[],
    record: IRecord,
    setEditedItemId: React.Dispatch<React.SetStateAction<string>>,
    setToDelete: React.Dispatch<React.SetStateAction<boolean>>
    setToEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setUpdateDetails: React.Dispatch<React.SetStateAction<IRecord | undefined>>,
}



const ListsDetails = ({
    amountEarnLoss,
    inputDateRecordList,
    record,
    setEditedItemId,
    setToDelete,
    setToEdit,
    setUpdateDetails
}: Props) => {

    //Setting the id of the list that is meant to be deleted.
    const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
    const match = getMediaMatch();
    const navigate = useNavigate();

    const onEditCardDetail = (id: string) => {
        setEditedItemId(id);
        setToEdit(true);
    }

    const onDeleteCardDetail = (id: string) => {
        setUpdateDetails(prevState => {
            const updatedItemsList = prevState?.recordItemsList.filter(
                recordItem => { return recordItem.id !== id }
            )
            return {
                ...prevState,
                recordItemsList: updatedItemsList,
                updatedDate: new Date()
            } as IRecord
        })

        setToDelete(prevState => !prevState);
    }


    return (
        <>
            {match ?
                <ListsDetailsDefault
                    amountEarnLoss={amountEarnLoss}
                    inputDateRecordList={inputDateRecordList}
                    navigate={navigate}
                    onDeleteCardDetail={onDeleteCardDetail}
                    onEditCardDetail={onEditCardDetail}
                    record={record}
                    setShowConfirmDelete={setShowConfirmDelete}
                    showConfirmDelete={showConfirmDelete}
                />
                :
                <ListsDetailsMobile
                    amountEarnLoss={amountEarnLoss}
                    inputDateRecordList={inputDateRecordList}
                    navigate={navigate}
                    onDeleteCardDetail={onDeleteCardDetail}
                    onEditCardDetail={onEditCardDetail}
                    record={record}
                    setShowConfirmDelete={setShowConfirmDelete}
                    showConfirmDelete={showConfirmDelete}
                />
            }
        </>
    )

}

export default ListsDetails