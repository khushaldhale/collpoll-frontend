import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Use environment variable for the API base URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Thunks with error handling
export const createCourseEnrollment = createAsyncThunk("createCourseEnrollment", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/course-enrollment`, {
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

const initialState = {
	courseEnrollmentData: {},
	isLoading: false,
	isError: false,
	errorMessage: ''
};

export const courseEnrollmentSlice = createSlice({
	name: "courseEnrollment",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(createCourseEnrollment.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(createCourseEnrollment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.courseEnrollmentData = action.payload.data;
			})
			.addCase(createCourseEnrollment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);  // Display error toast notification
			});
	}
});

export default courseEnrollmentSlice.reducer;
