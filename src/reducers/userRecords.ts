import * as actionTypes from '@/constants/actionTypes'
import { type IRecord } from '@/model/CardModel'

const initialState: UserRecordsState = {
  records: [],
  recordDetails: null,
  message: ''

}

const userRecordsReducer = (state = initialState,
  action: { type: string, payload: any }): UserRecordsState => {
  switch (action.type) {
    case actionTypes.GETALLRECORDSOFUSER:
      return { ...state, records: action.payload.result }
    case actionTypes.GETRECORD:
      return { ...state, recordDetails: action.payload.result }
    case actionTypes.CREATERECORD:
      return { ...state, recordDetails: action.payload }
    case actionTypes.DELETERECORD:
      return { ...state, message: action.payload.message }
    case actionTypes.UPDATERECORD:
      return { ...state, recordDetails: action.payload.result }
    case actionTypes.SERVERERROR:
      return { ...state, message: action.payload }
    default: return state
  }
}

export default userRecordsReducer

interface UserRecordsState {
  records: IRecord[] | null
  recordDetails: IRecord | null
  message: string
}
