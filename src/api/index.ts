import IRecord from "@/model/Record/IRecord";
import SignInFormData from "@/model/auth/ISignInFormData";
import SignUpFormData from "@/model/auth/ISignUpFormData";
import axios, { AxiosInstance, AxiosResponse } from "axios";




const API: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
})

//Record
export const createRecord = (recordData: IRecord) => API.post('/record', recordData);

export const getAllRecordsOfUser = (userId: String) => API.get(`/record/${userId}`);

export const getRecord = (recordId: String) => API.get(`/record/details/${recordId}`);
export const updateRecord = (recordId: String, updatedRecord: IRecord) => API.patch(`/record/details/${recordId}`, updatedRecord)

//Auth
export const signUp = (signUpFormData: SignUpFormData) => API.post(`/signUp`, signUpFormData);
export const signIn = (signInFormData: SignInFormData) => API.post(`/signIn`, signInFormData);