import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type CartItem = {
	_id: string;
	productId: string & {
		_id: string;
		image: string;
		title: string;
		price: number;
		salePrice?: number;
	};
	quantity: number;
	price: number;
	salePrice: number;
	image: string;
	title: string;
};

export type CartResponse = {
	success: boolean;
	message?: string;
	data?: {
		_id: string;
		userId: string;
		items: CartItem[];
		createdAt: string;
		updatedAt: string;
		success: boolean;
		message: string;
	};
};

export type CartState = {
	cartItems: CartItem[];
	isLoading: boolean;
	error?: string;
};
const initialState: CartState = {
	cartItems: [],
	isLoading: false,
	error: undefined,
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
			// Add to Cart
			.addCase(addToCart.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.success && action.payload.data) {
					state.cartItems = action.payload.data.items;
				}
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			})

			// Fetch Cart Items
			.addCase(fetchCartItems.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(fetchCartItems.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.success && action.payload.data) {
					state.cartItems = action.payload.data.items;
				}
			})
			.addCase(fetchCartItems.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			})

			// Update Cart Quantity
			.addCase(updateCartQuantity.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(updateCartQuantity.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.success && action.payload.data) {
					state.cartItems = action.payload.data.items;
				}
			})
			.addCase(updateCartQuantity.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			})

			// Delete Cart Item
			.addCase(deleteCartItem.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(deleteCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.success && action.payload.data) {
					state.cartItems = action.payload.data.items;
				}
			})
			.addCase(deleteCartItem.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message || 'Something went wrong!';
			});
	},
});

export default shoppingCartSlice.reducer;
