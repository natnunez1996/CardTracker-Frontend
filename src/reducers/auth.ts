import * as actionType from "@/constants/actionTypes";

const initialState: AuthState = {
    authData: { result: { _id: '', email: '', name: '' }, token: '' },
    message: ''
}

const authReducer = (state = initialState,
    action: AuthAction) => {

    switch (action.type) {
        case actionType.AUTH:
            const selectedKeys = ['_id', 'email', 'name'];
            const newResult = pick(action?.payload.result, selectedKeys);
            const localAuthState = { result: newResult, token: action?.payload.token }
            localStorage.setItem('profile', JSON.stringify(localAuthState));
            return { ...state, authData: action?.payload };
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
            name: string,
        },

        token: string,
    };
    message: String;
}

interface AuthAction {
    type: String;
    payload: any;
}