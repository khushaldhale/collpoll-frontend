import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const addToBatch = createAsyncThunk("addToBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/student/add-to-batch`, {
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

export const notAllocatedBatch = createAsyncThunk("notAllocatedBatch", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/students/no-batch-allocated`, {
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

export const getstudentsByBatch = createAsyncThunk("getstudentsByBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/students/batches/${data.batchId}`, {
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

export const studentInfo = createAsyncThunk("studentInfo", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/students/info`, {
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

export const markAttendance = createAsyncThunk("markAttendance", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/attendance`, {
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

export const allStudents = createAsyncThunk("allStudents", async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/students/all`, {
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

export const allStudentsByBatch = createAsyncThunk("allStudentsByBatch", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/batches/${data.batchId}/students/all`, {
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

export const allStudentsByCourse = createAsyncThunk("allStudentsByCourse", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BACKEND_URL}/courses/${data.courseId}/students/all`, {
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

const initialState = {
	studentsNoBatch: [], // Students who are not allocated to batch
	studentsByBatch: [], // Students allocated to a specific batch
	student: undefined, // Information of a single student
	allStudents: [], // List of all students for admin
	isLoading: false, // Loading state
	isError: false, // Error state
	errorMessage: "", // Error message
};

export const studentSlice = createSlice({
	name: "student",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(notAllocatedBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(notAllocatedBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.studentsNoBatch = [...action.payload.data];
				toast.success("Fetched students without batch allocation");
			})
			.addCase(notAllocatedBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching students without batch: ${action.payload}`);
			})

			.addCase(getstudentsByBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(getstudentsByBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.studentsByBatch = [...action.payload.data];
				toast.success("Fetched students by batch");
			})
			.addCase(getstudentsByBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching students by batch: ${action.payload}`);
			})

			.addCase(markAttendance.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(markAttendance.fulfilled, (state, action) => {
				state.isLoading = false;
				const index = state.studentsByBatch.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.studentsByBatch.splice(index, 1);
				}
				toast.success("Attendance marked successfully");
			})
			.addCase(markAttendance.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error marking attendance: ${action.payload}`);
			})

			.addCase(addToBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(addToBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.studentsByBatch.push(action.payload.data);
				const index = state.studentsNoBatch.findIndex((element) => element._id === action.payload.data._id);
				if (index !== -1) {
					state.studentsNoBatch.splice(index, 1);
				}
				toast.success("Student added to batch successfully");
			})
			.addCase(addToBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error adding student to batch: ${action.payload}`);
			})

			.addCase(studentInfo.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(studentInfo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.student = action.payload.data;
				toast.success("Fetched student info");
			})
			.addCase(studentInfo.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching student info: ${action.payload}`);
			})

			.addCase(allStudents.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(allStudents.fulfilled, (state, action) => {
				state.isLoading = false;
				state.allStudents = [...action.payload.data];
				toast.success("Fetched all students");
			})
			.addCase(allStudents.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching all students: ${action.payload}`);
			})

			.addCase(allStudentsByBatch.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(allStudentsByBatch.fulfilled, (state, action) => {
				state.isLoading = false;
				state.allStudents = [...action.payload.data];
				toast.success("Fetched students by batch");
			})
			.addCase(allStudentsByBatch.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching students by batch: ${action.payload}`);
			})

			.addCase(allStudentsByCourse.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.errorMessage = "";
			})
			.addCase(allStudentsByCourse.fulfilled, (state, action) => {
				state.isLoading = false;
				state.allStudents = [...action.payload.data];
				toast.success("Fetched students by course");
			})
			.addCase(allStudentsByCourse.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.errorMessage = action.payload;
				toast.error(`Error fetching students by course: ${action.payload}`);
			});
	},
});

export default studentSlice.reducer;
