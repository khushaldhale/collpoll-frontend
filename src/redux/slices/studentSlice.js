import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addToBatch = createAsyncThunk("addToBatch", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/student/add-to-batch", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	return await response.json()
})


export const notAllocatedBatch = createAsyncThunk("notAllocatedBatch", async () => {
	const response = await fetch("http://localhost:4000/api/v1/students/no-batch-allocated", {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})


export const getstudentsByBatch = createAsyncThunk("getstudentsByBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/students/batches/${data.batchId}`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})

export const studentInfo = createAsyncThunk("studentInfo", async () => {
	const response = await fetch("http://localhost:4000/api/v1/students/info", {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})



//it shoudl  not be here but because of data manipulation we keep this thunk here
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

export const allStudents = createAsyncThunk("allStudents", async () => {
	const response = await fetch("http://localhost:4000/api/v1/students/all", {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})


export const allStudentsByBatch = createAsyncThunk("allStudentsByBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/batches/${data.batchId}/students/all`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})

export const allStudentsByCourse = createAsyncThunk("allStudentsByCourse", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/courses/${data.courseId}/students/all`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})








const initialState = {

	students_no_batch: [], // students who are not allocated to batch
	students_batch_alloted: [], // we are specifying this , but this  is of no use 
	studentsByBatch: [],
	student: undefined,
	allStudents: undefined  // to show all students to admin , we will apply filter there too
}
export const studentSlice = createSlice(
	{
		name: "student",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(notAllocatedBatch.fulfilled, (state, action) => {
				state.students_no_batch = [...action.payload.data]
			})
			builder.addCase(getstudentsByBatch.fulfilled, (state, action) => {
				console.log(action.payload)
				state.studentsByBatch = [...action.payload.data]
			})
			builder.addCase(markAttendance.fulfilled, (state, action) => {
				console.log(action.payload)
				const index = state.studentsByBatch.findIndex((element) => {
					return element._id == action.payload.data._id;
				})
				state.studentsByBatch.splice(index, 1)
			})

			builder.addCase(addToBatch.fulfilled, (state, action) => {
				//pushing the student where batch allocated students are maintained
				console.log(action.payload)
				state.students_batch_alloted.push(action.payload.data);

				const index = state.students_no_batch.findIndex((element) => {
					return element._id == action.payload.data._id;
				})
				state.students_no_batch.splice(index, 1)
			})
			builder.addCase(studentInfo.fulfilled, (state, action) => {
				console.log(action.payload)
				state.student = action.payload.data; // here student  data is assigned and that conatins course 
				// batch information also
			})

			builder.addCase(allStudents.fulfilled, (state, action) => {
				state.allStudents = [...action.payload.data]
			})

			builder.addCase(allStudentsByBatch.fulfilled, (state, action) => {
				console.log("by batch", action.payload)
				state.allStudents = [...action.payload.data]
			})
			builder.addCase(allStudentsByCourse.fulfilled, (state, action) => {
				console.log("by course", action.payload)

				state.allStudents = [...action.payload.data]
			})

		}
	}
)

export default studentSlice.reducer