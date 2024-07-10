import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllLabs = createAsyncThunk("getAllLabs", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/labs", {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json()
	return result;
})


export const createLab = createAsyncThunk("createLab", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/labs", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	const result = await response.json()
	return result;
})



export const deleteLab = createAsyncThunk("deleteLab", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/labs/${data.labId}`, {
		method: "DELETE",
		credentials: "include"
	})

	const result = await response.json()
	return result;
})


const initialState = {
	labs: []
}

export const labSlice = createSlice(
	{
		name: "lab",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(getAllLabs.fulfilled, (state, action) => {
				state.labs = [...action.payload.data]
			})

			builder.addCase(createLab.fulfilled, (state, action) => {
				state.labs.push(action.payload.data)
			})
			builder.addCase(deleteLab.fulfilled, (state, action) => {
				const index = state.labs.findIndex((element) => {
					return element._id == action.payload.data._id
				})

				state.labs.splice(index, 1)
			})

		}
	}
)

export default labSlice.reducer

