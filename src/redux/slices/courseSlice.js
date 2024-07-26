import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Use environment variable for the API base URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Define thunks with error handling
export const CoursesByCategory = createAsyncThunk("CoursesByCategory", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories/${data.categoryId}/courses`, {
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

export const particularCourse = createAsyncThunk("particularCourse", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories/${data.categoryId}/courses/${data.courseId}`, {
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

export const deleteCourse = createAsyncThunk("deleteCourse", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories/${data.categoryId}/courses/${data.courseId}`, {
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

export const createCourse = createAsyncThunk("createCourse", async (data, { rejectWithValue }) => {
	try {
		const { categoryId } = data;

		const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses`, {
			method: "POST",
			headers: {
				'Content-Type': "application/json"
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

export const updateCourse = createAsyncThunk("updateCourse", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/categories/${data.categoryId}/courses/${data.courseId}`, {
			method: "PUT",
			headers: {
				"Content-Type": 'application/json'
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

export const getAllCourses = createAsyncThunk("getAllCourses", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/courses`, {
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
	courses: [],
	allCourses: [],
	isLoading: false,
	isError: false,
	errorMessage: ''
};

export const courseSlice = createSlice({
	name: "course",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(CoursesByCategory.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(CoursesByCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.courses = [...action.payload.data];
			})
			.addCase(CoursesByCategory.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload); // Display error toast notification
			})
			.addCase(deleteCourse.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(deleteCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.courses.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.courses.splice(index, 1);
				}
			})
			.addCase(deleteCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload); // Display error toast notification
			})
			.addCase(getAllCourses.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(getAllCourses.fulfilled, (state, action) => {
				state.isLoading = false;
				state.allCourses = [...action.payload.data];
			})
			.addCase(getAllCourses.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload); // Display error toast notification
			})
		// Add similar cases for other thunks as needed
	}
});

export default courseSlice.reducer;
