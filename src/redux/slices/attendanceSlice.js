import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Update your environment variable import
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Idealy  we should use this markAttendance thunk but due to data manipulation we moved 
// it to students slice and using it there  
export const markAttendance = createAsyncThunk("markAttendance", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/attendance`, {
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

export const markHoliday = createAsyncThunk("markHoliday", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/attendance/mark-holiday`, {
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

export const attendanceByBatch = createAsyncThunk("attendanceByBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/attendance/all?month=${data.month}&day=${data.day}&batchId=${data.batchId}`, {
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

export const absentStudentsByBatch = createAsyncThunk("absentStudentsByBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/attendance/absent?month=${data.month}&day=${data.day}&batchId=${data.batchId}`, {
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
	attendance: [],
	absentStudents: [],
	isLoading: false,
	isError: false,
	errorMessage: ''
}

export const attendanceSlice = createSlice({
	name: "attendance",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(attendanceByBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(attendanceByBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.attendance = [...action.payload.data];
			})
			.addCase(attendanceByBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(absentStudentsByBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(absentStudentsByBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.absentStudents = [...action.payload.data];
			})
			.addCase(absentStudentsByBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			// Ideally we should use this markAttendance thunk but due to data manipulation we moved 
			// it to students slice and using it there 
			.addCase(markAttendance.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(markAttendance.fulfilled, (state, action) => {
				state.isLoading = false;
				state.attendance.push(action.payload.data);
				toast.success("Attendance marked successfully");
			})
			.addCase(markAttendance.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			})

			.addCase(markHoliday.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = '';
			})
			.addCase(markHoliday.fulfilled, (state, action) => {
				state.isLoading = false;
				state.attendance.push(action.payload.data);
				toast.success("Holiday marked successfully");
			})
			.addCase(markHoliday.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload.message;
				toast.error(action.payload.message);
			});
	}
});

export default attendanceSlice.reducer;
