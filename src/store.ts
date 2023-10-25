import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import reducers from './reducers';

const store = configureStore({ reducer: reducers })


export type AppDisPatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store; 