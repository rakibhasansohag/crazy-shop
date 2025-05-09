import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Review {
	_id: string;
	user: string;
	rating: number;
	comment: string;
	createdAt: string;
}

interface ReviewState {
	isLoading: boolean;
	reviews: Review[];
}

const initialState: ReviewState = {
	isLoading: false,
	reviews: [],
};

export const addReview = createAsyncThunk<Review | undefined, FormData>(
	'/order/addReview',
	async (formdata) => {
		const response = await axios.post(
			`http://localhost:4000/api/shop/review/add`,
			formdata,
		);

		return response.data;
	},
);

export const getReviews = createAsyncThunk<{ data: Review[] }>(
	'/order/getReviews',
	async (id) => {
		const response = await axios.get(
			`http://localhost:4000/api/shop/review/${id}`,
		);

		return response.data;
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
				state.reviews = action.payload.data;
			})
			.addCase(getReviews.rejected, (state) => {
				state.isLoading = false;
				state.reviews = [];
			});
	},
});

export default reviewSlice.reducer;
