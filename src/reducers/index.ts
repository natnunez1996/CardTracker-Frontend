import auth from './auth';
import userRecords from './userRecords'
import { combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({ auth, userRecords })

export default reducers;