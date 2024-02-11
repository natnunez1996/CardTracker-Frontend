import { type IProfile } from '@/model/UserModel'

export const getUserIdHook = (): IProfile | undefined => {
  let newUser: string | null
  if (localStorage.getItem('profile') !== null) {
    newUser = localStorage.getItem('profile')
    if (newUser !== null) {
      return JSON.parse(newUser) as IProfile
    }
  }
}
