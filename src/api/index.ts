import axios, { type AxiosPromise, type AxiosInstance } from 'axios'
import { type ISignInFormData, type ISignUpFormData } from '@/model/auth'
import { type IRecord } from '@/model/CardModel'
import { type IAccountSettings } from '@/model/auth/IAccountSettings'

const API: AxiosInstance = axios.create({
  baseURL: 'https://card-tracker-backend.cyclic.app/'
})

// Record
export const createRecord = async (recordData: IRecord): AxiosPromise<IRecord> => await API.post('/record', recordData)

export const getAllRecordsOfUser = async (userId: string): AxiosPromise<IRecord[]> => await API.get(`/record/${userId}`)

export const getRecord = async (userId: string, recordId: string): AxiosPromise<IRecord> => await API.get(`/record/details/${userId}/${recordId}`)
export const updateRecord = async (recordId: string, updatedRecord: IRecord): AxiosPromise<IRecord> => await API.patch(`/record/details/${recordId}`, updatedRecord)
export const deleteRecord = async (recordId: string): AxiosPromise<string> => await API.delete(`/record/details/${recordId}`)

// Auth
export const isPasswordCorrect = async (signInFormData: ISignInFormData): AxiosPromise<any> => await API.post('/account/passwordValidation', signInFormData)
export const signUp = async (signUpFormData: ISignUpFormData): AxiosPromise<ISignInFormData> => await API.post('/signUp', signUpFormData)
export const signIn = async (signInFormData: ISignInFormData): AxiosPromise<any> => await API.post('/signIn', signInFormData)
export const updateUser = async (
  id: string,
  email: IAccountSettings['email'],
  valueType: keyof IAccountSettings,
  value: IAccountSettings[keyof IAccountSettings]
): AxiosPromise<any> => await API.patch(`/account/update/${id}`, { email, valueType, value })
