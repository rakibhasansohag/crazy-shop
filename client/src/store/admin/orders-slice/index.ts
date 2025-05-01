import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminOrderState, Order } from '@/types/order';

const initialState: AdminOrderState = {
	orderList: [],
	orderDetails: null,
	isLoading: false,
};

export const getAllOrdersForAdmin = createAsyncThunk<{ data: Order[] }, void>(
	'/order/getAllOrdersForAdmin',
	async () => {
		const response = await axios.get(
			'http://localhost:4000/api/admin/orders/get',
		);
		return response.data;
	},
);

export const getOrderDetailsForAdmin = createAsyncThunk<
	{ data: Order },
	string
>('/order/getOrderDetailsForAdmin', async (id) => {
	const response = await axios.get(
		`http://localhost:4000/api/admin/orders/details/${id}`,
	);
	return response.data;
});

export const updateOrderStatus = createAsyncThunk<
	{ message: string }, /// return type
	{ id: string; orderStatus: string } /// argument
>('/order/updateOrderStatus', async ({ id, orderStatus }) => {
	const response = await axios.put(
		`http://localhost:4000/api/admin/orders/update/${id}`,
		{
			orderStatus,
		},
	);
	return response.data;
});

const adminOrderSlice = createSlice({
	name: 'adminOrderSlice',
	initialState,
	reducers: {
		resetOrderDetails: (state) => {
			state.orderDetails = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllOrdersForAdmin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getAllOrdersForAdmin.fulfilled,
				(state, action: PayloadAction<{ data: Order[] }>) => {
					state.isLoading = false;
					state.orderList = action.payload.data;
				},
			)
			.addCase(getAllOrdersForAdmin.rejected, (state) => {
				state.isLoading = false;
				state.orderList = [];
			})
			.addCase(getOrderDetailsForAdmin.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getOrderDetailsForAdmin.fulfilled,
				(state, action: PayloadAction<{ data: Order }>) => {
					state.isLoading = false;
					state.orderDetails = action.payload.data;
				},
			)
			.addCase(getOrderDetailsForAdmin.rejected, (state) => {
				state.isLoading = false;
				state.orderDetails = null;
			});
	},
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
