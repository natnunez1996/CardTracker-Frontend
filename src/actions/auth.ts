import { Dispatch } from 'redux';
import * as actionTypes from '../constants/actionTypes';
import * as API from '@/api';
import ISignUpFormData from '@/model/auth/ISignUpFormData';
import ISignInFormData from '@/model/auth/ISignInFormData';
import { NavigateFunction } from 'react-router-dom';


export const signIn = (signInFormData: ISignInFormData, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        const { data } = await API.signIn(signInFormData);

        dispatch({ type: actionTypes.AUTH, payload: data })


        navigate(`/${data.result._id}`, { replace: true })
        window.location.reload();

    } catch (error: any) {
        if (error.response.data) {
            const { message } = error.response.data
            dispatch({ type: actionTypes.INVALID_CREDENTIALS, payload: message })
        } else {
            console.log("No retrieved data from the server.");

        }
    }
}

export const signUp = (signUpFormData: ISignUpFormData, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        console.log(signUpFormData);

        const { data } = await API.signUp(signUpFormData);
        dispatch({ type: actionTypes.AUTH, payload: data });

        navigate('/', { replace: true });

    } catch (error: any) {
        if (error.response.data && error.response.data.message) {
            const { message } = error.response.data
            dispatch({ type: actionTypes.INVALID_CREDENTIALS, payload: message })
        } else {
            console.log("No retrieved data from the server.");

        }
    }
}


export const logout = (dispatch: Dispatch,) => {
    dispatch({ type: actionTypes.LOGOUT });
    window.location.reload();
}