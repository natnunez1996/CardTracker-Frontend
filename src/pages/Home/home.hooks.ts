import { getAllRecordsOfUser } from '@/actions/record'
import { useAppDispatch } from '@/hook'
import { type IRecord } from '@/model/CardModel'
import { useEffect } from 'react'
import { type NavigateFunction } from 'react-router-dom'
import React from 'react'

interface Props {
  navigate: NavigateFunction
  records: any
  reload: boolean
  setUserRecords: React.Dispatch<React.SetStateAction<IRecord[] | null>>
  userId: string | null
}

export const useHomePage = ({ navigate, records, reload, setUserRecords, userId }: Props): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Navigate to Log In if there is no user logged in.
    if (userId === undefined) {
      navigate('/login', { replace: true })
    }
  }, [userId, navigate])

  useEffect(() => {
    localStorage.removeItem('lastKnownInputDate')

    if (userId !== undefined && userId !== null) { dispatch(getAllRecordsOfUser(userId)) }
  }, [userId, dispatch, reload])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUserRecords(prevState => [...records.records])
  }, [records, setUserRecords])
}
