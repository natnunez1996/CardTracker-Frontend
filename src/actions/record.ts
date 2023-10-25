import * as actionTypes from '@/constants/actionTypes';
import * as API from '@/api';
import IRecord from '@/model/Record/IRecord';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';


export const createRecord = (recordData: IRecord, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        console.log(recordData);

        const { data }: AxiosResponse = await API.createRecord(recordData);

        dispatch({ type: actionTypes.CREATERECORD, payload: data })

        navigate(`/${data._id}`, { replace: true })

    } catch (error) {
        console.log(error);

    }
}

export const getAllRecordsOfUser = (userId: String) => async (dispatch: Dispatch) => {
    try {
        const { data }: AxiosResponse = await API.getAllRecordsOfUser(userId);

        dispatch({ type: actionTypes.GETALLRECORDSOFUSER, payload: data })

        // navigate(`/${userId}`, { replace: true })

    } catch (error) {
        console.log(error);

    }
}


export const getRecord = (recordId: String) => async (dispatch: Dispatch) => {

    try {
        const { data }: AxiosResponse = await API.getRecord(recordId);

        dispatch({ type: actionTypes.GETRECORD, payload: data });

    } catch (error) {
        console.log(error);

    }
}

export const updateRecord = (updatedRecord: IRecord, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        const { data }: AxiosResponse = await API.updateRecord(updatedRecord._id.toString(), updatedRecord)

        dispatch({ type: actionTypes.UPDATERECORD, payload: data });

        navigate(`/home/${updatedRecord._id}`, { replace: true })


    } catch (error) {
        console.log(error);

    }
}