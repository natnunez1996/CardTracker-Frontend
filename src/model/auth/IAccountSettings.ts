import { type ISignUpFormData } from '@/model/auth'

export interface IAccountSettings extends ISignUpFormData {
  confirmNewPassword?: string
}
