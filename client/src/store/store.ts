import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import AdminProductsSlice from './admin/products-slice';
import shopProductsSlice from './shop/products-slice';
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProducts: AdminProductsSlice,
		shopProducts: shopProductsSlice,
		shopCart: shopCartSlice,
		shopAddress: shopAddressSlice,
	},
});

export default store;
// Type for dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;