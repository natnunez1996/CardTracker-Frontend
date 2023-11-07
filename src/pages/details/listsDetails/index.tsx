import IRecord from "@/model/Record/IRecord"
import IRecordItem from "@/model/Record/IRecordItem"
import moment from "moment"

type Props = {
    record: IRecord,
    inputDate: Date,
    setEditedItemId: React.Dispatch<React.SetStateAction<String>>,
    setToEdit: React.Dispatch<React.SetStateAction<Boolean>>,
    setUpdateDetails: React.Dispatch<React.SetStateAction<IRecord | undefined>>,
    setToDelete: React.Dispatch<React.SetStateAction<Boolean>>
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

    return (
        <div>
            <table className="table-auto w-full text-center">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Detail</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
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
                                <tr key={data.id.toString()}>
                                    <td>{`${moment(data.date).format("MMMM DD YYYY")}`}</td>
                                    <td>{data.name}</td>
                                    <td>{`$${data.amount}`}</td>
                                    <td>{data.category.charAt(0).toUpperCase() + data.category.slice(1)}</td>
                                    <td><button onClick={() => onEditCardDetail(data.id)}>Edit</button></td>
                                    <td><button onClick={() => onDeleteCardDetail(data.id)}>Delete</button></td>
                                </tr>
                            )
                    }
                </tbody>
            </table></div>
    )
}

export default ListsDetails