import * as actionType from '@/constants/actionTypes'

const initialState: AuthState = {
  authData: { result: { _id: '', email: '', firstName: '', lastName: '' }, token: '' },
  isPasswordCorrect: false,
  message: '',
  specialMessage: ''
}

const authReducer = (state = initialState,
  action: AuthAction): AuthState => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify(setAuth(action)))
      return { ...state, authData: action?.payload, isPasswordCorrect: false }
    case actionType.CLEAR_MESSAGE:
      return { ...state, message: '' }
    case actionType.CLEAR_SPECIAL_MESSAGE:
      return { ...state, specialMessage: '' }
    case actionType.INVALID_CREDENTIALS:
      return { ...state, message: action?.payload }
    case actionType.LOGOUT:
      localStorage.clear()
      return { ...state, authData: initialState.authData }
    case actionType.UPDATEPASSWORDMESSAGE:
      return { ...state, specialMessage: action?.payload }
    case actionType.VALIDATE_PASSWORD:
      return { ...state, isPasswordCorrect: action?.payload.isPasswordCorrect, message: action?.payload.message }
    default:
      return state
  }
}

export default authReducer



interface AuthState {
  authData: {
    result: {
      _id: string
      email: string
      firstName: string
      lastName: string
    }
    token: string
  }
  isPasswordCorrect: boolean
  message: string
  specialMessage: string
}

interface AuthAction {
  type: string
  payload: any
}

interface AuthResult {
  result: Pick<any, string>,
  token: any
}

// Function for picking specified keys to insert in local storage.

function pick<Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Pick<Obj, Keys> {
  const picked: Partial<Obj> = {}
  for (const key of keys) {
    picked[key] = obj[key]
  }

  return picked as Pick<Obj, Keys>
}

function setAuth(action: AuthAction): AuthResult {
  const selectedKeys = ['_id', 'email', 'firstName', 'lastName']
  const newResult = pick(action?.payload.result, selectedKeys)
  return { result: newResult, token: action?.payload.token }
}