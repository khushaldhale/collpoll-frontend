import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const markAttendance = createAsyncThunk("markAttendance", async (data) => {
	const response = await fetch('http://localhost:4000/api/v1/attendance', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	return await response.json();
})


export const markHoliday = createAsyncThunk("markHoliday", async (data) => {
	const response = await fetch('http://localhost:4000/api/v1/attendance/mark-holdiday', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	return await response.json();
})


export const attendanceByBatch = createAsyncThunk("attendanceByBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/attendance/all?month=${data.month}&day=${data.day}&batchId=${data.batchId}`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json();
})


export const absentStudentsByBatch = createAsyncThunk("absentStudentsByBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/attendance/absent?month=${data.month}&day=${data.day}&batchId=${data.batchId}`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json();
})



const initialState = {
	attendance: [],
	absentStudents: []
}



export const attendanceSlice = createSlice(
	{
		name: "attendance",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(attendanceByBatch.fulfilled, (state, action) => {
				state.attendance = [...action.payload.data]
			})

			builder.addCase(absentStudentsByBatch.fulfilled, (state, action) => {
				state.absentStudents = [...action.payload.data]
			})

			builder.addCase(markAttendance.fulfilled, (state, action) => {
				state.attendance.push(action.payload.data)
			})
			builder.addCase(markHoliday.fulfilled, (state, action) => {
				state.attendance.push(action.payload.data)
			})

		}
	}
)


export default attendanceSlice.reducer