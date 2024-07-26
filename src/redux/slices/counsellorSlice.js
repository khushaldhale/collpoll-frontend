import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Use environment variable for the API base URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Thunks with error handling
export const counsellorPerformance = createAsyncThunk("counsellorPerformance", async (counsellorId, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/counsellor/performance/${counsellorId}`, {
			method: "GET",
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

export const allCounsellors = createAsyncThunk("allCounsellors", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/counsellors/all`, {
			method: "GET",
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

const initialState = {
	performance: undefined,
	allCounsellors: undefined,
	isLoading: false,
	isError: false,
	errorMessage: ''
};

export const counsellorSlice = createSlice({
	name: "counsellor",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(counsellorPerformance.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(counsellorPerformance.fulfilled, (state, action) => {
				state.isLoading = false;
				state.performance = action.payload.data;
			})
			.addCase(counsellorPerformance.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			})

			.addCase(allCounsellors.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(allCounsellors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.allCounsellors = [...action.payload.data];
			})
			.addCase(allCounsellors.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			});
	}
});

export default counsellorSlice.reducer;
