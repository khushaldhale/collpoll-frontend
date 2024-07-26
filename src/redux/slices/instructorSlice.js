import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Use environment variable for the API base URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Thunk to fetch all instructors with error handling
export const getAllInstructor = createAsyncThunk(
	"getAllInstructor",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BACKEND_URL}/instructors/all`, {
				method: "GET",
				credentials: "include",
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}

			return await response.json();
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const initialState = {
	instructors: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

export const instructorSlice = createSlice({
	name: "instructor",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getAllInstructor.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(getAllInstructor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.instructors = [...action.payload.data];
				toast.success("Instructors fetched successfully");
			})
			.addCase(getAllInstructor.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			});
	},
});

export default instructorSlice.reducer;
