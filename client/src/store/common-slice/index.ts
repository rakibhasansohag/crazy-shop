import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type FeatureImage = {
	_id: string;
	image: string;
	createdAt?: string;
	updatedAt?: string;
};

export type CommonState = {
	isLoading: boolean;
	featureImageList: FeatureImage[];
};

const initialState: CommonState = {
	isLoading: false,
	featureImageList: [],
};

export const getFeatureImages = createAsyncThunk<FeatureImage[]>(
	'/common/getFeatureImages',
	async () => {
		const response = await axios.get<{ data: FeatureImage[] }>(
			`http://localhost:4000/api/common/feature/get`,
		);

		return response.data.data;
	},
);

export const addFeatureImage = createAsyncThunk<FeatureImage, string>(
	'/common/addFeatureImage',
	async (image) => {
		const response = await axios.post<{ data: FeatureImage }>(
			`http://localhost:4000/api/common/feature/add`,
			{ image },
		);

		return response.data.data;
	},
);

const commonSlice = createSlice({
	name: 'commonFeature',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFeatureImages.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFeatureImages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.featureImageList = Array.isArray(action.payload)
					? action.payload
					: [];
			})
			.addCase(getFeatureImages.rejected, (state) => {
				state.isLoading = false;
				state.featureImageList = [];
			})
			.addCase(addFeatureImage.fulfilled, (state, action) => {
				state.featureImageList = [
					...(Array.isArray(state.featureImageList)
						? state.featureImageList
						: []),
					action.payload,
				];
			});
	},
});

export default commonSlice.reducer;
