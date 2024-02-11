import { type Dispatch } from 'redux'
import * as actionTypes from '../constants/actionTypes'
import * as API from '@/api'
import { type ISignInFormData, type ISignUpFormData } from '@/model/auth'
import { type NavigateFunction } from 'react-router-dom'
import { type IAccountSettings } from '@/model/auth/IAccountSettings'

export const isPasswordCorrect = (signInFormData: ISignInFormData) => async (dispatch: Dispatch) => {
  try {
    const { data } = await API.isPasswordCorrect(signInFormData)

    dispatch({ type: actionTypes.VALIDATE_PASSWORD, payload: data })
  } catch (error: any) {
    if (error.response.data !== null) {
      const { message } = error.response.data
      dispatch({ type: actionTypes.INVALID_CREDENTIALS, payload: message })
    } else {
      console.log('No retrieved data from the server.')
    }
  }
}

export const signIn = (signInFormData: ISignInFormData, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
  try {
    const { data } = await API.signIn(signInFormData)

    dispatch({ type: actionTypes.AUTH, payload: data })

    navigate('/', { replace: true })
    window.location.reload()
  } catch (error: any) {
    if (error.response.data !== null) {
      const { message } = error.response.data
      dispatch({ type: actionTypes.INVALID_CREDENTIALS, payload: message })
    } else {
      console.log('No retrieved data from the server.')
    }
  }
}

export const signUp = (signUpFormData: ISignUpFormData, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
  try {
    const { data } = await API.signUp(signUpFormData)
    dispatch({ type: actionTypes.AUTH, payload: data })

    navigate('/', { replace: true })
  } catch (error: any) {
    if (error.response.data.message !== null) {
      const { message } = error.response.data
      dispatch({ type: actionTypes.INVALID_CREDENTIALS, payload: message })
    } else {
      console.log('No retrieved data from the server.')
    }
  }
}

export const updateUser = (
  id: string,
  email: string,
  valueType: keyof IAccountSettings | null,
  value: IAccountSettings[keyof IAccountSettings] | null
) => async (dispatch: Dispatch) => {
  try {
    if (valueType === null || value === null) { throw new Error('valueType or value is null ') }

    const { data } = await API.updateUser(id, email, valueType, value)

    dispatch({ type: actionTypes.AUTH, payload: data })

    window.location.reload()
  } catch (error: any) {
    console.error('Error:', error)
    if (error.response.data.message !== null) {
      const { message } = error.response.data
      console.log('Error Message:', message)
      dispatch({ type: actionTypes.INVALID_CREDENTIALS, payload: message })
    } else if (error.response.data.specialMessage !== null) {
      const { specialMessage } = error.response.data
      dispatch({ type: actionTypes.UPDATEPASSWORDMESSAGE, payload: specialMessage })
    } else {
      console.log('No retrieved data from the server while updating.', error)
    }
  }
}

export const logout = (dispatch: Dispatch): void => {
  dispatch({ type: actionTypes.LOGOUT })
}
