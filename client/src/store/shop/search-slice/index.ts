import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../admin/products-slice';

type SearchState = {
	isLoading: boolean;
	searchResults: Product[];
};

type SearchResults = {
	data: Product[];
};

const initialState: SearchState = {
	isLoading: false,
	searchResults: [],
};

export const getSearchResults = createAsyncThunk<SearchResults, string>(
	'/search/getSearchResults',
	async (keyword) => {
		const response = await axios.get(
			`http://localhost:4000/api/shop/search/${keyword}`,
		);

		return response.data;
	},
);

const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		resetSearchResults: (state) => {
			state.searchResults = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSearchResults.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSearchResults.fulfilled, (state, action) => {
				state.isLoading = false;
				state.searchResults = action.payload.data;
			})
			.addCase(getSearchResults.rejected, (state) => {
				state.isLoading = false;
				state.searchResults = [];
			});
	},
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
