import { CreditCardTwoTone } from '@mui/icons-material'
import { Paper, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export const AddItemButton = () => {
    const navigate = useNavigate()

    return (
        <Paper elevation={3} sx={{ height: 50, alignSelf: 'center', margin: '1rem' }}>
            <IconButton color='primary' onClick={() => navigate('/newRecord', { replace: true })}>
                Add Card <CreditCardTwoTone />
            </IconButton>
        </Paper>
    )
}

