import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Thunks

export const createTopic = createAsyncThunk(
	"createTopic",
	async (data, { rejectWithValue }) => {
		try {
			const { categoryId, courseId, subjectId } = data;
			const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics`, {
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
			toast.success("Topic created successfully!");
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateTopic = createAsyncThunk(
	"updateTopic",
	async (data, { rejectWithValue }) => {
		try {
			const { categoryId, courseId, subjectId, topicId } = data;
			const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics/${topicId}`, {
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
			toast.success("Topic updated successfully!");
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteTopic = createAsyncThunk(
	"deleteTopic",
	async (data, { rejectWithValue }) => {
		try {
			const { categoryId, courseId, subjectId, topicId } = data;
			const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics/${topicId}`, {
				method: "DELETE",
				credentials: "include",
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}

			const result = await response.json();
			toast.success("Topic deleted successfully!");
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const topicBySub = createAsyncThunk(
	"topicBySub",
	async (data, { rejectWithValue }) => {
		try {
			const { categoryId, courseId, subjectId } = data;
			const response = await fetch(`${BACKEND_URL}/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics`, {
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

export const particularTopic = createAsyncThunk(
	"particularTopic",
	async (data, { rejectWithValue }) => {
		try {
			const { topicId } = data;
			const response = await fetch(`${BACKEND_URL}/topics/${topicId}`, {
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
	topics: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

// Slice

export const topicSlice = createSlice({
	name: "topic",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(topicBySub.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(topicBySub.fulfilled, (state, action) => {
				state.isLoading = false;
				state.topics = [...action.payload.data];
			})
			.addCase(topicBySub.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching topics: ${action.payload}`);
			})
			.addCase(createTopic.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(createTopic.fulfilled, (state, action) => {
				state.isLoading = false;
				state.topics.push(action.payload.data);
			})
			.addCase(createTopic.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error creating topic: ${action.payload}`);
			})
			.addCase(updateTopic.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(updateTopic.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.topics.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.topics[index] = action.payload.data;
				}
			})
			.addCase(updateTopic.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error updating topic: ${action.payload}`);
			})
			.addCase(deleteTopic.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(deleteTopic.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.topics.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.topics.splice(index, 1);
				}
			})
			.addCase(deleteTopic.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error deleting topic: ${action.payload}`);
			})
			.addCase(particularTopic.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(particularTopic.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log("Particular topic is fetched", action.payload.data);
			})
			.addCase(particularTopic.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching topic: ${action.payload}`);
			});
	},
});

export default topicSlice.reducer;
