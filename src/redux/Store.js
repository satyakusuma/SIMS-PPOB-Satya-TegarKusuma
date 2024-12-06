import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import loginReducer from './loginSlice';
import profileReducer from './profileSlice';
import bannerReducer from './bannerSlice';
import serviceReducer from './serviceSlice';
import transactionReducer from './transactionSlice';
import transactionHistoryReducer from './transactionHistorySlice';
import topupReducer from './topupSlice';
import akunReducer from './akunSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    login: loginReducer,
    profile: profileReducer,
    banner: bannerReducer,
    service: serviceReducer,
    transaction: transactionReducer,
    transactionHistory: transactionHistoryReducer,
    topup: topupReducer,
    akun: akunReducer,
  },
});

export default store;
