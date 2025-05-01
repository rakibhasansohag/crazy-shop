import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AddressItem {
	_id?: string;
	userId?: string;
	address: string;
	city: string;
	pincode: string;
	phone: string;
	notes: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
	addressId?: string;
}

interface AddressState {
	isLoading: boolean;
	addressList: AddressItem[];
}

interface AddressResponse {
	success: boolean;
	message?: string;
	data?: AddressItem | AddressItem[];
}

interface DeleteResponse {
	success: boolean;
	addressId: string;
}

const initialState: AddressState = {
	isLoading: false,
	addressList: [],
};

export const addNewAddress = createAsyncThunk<
	AddressResponse,
	{
		userId: string;
		address: string;
		city: string;
		phone: string;
		pincode: string;
		notes: string;
	}
>('/addresses/addNewAddress', async (payload) => {
	const response = await axios.post(
		'http://localhost:4000/api/shop/address/add',
		payload,
	);
	return response.data;
});

export const fetchAllAddresses = createAsyncThunk<AddressResponse, string>(
	'/addresses/fetchAllAddresses',
	async (userId) => {
		const response = await axios.get<AddressResponse>(
			`http://localhost:4000/api/shop/address/get/${userId}`,
		);
		return response.data;
	},
);

export const editAddress = createAsyncThunk<
	AddressResponse,
	{
		userId: string;
		addressId: string;
		formData: {
			address: string;
			city: string;
			phone: string;
			pincode: string;
			notes: string;
		};
	}
>('/addresses/editAddress', async (payload) => {
	const response = await axios.put(
		`http://localhost:4000/api/shop/address/update/${payload.userId}/${payload.addressId}`,
		payload.formData,
	);

	return response.data;
});

export const deleteAddress = createAsyncThunk<
	DeleteResponse,
	{ userId: string; addressId: string }
>('/addresses/deleteAddress', async ({ userId, addressId }) => {
	const response = await axios.delete<{ success: boolean }>(
		`http://localhost:4000/api/shop/address/delete/${userId}/${addressId}`,
	);
	return { ...response.data, addressId };
});

const addressSlice = createSlice({
	name: 'address',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addNewAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				addNewAddress.fulfilled,
				(state, action: PayloadAction<AddressResponse>) => {
					state.isLoading = false;
					if (action.payload.success && action.payload.data) {
						const newAddress = Array.isArray(action.payload.data)
							? action.payload.data[0]
							: action.payload.data;
						state.addressList.push(newAddress);
					}
				},
			)
			.addCase(addNewAddress.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchAllAddresses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				fetchAllAddresses.fulfilled,
				(state, action: PayloadAction<AddressResponse>) => {
					state.isLoading = false;
					state.addressList = Array.isArray(action.payload.data)
						? action.payload.data
						: [];
				},
			)
			.addCase(fetchAllAddresses.rejected, (state) => {
				state.isLoading = false;
				state.addressList = [];
			})
			.addCase(editAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				editAddress.fulfilled,
				(state, action: PayloadAction<AddressResponse>) => {
					state.isLoading = false;
					if (action.payload.success && action.payload.data) {
						const updatedAddress = Array.isArray(action.payload.data)
							? action.payload.data[0]
							: action.payload.data;
						const index = state.addressList.findIndex(
							(item) => item._id === updatedAddress._id,
						);
						if (index !== -1) {
							state.addressList[index] = updatedAddress;
						}
					}
				},
			)
			.addCase(editAddress.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(deleteAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				deleteAddress.fulfilled,
				(state, action: PayloadAction<DeleteResponse>) => {
					state.isLoading = false;
					if (action.payload.success) {
						state.addressList = state.addressList.filter(
							(item) => item._id !== action.payload.addressId,
						);
					}
				},
			)
			.addCase(deleteAddress.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default addressSlice.reducer;
