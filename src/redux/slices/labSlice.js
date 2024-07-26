import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getAllLabs = createAsyncThunk("getAllLabs", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/labs`, {
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
});

export const createLab = createAsyncThunk("createLab", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/labs`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
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
});

export const deleteLab = createAsyncThunk("deleteLab", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/labs/${data.labId}`, {
			method: "DELETE",
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
});

const initialState = {
	labs: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

export const labSlice = createSlice({
	name: "lab",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getAllLabs.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(getAllLabs.fulfilled, (state, action) => {
				state.isLoading = false;
				state.labs = [...action.payload.data];
				toast.success("Labs fetched successfully");
			})
			.addCase(getAllLabs.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching labs: ${action.payload}`);
			})
			.addCase(createLab.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(createLab.fulfilled, (state, action) => {
				state.isLoading = false;
				state.labs.push(action.payload.data);
				toast.success("Lab created successfully");
			})
			.addCase(createLab.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error creating lab: ${action.payload}`);
			})
			.addCase(deleteLab.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(deleteLab.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.labs.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.labs.splice(index, 1);
				}
				toast.success("Lab deleted successfully");
			})
			.addCase(deleteLab.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error deleting lab: ${action.payload}`);
			});
	},
});

export default labSlice.reducer;
