import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type CartItem = {
	_id: string;
	productId: string;
	quantity: number;
};

export type CartResponse = {
	cartItems: CartItem[];
	isLoading: boolean;
	error?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
};

const initialState: CartResponse = {
	cartItems: [],
	isLoading: false,
};

export const addToCart = createAsyncThunk<
	CartResponse,
	{ userId: string; productId: string; quantity: number }
>('cart/addToCart', async ({ userId, productId, quantity }) => {
	const response = await axios.post<CartResponse>(
		'http://localhost:4000/api/shop/cart/add',
		{
			userId,
			productId,
			quantity,
		},
	);

	return response.data;
});

export const fetchCartItems = createAsyncThunk<
	CartResponse,
	{ userId: string }
>('cart/fetchCartItems', async ({ userId }) => {
	const response = await axios.get<CartResponse>(
		`http://localhost:4000/api/shop/cart/get/${userId}`,
	);

	return response.data;
});

export const deleteCartItem = createAsyncThunk<
	CartResponse,
	{ userId: string; productId: string }
>('cart/deleteCartItem', async ({ userId, productId }) => {
	const response = await axios.delete<CartResponse>(
		`http://localhost:4000/api/shop/cart/${userId}/${productId}`,
	);

	return response.data;
});

export const updateCartQuantity = createAsyncThunk<
	CartResponse,
	{ userId: string; productId: string; quantity: number }
>('cart/updateCartQuantity', async ({ userId, productId, quantity }) => {
	const response = await axios.put<CartResponse>(
		'http://localhost:4000/api/shop/cart/update-cart',
		{
			userId,
			productId,
			quantity,
		},
	);

	return response.data;
});

const shoppingCartSlice = createSlice({
	name: 'shoppingCart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cartItems = action.payload.data.cartItems;
			})
			.addCase(addToCart.rejected, (state) => {
				state.isLoading = false;
				state.cartItems = [];
			})
			.addCase(fetchCartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cartItems = action.payload.data.cartItems;
			})
			.addCase(fetchCartItems.rejected, (state) => {
				state.isLoading = false;
				state.cartItems = [];
			})
			.addCase(updateCartQuantity.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCartQuantity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cartItems = action.payload.data.cartItems;
			})
			.addCase(updateCartQuantity.rejected, (state) => {
				state.isLoading = false;
				state.cartItems = [];
			})
			.addCase(deleteCartItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.cartItems = action.payload.data.cartItems;
			})
			.addCase(deleteCartItem.rejected, (state) => {
				state.isLoading = false;
				state.cartItems = [];
			});
	},
});

export default shoppingCartSlice.reducer;
