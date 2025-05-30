import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import AdminProductsSlice from './admin/products-slice';
import AdminOrdersSlice from './admin/orders-slice';

import shopProductsSlice from './shop/products-slice';
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';
import shopSearchSlice from './shop/search-slice';
import shopReviewSlice from './shop/review-slice';

import commonFeatureSlice from './common-slice';

const store = configureStore({
	reducer: {
		auth: authReducer,

		adminProducts: AdminProductsSlice,
		adminOrders: AdminOrdersSlice,

		shopProducts: shopProductsSlice,
		shopCart: shopCartSlice,
		shopAddress: shopAddressSlice,
		shopOrder: shopOrderSlice,
		shopSearch: shopSearchSlice,
		shopReviews: shopReviewSlice,

		commonFeature: commonFeatureSlice,
	},
});

export default store;

// Type for dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
