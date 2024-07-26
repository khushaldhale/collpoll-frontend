import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Update your environment variable import
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const batchesByLab = createAsyncThunk("batchesByLab", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/labs/${data.labId}/batches`, {
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

export const ParticularBatchByLabId = createAsyncThunk("ParticularBatchByLabId", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/labs/${data.labId}/batches/${data.batchId}`, {
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

export const createBatch = createAsyncThunk("createBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/labs/${data.labId}/batches`, {
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

export const deleteBatch = createAsyncThunk("deleteBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/labs/${data.labId}/batches/${data.batchId}`, {
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

export const updateBatch = createAsyncThunk("updateBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/labs/${data.labId}/batches/${data.batchId}`, {
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

export const batchesByInstructor = createAsyncThunk("batchesByInstructor", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/instructor/batches`, {
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

export const batchesByInstructorId = createAsyncThunk("batchesByInstructorId", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/batches/instructors/${data.instructorId}`, {
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

export const particularBatch = createAsyncThunk("particularBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/batches/${data.batchId}`, {
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

export const allBatches = createAsyncThunk("allBatches", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/batches`, {
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
	batches: [],
	instructorBatches: [],
	singleBatch: undefined,
	isLoading: false,
	isError: false,
	errorMessage: ''
};

export const batchSlice = createSlice({
	name: "batch",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(batchesByLab.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(batchesByLab.fulfilled, (state, action) => {
				state.isLoading = false;
				state.batches = [...action.payload.data];
			})
			.addCase(batchesByLab.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(ParticularBatchByLabId.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(ParticularBatchByLabId.fulfilled, (state, action) => {
				state.isLoading = false;
				state.singleBatch = action.payload.data;
			})
			.addCase(ParticularBatchByLabId.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(createBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(createBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.batches.push(action.payload.data);
				toast.success("Batch created successfully");
			})
			.addCase(createBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(updateBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(updateBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.batches.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.batches[index] = action.payload.data;
				}
				toast.success("Batch updated successfully");
			})
			.addCase(updateBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(deleteBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(deleteBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.batches.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.batches.splice(index, 1);
				}
				toast.success("Batch deleted successfully");
			})
			.addCase(deleteBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(batchesByInstructor.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(batchesByInstructor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.instructorBatches = [...action.payload.data];
			})
			.addCase(batchesByInstructor.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(batchesByInstructorId.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(batchesByInstructorId.fulfilled, (state, action) => {
				state.isLoading = false;
				state.instructorBatches = [...action.payload.data];
			})
			.addCase(batchesByInstructorId.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(particularBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(particularBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.singleBatch = action.payload.data;
			})
			.addCase(particularBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(allBatches.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(allBatches.fulfilled, (state, action) => {
				state.isLoading = false;
				state.batches = [...action.payload.data];
			})
			.addCase(allBatches.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			});
	}
});

export default batchSlice.reducer;
