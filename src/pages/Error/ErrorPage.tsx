import { useAppSelector } from '@/hook'
import { Box, Typography, useTheme } from '@mui/material'

const ErrorPage = () => {
  const errorMessage = useAppSelector(state => state.userRecords.message)

  const theme = useTheme()

  return (
    <Box width={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Typography color={theme.palette.text.primary} variant='h3'>OOPS! Something went wrong.</Typography>
      <Typography color={theme.palette.text.primary} variant='h5'>{errorMessage === '' ? <>Please <a href='/login'>Log in</a> First.</> : errorMessage}</Typography>
    </Box>
  )
}

export default ErrorPage
