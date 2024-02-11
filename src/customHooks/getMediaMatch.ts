/* eslint-disable react-hooks/rules-of-hooks */
import { useMediaQuery } from '@mui/material'

export const getMediaMatch = (): boolean => {
  const match = useMediaQuery('(min-width: 700px', { noSsr: true })
  return match
}
