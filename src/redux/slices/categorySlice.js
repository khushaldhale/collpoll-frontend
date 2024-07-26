import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Use environment variable for the API base URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Async Thunks with error handling
export const getAllCategories = createAsyncThunk("getAllCategories", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories`, {
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

export const createCategory = createAsyncThunk("createCategory", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories`, {
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

export const updateCategory = createAsyncThunk("updateCategory", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories/${data.id}`, {
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

		const result = await response.json();
		return result;

	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const getSingleCategory = createAsyncThunk("getSingleCategory", async (id, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories/${id}`, {
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

export const deleteCategory = createAsyncThunk("deleteCategory", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories/${data._id}`, {
			method: "DELETE",
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

// Initial state
const initialState = {
	categories: [],
	isLoading: false,
	isError: false,
	errorMessage: ''
};

// Slice
export const categorySlice = createSlice({
	name: "category",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getAllCategories.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(getAllCategories.fulfilled, (state, action) => {
				state.isLoading = false;
				state.categories = [...action.payload.data];
			})
			.addCase(getAllCategories.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			})

			.addCase(createCategory.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.categories.push(action.payload.data);
				toast.success("Category created successfully");
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			})

			.addCase(updateCategory.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.categories.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.categories[index] = action.payload.data;
				}
				toast.success("Category updated successfully");
			})
			.addCase(updateCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			})

			.addCase(deleteCategory.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.categories.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.categories.splice(index, 1);
				}
				toast.success("Category deleted successfully");
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			});
	}
});

export default categorySlice.reducer;
