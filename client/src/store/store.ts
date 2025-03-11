import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import AdminProductsSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProducts: AdminProductsSlice,
		shopProducts: shopProductsSlice,
	},
});

export default store;
// Type for dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;