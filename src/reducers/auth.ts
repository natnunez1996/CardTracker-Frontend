import * as actionType from "@/constants/actionTypes";
import { isPasswordCorrect } from '@/actions/auth';

const initialState: AuthState = {
    authData: { result: { _id: '', email: '', firstName: '', lastName: '' }, token: '' },
    isPasswordCorrect: false,
    message: ''
}

const authReducer = (state = initialState,
    action: AuthAction) => {

    switch (action.type) {
        case actionType.AUTH:
            const selectedKeys = ['_id', 'email', 'firstName', 'lastName'];
            const newResult = pick(action?.payload.result, selectedKeys);
            const localAuthState = { result: newResult, token: action?.payload.token }
            localStorage.setItem('profile', JSON.stringify(localAuthState));
            return { ...state, authData: action?.payload };
        case actionType.VALIDATE_PASSWORD:
            return { ...state, isPasswordCorrect: action?.payload.isPasswordCorrect, message: action?.payload.message }
        case actionType.LOGOUT:
            localStorage.clear();
            return { ...state, authData: initialState };
        case actionType.INVALID_CREDENTIALS:
            return { ...state, message: action?.payload }
        case actionType.CLEAR_MESSAGE:
            return { ...state, message: null };
        default:
            return state
    }
}

export default authReducer;


//Function for picking specified keys to insert in local storage.

function pick<Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Pick<Obj, Keys> {
    const picked: Partial<Obj> = {};
    for (const key of keys) {
        picked[key] = obj[key];
    }

    return picked as Pick<Obj, Keys>;
}

interface AuthState {
    authData: {
        result: {
            _id: string,
            email: string,
            firstName: string,
            lastName: string
        },
        token: string,
    },
    isPasswordCorrect: boolean,
    message: String
}

interface AuthAction {
    type: String;
    payload: any;
}