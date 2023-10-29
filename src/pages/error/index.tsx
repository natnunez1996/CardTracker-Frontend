import { useAppSelector } from '@/hook'
import './error.css'

type Props = {
    userId: String | undefined
}

const Error = ({ userId }: Props) => {
    const errorMessage = useAppSelector(state => state.userRecords.message)

    return (
        <div className='errorContainer'>
            <h1>OOOPS! Something Went Wrong...</h1>

            <h2>{errorMessage}</h2>
        </div>
    )
}

export default Error