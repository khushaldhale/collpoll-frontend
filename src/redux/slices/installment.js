import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Use environment variable for the API base URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Define thunks with error handling
export const createInstallment = createAsyncThunk(
	"createInstallment",
	async (data, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BACKEND_URL}/installment`, {
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
	}
);

export const payInstallment = createAsyncThunk(
	"payInstallment",
	async (data, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BACKEND_URL}/installment/pay`, {
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
	}
);

export const installment_student = createAsyncThunk(
	"installment_student",
	async (data, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`${BACKEND_URL}/installment/student/?course=${data.course}&student=${data.student}`,
				{
					method: "GET",
					credentials: "include",
				}
			);

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

export const updateInstallment = createAsyncThunk(
	"updateInstallment",
	async (data, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BACKEND_URL}/installments/${data._id}`, {
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
	}
);

const initialState = {
	installments: [], // Installments for a particular student and course
	isLoading: false,
	isError: false,
	errorMessage: '',
};

export const installmentSlice = createSlice({
	name: "installment",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(createInstallment.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(createInstallment.fulfilled, (state, action) => {
				state.isLoading = false;
				toast.success("Installment created successfully");
			})
			.addCase(createInstallment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			})
			.addCase(updateInstallment.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(updateInstallment.fulfilled, (state, action) => {
				state.isLoading = false;
				toast.success("Installment updated successfully");
			})
			.addCase(updateInstallment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			})
			.addCase(installment_student.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(installment_student.fulfilled, (state, action) => {
				state.isLoading = false;
				state.installments = [...action.payload.data];
			})
			.addCase(installment_student.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			})
			.addCase(payInstallment.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(payInstallment.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.installments.findIndex(
					(element) => element._id === action.payload.data._id
				);
				if (index !== -1) {
					state.installments[index] = action.payload.data;
				}
				toast.success("Installment payment updated successfully");
			})
			.addCase(payInstallment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(action.payload);
			});
	},
});

export default installmentSlice.reducer;
