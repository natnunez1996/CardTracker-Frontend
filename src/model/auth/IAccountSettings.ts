import { ISignUpFormData } from '@/model/auth';

export interface IAccountSettings extends ISignUpFormData {
    newPassword?: string,
    confirmNewPassword?: string,
}