import { MdFace } from "react-icons/md"
import './header.css';
import { useAppDispatch } from "@/hook";
import IUser from '@/model/UserModel/IUser'
import { useEffect, useState } from "react";
import { logout } from "@/actions/auth";
import { IProfile } from "@/model/UserModel/IProfile";

type Props = {
    userProfile: IProfile | undefined
}

const Header = ({ userProfile }: Props) => {
    const dispatch = useAppDispatch();

    const userData = localStorage.getItem('profile');
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        if (userData !== null) {
            const getUser = JSON.parse(userData)
            setUser(getUser.result)
        }

    }, [])

    const onLogOut = () => {
        dispatch(logout);
    }

    return (
        <div className="header">
            <div className="leftSide">
                <a href={"/home"}>Card Tracker</a>
            </div>
            {!userProfile && <div className="middle"> <h1>Please <a href="/login">Login</a> first</h1></div>}
            <div className="rightSide">
                <ul>
                    <li className="userPicture"><MdFace /></li>
                    <li>{user ? `${user.name}` : `Unknown Person`}</li>
                    {user && <li><button onClick={onLogOut}>Log out</button></li>}
                </ul>
            </div>
        </div>
    )
}

export default Header