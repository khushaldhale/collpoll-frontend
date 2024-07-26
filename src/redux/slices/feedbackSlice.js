import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Use environment variable for the API base URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Define thunks with error handling
export const notSubmittedFeedback = createAsyncThunk("notSubmittedFeedback", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/feedbacks/not-submitted`, {
			method: "GET",
			credentials: "include"
		});

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		return await response.json();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const submitFeedback = createAsyncThunk("submitFeedback", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/feedbacks/${data.feedbackId}/submit`, {
			method: "PUT",
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

		return await response.json();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const feedbacksViaBatch = createAsyncThunk("feedbacksViaBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/${data.instructorId}/batches/${data.batchId}/feedbacks`, {
			method: "GET",
			credentials: "include"
		});

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		return await response.json();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const instructorPerformanceViaBatch = createAsyncThunk("instructorPerformanceViaBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/instructors/${data.instructorId}/batches/${data.batchId}/performance`, {
			method: "GET",
			credentials: "include"
		});

		if (!response.ok) {
			const errorData = await response.json();
			return rejectWithValue(errorData);
		}

		return await response.json();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

const initialState = {
	feedback_not_submitted: [],
	feedbackByBatch: [],
	performance: undefined,
	isLoading: false,
	isError: false,
	errorMessage: ''
};

export const feedbackSlice = createSlice({
	name: "feedback",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(notSubmittedFeedback.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(notSubmittedFeedback.fulfilled, (state, action) => {
				state.isLoading = false;
				state.feedback_not_submitted = [...action.payload.data];
			})
			.addCase(notSubmittedFeedback.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload); // Display error toast notification
			})
			.addCase(submitFeedback.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(submitFeedback.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.feedback_not_submitted.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.feedback_not_submitted.splice(index, 1);
				}
				toast.success("Feedback submitted successfully"); // Display success toast notification
			})
			.addCase(submitFeedback.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload); // Display error toast notification
			})
			.addCase(feedbacksViaBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(feedbacksViaBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.feedbackByBatch = [...action.payload.data];
			})
			.addCase(feedbacksViaBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload); // Display error toast notification
			})
			.addCase(instructorPerformanceViaBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(instructorPerformanceViaBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.performance = action.payload.data[0]?.averageRating;
			})
			.addCase(instructorPerformanceViaBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload); // Display error toast notification
			});
	}
});

export default feedbackSlice.reducer;
