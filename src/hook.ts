import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { type AppDisPatch, type RootState } from './store'

export const useAppDispatch: () => AppDisPatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
