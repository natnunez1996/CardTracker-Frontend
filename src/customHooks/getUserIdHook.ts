import { IProfile } from "@/model/UserModel/IProfile";

export const getUserIdHook = () => {

    let newUser: string | null;
    if (localStorage.getItem('profile') !== null) {
        newUser = localStorage.getItem('profile')
        if (newUser !== null) {
            return JSON.parse(newUser) as IProfile;
        }
    }
}