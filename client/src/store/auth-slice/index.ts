/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// Interface for user data
export interface User {
	id: string;
	userName: string;
	email: string;
	role: string;
	createdAt?: string;
	updatedAt?: string;
}

// Interface for auth state
interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: User | null;
}

// Interface for API responses
interface AuthResponse {
	success: boolean;
	message: string;
	user?: User;
}

interface AuthErrorPayload {
	message: string;
	errorCode?: number;
}

// Initial state with type
const initialState: AuthState = {
	isAuthenticated: false,
	isLoading: true,
	user: null,
};

// Register data interface
export interface RegisterData {
	userName: string;
	email: string;
	password: string;
}

// Login data interface
export interface LoginData {
	email: string;
	password: string;
}

// Async thunks with proper typing
export const registerUser = createAsyncThunk<
	AuthResponse,
	RegisterData,
	{ rejectValue: AuthErrorPayload }
>('auth/register', async (formData, { rejectWithValue }) => {
	try {
		const response = await axios.post<AuthResponse>(
			'http://localhost:4000/api/auth/register',
			formData,
			{ withCredentials: true },
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<AuthErrorPayload>;
		return rejectWithValue(
			axiosError.response?.data || { message: 'An unknown error occurred' },
		);
	}
});

export const loginUser = createAsyncThunk<
	AuthResponse,
	LoginData,
	{ rejectValue: AuthErrorPayload }
>('auth/login', async (formData, { rejectWithValue }) => {
	try {
		const response = await axios.post<AuthResponse>(
			'http://localhost:4000/api/auth/login',
			formData,
			{ withCredentials: true },
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<AuthErrorPayload>;
		return rejectWithValue(
			axiosError.response?.data || { message: 'An unknown error occurred' },
		);
	}
});

export const logoutUser = createAsyncThunk<
	AuthResponse,
	void,
	{ rejectValue: AuthErrorPayload }
>('auth/logout', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.post<AuthResponse>(
			'http://localhost:4000/api/auth/logout',
			{},
			{ withCredentials: true },
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<AuthErrorPayload>;
		return rejectWithValue(
			axiosError.response?.data || { message: 'An unknown error occurred' },
		);
	}
});

export const checkAuth = createAsyncThunk<
	AuthResponse,
	void,
	{ rejectValue: AuthErrorPayload }
>('auth/checkauth', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<AuthResponse>(
			'http://localhost:4000/api/auth/check-auth',
			{
				withCredentials: true,
				headers: {
					'Cache-Control':
						'no-store, no-cache, must-revalidate, proxy-revalidate',
				},
			},
		);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<AuthErrorPayload>;
		return rejectWithValue(
			axiosError.response?.data || { message: 'An unknown error occurred' },
		);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Register cases
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(registerUser.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})

			// Login cases
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				loginUser.fulfilled,
				(state, action: PayloadAction<AuthResponse>) => {
					state.isLoading = false;
					state.user = action.payload.success ? action.payload.user! : null;
					state.isAuthenticated = action.payload.success;
				},
			)
			.addCase(loginUser.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})

			// Check auth cases
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				checkAuth.fulfilled,
				(state, action: PayloadAction<AuthResponse>) => {
					state.isLoading = false;
					state.user = action.payload.success ? action.payload.user! : null;
					state.isAuthenticated = action.payload.success;
				},
			)
			.addCase(checkAuth.rejected, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})

			// Logout case
			.addCase(logoutUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export const { setUser } = authSlice.actions;
export type { AuthState };
export default authSlice.reducer;
