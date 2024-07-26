import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Thunks

export const createSub = createAsyncThunk(
	"createSub",
	async (data, { rejectWithValue }) => {
		try {
			const { categoryId, courseId } = data;
			const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses/${courseId}/sub`, {
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

			const result = await response.json();
			toast.success("Subject created successfully!");
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const subByCategory = createAsyncThunk(
	"subByCategory",
	async (data, { rejectWithValue }) => {
		try {
			const { categoryId, courseId } = data;
			const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses/${courseId}/sub`, {
				method: "GET",
				credentials: "include",
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
	}
);

export const deleteSub = createAsyncThunk(
	"deleteSub",
	async (data, { rejectWithValue }) => {
		try {
			const { categoryId, courseId, subjectId } = data;
			const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses/${courseId}/sub/${subjectId}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}

			const result = await response.json();
			toast.success("Subject deleted successfully!");
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateSub = createAsyncThunk(
	"updateSub",
	async (data, { rejectWithValue }) => {
		try {
			const { categoryId, courseId, subjectId } = data;
			const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses/${courseId}/sub/${subjectId}`, {
				method: "PUT",
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

			const result = await response.json();
			toast.success("Subject updated successfully!");
			return result;
		} catch (error) {
			console.log("error occured")
			return rejectWithValue(error.message);
		}
	}
);

export const subByCourse = createAsyncThunk(
	"subByCourse",
	async (data, { rejectWithValue }) => {
		try {
			const { courseId } = data;
			const response = await fetch(`${BACKEND_URL}/subjects/${courseId._id}`, {
				method: "GET",
				credentials: "include",
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
	}
);

export const particularSub = createAsyncThunk(
	"particularSub",
	async (data, { rejectWithValue }) => {
		try {
			const { subjectId } = data;
			const response = await fetch(`${BACKEND_URL}/sub/${subjectId}`, {
				method: "GET",
				credentials: "include",
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
	}
);

// Initial State

const initialState = {
	subjects: [],
	subByCourse: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

// Slice

export const subjectSlice = createSlice({
	name: "subject",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(subByCategory.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(subByCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.subjects = [...action.payload.data];
			})
			.addCase(subByCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching subjects by category: ${action.payload}`);
			})
			.addCase(createSub.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(createSub.fulfilled, (state, action) => {
				state.isLoading = false;
				state.subjects.push(action.payload.data);
			})
			.addCase(createSub.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error creating subject: ${action.payload}`);
			})
			.addCase(updateSub.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(updateSub.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.subjects.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.subjects[index] = action.payload.data;
				}
			})
			.addCase(updateSub.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error updating subject: ${action.payload}`);
			})
			.addCase(deleteSub.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(deleteSub.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.subjects.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.subjects.splice(index, 1);
				}
			})
			.addCase(deleteSub.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error deleting subject: ${action.payload}`);
			})
			.addCase(subByCourse.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(subByCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.subByCourse = [...action.payload.data];
			})
			.addCase(subByCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching subjects by course: ${action.payload}`);
			})
			.addCase(particularSub.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(particularSub.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log("particular subject is fetched ", action.payload.data);
			})
			.addCase(particularSub.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching particular subject: ${action.payload}`);
			});
	},
});

export default subjectSlice.reducer;
