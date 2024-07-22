import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getPendingStudents = createAsyncThunk("getPendingStudents", async () => {

	const response = await fetch("http://localhost:4000/api/v1/admission/not-admitted", {
		method: "GET",
		credentials: "include"
	})


	const result = await response.json();
	console.log("pending students are at front", result)
	return result;
})



// give user id
// provide which course they have enrolled in, is it installment basis or something else
export const admitStudent = createAsyncThunk("admitStudent", async (data) => {

	const response = await fetch("http://localhost:4000/api/v1/admission/take-admission", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})


	const result = await response.json();
	return result;
})


export const denyAdmission = createAsyncThunk("denyAdmission", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/${data.studentId}/admission/deny-admission`, {
		method: "DELETE",
		credentials: "include"

	})

	return await response.json()
})

const initialState = {
	pendingStudents: []
}


export const pendingStudentsSlice = createSlice(
	{
		name: "pendingStudents",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(getPendingStudents.fulfilled, (state, action) => {
				console.log(" pending students are", action.payload.data)
				state.pendingStudents = [...action.payload.data]
			})

			builder.addCase(admitStudent.fulfilled, (state, action) => {
				console.log(action.payload)
				const index = state.pendingStudents.findIndex((element) => {
					return element._id == action.payload.data._id;
				})

				state.pendingStudents.splice(index, 1)
			})
			builder.addCase(denyAdmission.fulfilled, (state, action) => {
				const index = state.pendingStudents.findIndex((element) => {
					return element._id == action.payload.data._id;
				})

				state.pendingStudents.splice(index, 1)
			})

		}
	}
)


export default pendingStudentsSlice.reducer