import * as actionTypes from '@/constants/actionTypes';
import * as API from '@/api';
import IRecord from '@/model/Record/IRecord';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';


export const createRecord = (recordData: IRecord, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        const { data }: AxiosResponse = await API.createRecord(recordData);

        dispatch({ type: actionTypes.CREATERECORD, payload: data })

        navigate(`/home`, { replace: true })

    } catch (error) {
        console.log(error);

    }
}

export const deleteRecord = (recordId: string, navigate: NavigateFunction) => async (dispach: Dispatch) => {
    try {
        await API.deleteRecord(recordId)
        console.log(`DELETED ${recordId}`);


        navigate(`/home`, { replace: true });

    } catch (error) {
        console.log(error);

    }
}

export const getAllRecordsOfUser = (userId: String) => async (dispatch: Dispatch) => {
    try {
        const { data }: AxiosResponse = await API.getAllRecordsOfUser(userId);

        dispatch({ type: actionTypes.GETALLRECORDSOFUSER, payload: data })

    } catch (error) {
        console.log(error);

    }
}


export const getRecord = (userId: String, recordId: String) => async (dispatch: Dispatch) => {

    try {
        const { data }: AxiosResponse = await API.getRecord(userId, recordId);

        dispatch({ type: actionTypes.GETRECORD, payload: data });

    } catch (error: any) {
        console.log(error.response.data.message);

        if (error.response.data)
            dispatch({ type: actionTypes.SERVERERROR, payload: error.response.data })

    }
}

export const updateRecord = (updatedRecord: IRecord, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        const { data }: AxiosResponse = await API.updateRecord(updatedRecord._id.toString(), updatedRecord)
        console.log("UPDATED IN BACKEND");

        dispatch({ type: actionTypes.UPDATERECORD, payload: data });

        navigate(`/home/${updatedRecord._id}`, { replace: true })


    } catch (error) {
        console.log(error);

    }
}