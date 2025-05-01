import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../admin/products-slice';
import { AddressItem } from '../address-slice';
import { CartItem } from '../cart-slice';

export type OrderData = {
	approvalURL: string | null;
	orderId: string | null;
};

export type OrderDataCreate = {
	userId: string;
	cartId: string;
	cartItems: CartItem[];
	addressInfo: {
		addressId: string;
		address: string;
		city: string;
		pincode: string;
		phone: string;
		notes?: string;
	};
	orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered';
	paymentMethod: 'paypal' | 'stripe' | 'cash';
	paymentStatus: 'pending' | 'paid' | 'failed';
	totalAmount: number;
	orderDate: Date;
	orderUpdateDate: Date;
	paymentId?: string;
	payerId?: string;
};

export type OrderDetails = {
	id: string | null;
	items: Product[];
	total: number;
};

export type OrderListItem = {
	id: string;
	date: string;
	total: number;
};

export type OrderState = {
	approvalURL: string | null;
	isLoading: boolean;
	orderId: string | null;
	orderList: OrderListItem[];
	orderDetails: OrderDetails | null;
};

export type AddressInfo = {
	addressId: string;
	address: string;
	city: string;
	pincode: string;
	phone: string;
	notes: string;
};

export type CreateOrderPayload = {
	userId: string;
	cartId: string;
	cartItems: {
		productId: string;
		title: string;
		image: string;
		price: number;
		quantity: number;
	}[];
	addressInfo: AddressItem;
	orderStatus: string;
	paymentMethod: string;
	paymentStatus: string;
	totalAmount: number;
	orderDate: Date;
	orderUpdateDate: Date;
	paymentId: string;
	payerId: string;
};

const initialState: OrderState = {
	approvalURL: null,
	isLoading: false,
	orderId: null,
	orderList: [],
	orderDetails: null,
};

export const createNewOrder = createAsyncThunk<
	{
		approvalURL: string;
		orderId: string;
	},
	CreateOrderPayload
>('/order/createNewOrder', async (orderData) => {
	const response = await axios.post<{ approvalURL: string; orderId: string }>(
		'http://localhost:4000/api/shop/order/create',
		orderData,
	);

	return response.data;
});

export const capturePayment = createAsyncThunk<
	{ paymentId: string; payerId: string; orderId: string },
	{ paymentId: string; payerId: string; orderId: string }
>('/order/capturePayment', async ({ paymentId, payerId, orderId }) => {
	const response = await axios.post(
		'http://localhost:4000/api/shop/order/capture',
		{
			paymentId,
			payerId,
			orderId,
		},
	);

	return response.data;
});

export const getAllOrdersByUserId = createAsyncThunk(
	'/order/getAllOrdersByUserId',
	async (userId) => {
		const response = await axios.get(
			`http://localhost:4000/api/shop/order/list/${userId}`,
		);

		return response.data;
	},
);

export const getOrderDetails = createAsyncThunk(
	'/order/getOrderDetails',
	async (id) => {
		const response = await axios.get(
			`http://localhost:4000/api/shop/order/details/${id}`,
		);

		return response.data;
	},
);

const shoppingOrderSlice = createSlice({
	name: 'shoppingOrderSlice',
	initialState,
	reducers: {
		resetOrderDetails: (state) => {
			state.orderDetails = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createNewOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createNewOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.approvalURL = action.payload.approvalURL;
				state.orderId = action.payload.orderId;
				sessionStorage.setItem(
					'currentOrderId',
					JSON.stringify(action.payload.orderId),
				);
			})
			.addCase(createNewOrder.rejected, (state) => {
				state.isLoading = false;
				state.approvalURL = null;
				state.orderId = null;
			})
			.addCase(getAllOrdersByUserId.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orderList = action.payload.data;
			})
			.addCase(getAllOrdersByUserId.rejected, (state) => {
				state.isLoading = false;
				state.orderList = [];
			})
			.addCase(getOrderDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrderDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orderDetails = action.payload.data;
			})
			.addCase(getOrderDetails.rejected, (state) => {
				state.isLoading = false;
				state.orderDetails = null;
			});
	},
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
