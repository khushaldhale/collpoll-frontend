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





const initialState = {

	students_no_batch: [], // students who are not allocated to batch
	students_batch_alloted: [], // we are specifying this , but this  is of no use 
	studentsByBatch: []
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

			builder.addCase(addToBatch.fulfilled, (state, action) => {
				state.students_batch_alloted.push(action.payload.data);
				const index = state.students_no_batch.findIndex((element) => {
					return element._id == action.payload.data;
				})

				state.students_no_batch.splice(index, 1)
			})

		}
	}
)

export default studentSlice.reducer