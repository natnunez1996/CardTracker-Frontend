import { AddItemButton } from '@/common/Button'
import CardItem from '@/common/CardItem'
import { type IRecord } from '@/model/CardModel'
import { Box, Grid, Typography, Popper, Button, type Theme } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  handleDelete: () => void
  records: any
  setRecordIdToDelete: React.Dispatch<React.SetStateAction<string | null>>
  theme: Theme
  userRecords: IRecord[]
}

const HomePageDesktop = ({ handleDelete, setRecordIdToDelete, theme, userRecords }: Props) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      justifyContent={'center'}
      sx={{
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : theme.palette.background.paper
      }}
    >
      <AddItemButton />
      <Box sx={{ margin: '1rem' }}>
        <Grid
          container spacing={2}
          justifyContent={'flex-start'}
          alignSelf={'center'}
        >
          {userRecords.sort((a: IRecord, b: IRecord) => {
            const dateA = new Date(a.updatedDate)
            const dateB = new Date(b.updatedDate)
            return dateB.getTime() - dateA.getTime()
          })
            .map((record) => (
              <Grid item key={record._id?.toString()} >
                <CardItem
                  anchorEl={anchorEl}
                  navigate={navigate}
                  record={record}
                  setAnchorEl={setAnchorEl}
                  setRecordIdToDelete={setRecordIdToDelete}
                />
              </Grid>
            ))}
        </Grid>
      </Box>

      <Popper open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} >
          <Typography variant='body1' sx={{ color: theme.palette.text.primary }}> Delete this Card?</Typography>
          <Button color='error' onClick={handleDelete}> DELETE </Button>
          <Button color='success' onClick={() => { setAnchorEl(null) }}> Cancel </Button>
        </Box>
      </Popper>
    </Box >
  )
}

export default HomePageDesktop
