import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export default store;
// Type for dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;