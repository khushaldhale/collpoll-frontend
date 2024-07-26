import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Thunks

export const createStudyMaterial = createAsyncThunk(
	"createStudyMaterial",
	async (data, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append("notes", data.notes);
			formData.append("subjectId", data.subjectId);

			// Log the FormData entries
			for (let [key, value] of formData.entries()) {
				console.log(`${key}: ${value}`);
			}

			const response = await fetch(`${BACKEND_URL}/batches/${data.batchId}/study-material`, {
				method: "POST",
				body: formData,
				credentials: "include"
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}

			const result = await response.json();
			toast.success("Study material created successfully!");
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteMaterial = createAsyncThunk(
	"deleteMaterial",
	async (data, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BACKEND_URL}/batches/${data.batchId}/study-material/${data.studyId}`, {
				method: "DELETE",
				credentials: "include"
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}

			const result = await response.json();
			toast.success("Study material deleted successfully!");
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const studyMaterialByBatch = createAsyncThunk(
	"studyMaterialByBatch",
	async (data, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BACKEND_URL}/batches/${data.batchId}/study-material`, {
				method: "GET",
				credentials: "include"
			});

			if (!response.ok) {
				const errorData = await response.json();
				return rejectWithValue(errorData);
			}

			const result = await response.json();
			console.log("study material ", result);
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Initial State

const initialState = {
	studyMaterials: [],
	isLoading: false,
	isError: false,
	errorMessage: ""
};

// Slice

export const studyMaterialSlice = createSlice({
	name: "studyMaterial",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(studyMaterialByBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(studyMaterialByBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.studyMaterials = [...action.payload.data];
				toast.success("Fetched study materials successfully!");
			})
			.addCase(studyMaterialByBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching study materials: ${action.payload}`);
			})
			.addCase(createStudyMaterial.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(createStudyMaterial.fulfilled, (state, action) => {
				state.isLoading = false;
				state.studyMaterials.push(action.payload.data);
			})
			.addCase(createStudyMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error creating study material: ${action.payload}`);
			})
			.addCase(deleteMaterial.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(deleteMaterial.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.studyMaterials.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.studyMaterials.splice(index, 1);
				}
			})
			.addCase(deleteMaterial.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error deleting study material: ${action.payload}`);
			});
	}
});

export default studyMaterialSlice.reducer;
