import axios, { AxiosInstance } from "axios";
import { ISignInFormData, ISignUpFormData } from '@/model/auth';
import { IRecord } from "@/model/CardModel";
import { IAccountSettings } from "@/model/auth/IAccountSettings";




const API: AxiosInstance = axios.create({
    baseURL: 'https://card-tracker-backend.cyclic.app/'
})

//Record
export const createRecord = (recordData: IRecord) => API.post('/record', recordData);

export const getAllRecordsOfUser = (userId: String) => API.get(`/record/${userId}`);

export const getRecord = (userId: String, recordId: String) => API.get(`/record/details/${userId}/${recordId}`);
export const updateRecord = (recordId: String, updatedRecord: IRecord) => API.patch(`/record/details/${recordId}`, updatedRecord)
export const deleteRecord = (recordId: String) => API.delete(`/record/details/${recordId}`)

//Auth
export const isPasswordCorrect = (signInFormData: ISignInFormData) => API.post('/account/passwordValidation', signInFormData)
export const signUp = (signUpFormData: ISignUpFormData) => API.post(`/signUp`, signUpFormData);
export const signIn = (signInFormData: ISignInFormData) => API.post(`/signIn`, signInFormData);
export const updateUser = (
    id: string,
    email: IAccountSettings['email'],
    valueType: keyof IAccountSettings,
    value: IAccountSettings[keyof IAccountSettings]
) => API.patch(`/account/update/${id}`, { email, valueType, value })