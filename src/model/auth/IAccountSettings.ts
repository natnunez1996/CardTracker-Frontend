import { ISignUpFormData } from '@/model/auth';

export interface IAccountSettings extends ISignUpFormData {
    confirmNewPassword?: string,
}