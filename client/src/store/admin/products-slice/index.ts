/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: false,
	productList: [],
};

export type Products = {
	name: string;
	image: string;
	category: string;
	description: string;
	price: number;
	quantity: number;
};

export const addNewProduct = createAsyncThunk(
	'/products/addnewproduct',
	async (formData) => {
		const result = await axios.post(
			'http://localhost:4000/api/admin/products/add',
			formData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return result?.data;
	},
);

export const fetchAllProducts = createAsyncThunk(
	'/products/fetchAllProducts',
	async () => {
		const result = await axios.get(
			'http://localhost:4000/api/admin/products/get',
		);

		return result?.data;
	},
);

export const editProduct = createAsyncThunk(
	'/products/editProduct',
	async ({ id, formData }: { id: string; formData: Products }) => {
		const result = await axios.put(
			`http://localhost:4000/api/admin/products/edit/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return result?.data;
	},
);

export const deleteProduct = createAsyncThunk(
	'/products/deleteProduct',
	async (id) => {
		const result = await axios.delete(
			`http://localhost:4000/api/admin/products/delete/${id}`,
		);

		return result?.data;
	},
);

const AdminProductsSlice = createSlice({
	name: 'adminProducts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productList = action.payload.data;
			})
			.addCase(fetchAllProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.productList = [];
			});
	},
});

export default AdminProductsSlice.reducer;

// V2 Code will use letter of the project  with good error handling

{
	/* import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  // Add other product properties as needed
}

// API response interfaces
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ErrorPayload {
  message: string;
  errorCode?: number;
}

// State interface
interface AdminProductsState {
  isLoading: boolean;
  productList: Product[];
}

// Initial state
const initialState: AdminProductsState = {
  isLoading: false,
  productList: [],
};

// Thunk payload interfaces
interface EditProductPayload {
  id: string;
  formData: Partial<Product>; // Assuming formData contains product fields to update
}

// Async thunks with proper typing
export const addNewProduct = createAsyncThunk<
  ApiResponse<Product>,
  FormData | Partial<Product>,
  { rejectValue: ErrorPayload }
>('/products/addnewproduct', async (formData, { rejectWithValue }) => {
  try {
    const result = await axios.post<ApiResponse<Product>>(
      'http://localhost:5000/api/admin/products/add',
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorPayload>;
    return rejectWithValue(
      axiosError.response?.data || {
        message: 'Failed to add product',
      }
    );
  }
});

export const fetchAllProducts = createAsyncThunk<
  ApiResponse<Product[]>,
  void,
  { rejectValue: ErrorPayload }
>('/products/fetchAllProducts', async (_, { rejectWithValue }) => {
  try {
    const result = await axios.get<ApiResponse<Product[]>>(
      'http://localhost:5000/api/admin/products/get'
    );
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorPayload>;
    return rejectWithValue(
      axiosError.response?.data || {
        message: 'Failed to fetch products',
      }
    );
  }
});

export const editProduct = createAsyncThunk<
  ApiResponse<Product>,
  EditProductPayload,
  { rejectValue: ErrorPayload }
>('/products/editProduct', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const result = await axios.put<ApiResponse<Product>>(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorPayload>;
    return rejectWithValue(
      axiosError.response?.data || {
        message: 'Failed to update product',
      }
    );
  }
});

export const deleteProduct = createAsyncThunk<
  ApiResponse<string>,
  string,
  { rejectValue: ErrorPayload }
>('/products/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    const result = await axios.delete<ApiResponse<string>>(
      `http://localhost:5000/api/admin/products/delete/${id}`
    );
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorPayload>;
    return rejectWithValue(
      axiosError.response?.data || {
        message: 'Failed to delete product',
      }
    );
  }
});

const AdminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<ApiResponse<Product[]>>) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        }
      )
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer; */
}
