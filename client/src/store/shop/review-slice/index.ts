import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Review = {
	_id: string;
	productId: string;
	userId: string;
	userName: string;
	reviewMessage: string;
	reviewValue: number;
	createdAt: string;
	updatedAt: string;
};

export type AddReviewPayload = {
	productId: string;
	userId: string;
	userName: string;
	reviewMessage: string;
	reviewValue: number;
};

type ReviewState = {
	isLoading: boolean;
	reviews: Review[];
};

const initialState: ReviewState = {
	isLoading: false,
	reviews: [],
};

export const addReview = createAsyncThunk<Review, AddReviewPayload>(
	'/reviews/addReview',
	async (reviewData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://localhost:4000/api/shop/review/add',
				reviewData,
			);
			return response.data.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || error.message);
			}
			return rejectWithValue('An unexpected error occurred');
		}
	},
);

export const getReviews = createAsyncThunk<Review[], string>(
	'/reviews/getReviews',
	async (productId) => {
		const response = await axios.get(
			`http://localhost:4000/api/shop/review/${productId}`,
		);

		return response.data.data;
	},
);

const reviewSlice = createSlice({
	name: 'reviewSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getReviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.reviews = action.payload;
			})
			.addCase(getReviews.rejected, (state) => {
				state.isLoading = false;
				state.reviews = [];
			})
			.addCase(addReview.fulfilled, (state, action) => {
				state.reviews = [...state.reviews, action.payload];
			});
	},
});

export default reviewSlice.reducer;
