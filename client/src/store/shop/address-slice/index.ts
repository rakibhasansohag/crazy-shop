import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AddressItem {
	_id: string;
	userId: string;
	address: string;
	city: string;
	pincode: string;
	phone: string;
	notes: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

interface AddressState {
	isLoading: boolean;
	addressList: AddressItem[];
}

const initialState: AddressState = {
	isLoading: false,
	addressList: [],
};

export const addNewAddress = createAsyncThunk(
	'/addresses/addNewAddress',
	async (formData: Partial<AddressItem>) => {
		const response = await axios.post(
			'http://localhost:5000/api/shop/address/add',
			formData,
		);
		return response.data;
	},
);

export const fetchAllAddresses = createAsyncThunk(
	'/addresses/fetchAllAddresses',
	async (userId: string) => {
		const response = await axios.get(
			`http://localhost:5000/api/shop/address/get/${userId}`,
		);
		return response.data;
	},
);

export const editAddress = createAsyncThunk(
	'/addresses/editAddress',
	async ({
		userId,
		addressId,
		formData,
	}: {
		userId: string;
		addressId: string;
		formData: Partial<AddressItem>;
	}) => {
		const response = await axios.put(
			`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
			formData,
		);
		return response.data;
	},
);

export const deleteAddress = createAsyncThunk(
	'/addresses/deleteAddress',
	async ({ userId, addressId }: { userId: string; addressId: string }) => {
		const response = await axios.delete(
			`http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`,
		);
		return { ...response.data, addressId };
	},
);

// Slices
const addressSlice = createSlice({
	name: 'address',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addNewAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addNewAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.success && action.payload.data) {
					state.addressList.push(action.payload.data);
				}
			})
			.addCase(addNewAddress.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(fetchAllAddresses.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllAddresses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.addressList = action.payload.data || [];
			})
			.addCase(fetchAllAddresses.rejected, (state) => {
				state.isLoading = false;
				state.addressList = [];
			})
			.addCase(editAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.success && action.payload.data) {
					const updatedAddress = action.payload.data;
					const index = state.addressList.findIndex(
						(item) => item._id === updatedAddress._id,
					);
					if (index !== -1) {
						state.addressList[index] = updatedAddress;
					}
				}
			})
			.addCase(editAddress.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(deleteAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.success) {
					const deletedId = action.payload.addressId;
					state.addressList = state.addressList.filter(
						(item) => item._id !== deletedId,
					);
				}
			})
			.addCase(deleteAddress.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default addressSlice.reducer;
