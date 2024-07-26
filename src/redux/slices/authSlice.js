import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const sendOTP = createAsyncThunk("sendOTP", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendUrl}/auth/otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		const result = await response.json();
		return result;

	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const registerUser = createAsyncThunk("registerUser", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendUrl}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		const result = await response.json();
		return result;

	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const loginUser = createAsyncThunk("loginUser", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendUrl}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
			credentials: "include"
		});
		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		const result = await response.json();
		return result;

	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const studentRegistration = createAsyncThunk("studentRegistration", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendUrl}/auth/register/student`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		const result = await response.json();
		return result;

	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const createPassword = createAsyncThunk("createPassword", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${backendUrl}/auth/student/create-password`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		const result = await response.json();
		return result;

	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const initialState = {
	user: null,
	isLoading: false,
	email: null,
	isError: null,
	token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(sendOTP.pending, (state) => {
				state.isLoading = true;
				state.isError = null;
			})
			.addCase(sendOTP.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload;
				toast.error(action.payload.message);
			})
			.addCase(sendOTP.fulfilled, (state, action) => {
				state.isLoading = false;
				state.email = action.payload.data.email;
				toast.success(action.payload.message);
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.isError = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload;
				toast.error(action.payload.message);
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.isLoading = false;
				toast.success("User is registered successfully");
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.isError = null;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload;
				toast.error(action.payload.message);
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.token = action.payload.token;
				state.user = action.payload.data;
				localStorage.setItem("token", JSON.stringify(action.payload.token));
				toast.success(action.payload.message);
			})
			.addCase(studentRegistration.pending, (state) => {
				state.isLoading = true;
				state.isError = null;
			})
			.addCase(studentRegistration.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload;
				toast.error(action.payload.message);
			})
			.addCase(studentRegistration.fulfilled, (state) => {
				state.isLoading = false;
				toast.success("Student is registered successfully");
			})
			.addCase(createPassword.pending, (state) => {
				state.isLoading = true;
				state.isError = null;
			})
			.addCase(createPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = action.payload;
				toast.error(action.payload.message);
			})
			.addCase(createPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				toast.success(action.payload.message);
			});
	}
});

export default authSlice.reducer;
