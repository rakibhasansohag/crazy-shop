import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../admin/products-slice';

interface ShoppingProductsState {
	isLoading: boolean;
	productList: Product[];
	productDetails: Product | null;
}

interface FilterParams {
	category?: string[];
	brand?: string[];
	priceRange?: [number, number];
}

type SortParams = 'price_asc' | 'price_desc' | 'newest' | 'popular';

const initialState: ShoppingProductsState = {
	isLoading: false,
	productList: [],
	productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
	'products/fetchAllProducts',
	async (params: { filterParams?: FilterParams; sortParams?: SortParams }) => {
		const { filterParams = {}, sortParams = 'newest' } = params;

		// Convert filter parameters to URLSearchParams compatible format
		const queryParams: Record<string, string> = {};

		// Handle array parameters
		if (filterParams.category) {
			queryParams.category = filterParams.category.join(',');
		}
		if (filterParams.brand) {
			queryParams.brand = filterParams.brand.join(',');
		}

		// Handle price range
		if (filterParams.priceRange) {
			queryParams.priceMin = filterParams.priceRange[0].toString();
			queryParams.priceMax = filterParams.priceRange[1].toString();
		}

		// Handle sort parameter
		if (sortParams) {
			queryParams.sortBy = sortParams;
		}

		const query = new URLSearchParams(queryParams);

		const response = await axios.get<{ data: Product[] }>(
			`http://localhost:4000/api/shop/products/get?${query}`,
		);
		return response.data;
	},
);

export const fetchProductDetails = createAsyncThunk(
	'products/fetchProductDetails',
	async (id: string) => {
		const response = await axios.get<{ data: Product }>(
			`http://localhost:4000/api/shop/products/get/${id}`,
		);
		return response.data;
	},
);

const shoppingProductSlice = createSlice({
	name: 'shoppingProducts',
	initialState,
	reducers: {
		setProductDetails: (state) => {
			state.productDetails = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllFilteredProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				fetchAllFilteredProducts.fulfilled,
				(state, action: PayloadAction<{ data: Product[] }>) => {
					state.isLoading = false;
					state.productList = action.payload.data;
				},
			)
			.addCase(fetchAllFilteredProducts.rejected, (state) => {
				state.isLoading = false;
				state.productList = [];
			})
			.addCase(fetchProductDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				fetchProductDetails.fulfilled,
				(state, action: PayloadAction<{ data: Product }>) => {
					state.isLoading = false;
					state.productDetails = action.payload.data;
				},
			)
			.addCase(fetchProductDetails.rejected, (state) => {
				state.isLoading = false;
				state.productDetails = null;
			});
	},
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
