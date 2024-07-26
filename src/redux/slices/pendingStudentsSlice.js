import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getPendingStudents = createAsyncThunk("getPendingStudents", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/admission/not-admitted`, {
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
});

export const admitStudent = createAsyncThunk("admitStudent", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/admission/take-admission`, {
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

		return await response.json();
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const denyAdmission = createAsyncThunk("denyAdmission", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/${data.studentId}/admission/deny-admission`, {
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
	pendingStudents: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

export const pendingStudentsSlice = createSlice({
	name: "pendingStudents",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getPendingStudents.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(getPendingStudents.fulfilled, (state, action) => {
				state.isLoading = false;
				state.pendingStudents = [...action.payload.data];
				toast.success("Pending students fetched successfully");
			})
			.addCase(getPendingStudents.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching pending students: ${action.payload}`);
			})
			.addCase(admitStudent.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(admitStudent.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.pendingStudents.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.pendingStudents.splice(index, 1);
				}
				toast.success("Student admitted successfully");
			})
			.addCase(admitStudent.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error admitting student: ${action.payload}`);
			})
			.addCase(denyAdmission.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(denyAdmission.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.pendingStudents.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.pendingStudents.splice(index, 1);
				}
				toast.success("Admission denied successfully");
			})
			.addCase(denyAdmission.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error denying admission: ${action.payload}`);
			});
	},
});

export default pendingStudentsSlice.reducer;
