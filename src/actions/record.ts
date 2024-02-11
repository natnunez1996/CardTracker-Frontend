import * as actionTypes from '@/constants/actionTypes'
import * as API from '@/api'
import { type NavigateFunction } from 'react-router-dom'
import { type Dispatch } from 'redux'
import axios, { type AxiosResponse } from 'axios'
import { type IRecord } from '@/model/CardModel'

export const createRecord = (recordData: IRecord, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
  try {
    const { data }: AxiosResponse = await API.createRecord(recordData)

    dispatch({ type: actionTypes.CREATERECORD, payload: data })

    navigate('/home', { replace: true })
  } catch (error) {
    console.log(error)
  }
}

export const deleteRecord = (recordId: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
  try {
    const { data }: AxiosResponse = await API.deleteRecord(recordId)

    dispatch({ type: actionTypes.DELETERECORD, payload: data })
    navigate('/home', { replace: true })
  } catch (error) {
    console.log(error)
  }
}

export const getAllRecordsOfUser = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const { data }: AxiosResponse = await API.getAllRecordsOfUser(userId)

    dispatch({ type: actionTypes.GETALLRECORDSOFUSER, payload: data })
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response !== undefined) {
        const { message } = error.response.data
        dispatch({ type: actionTypes.SERVERERROR, payload: message })
      }
    }
  }
}

export const getRecord = (userId: string, recordId: string) => async (dispatch: Dispatch) => {
  try {
    const { data }: AxiosResponse = await API.getRecord(userId, recordId)

    dispatch({ type: actionTypes.GETRECORD, payload: data })
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response !== undefined) {
        dispatch({ type: actionTypes.SERVERERROR, payload: error.response.data })
      }
    }
  }
}

export const updateRecord = (updatedRecord: IRecord, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
  try {
    if (updatedRecord._id === undefined) throw new Error('No id')
    const { data }: AxiosResponse = await API.updateRecord(updatedRecord._id.toString(), updatedRecord)

    dispatch({ type: actionTypes.UPDATERECORD, payload: data })

    navigate(`/home/${updatedRecord._id}`, { replace: true })
  } catch (error) {
    console.log(error)
  }
}
