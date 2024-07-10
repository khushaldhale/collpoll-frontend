import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const batchesByLab = createAsyncThunk("batchesByLab", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/labs/${data.labId}/batches`, {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json()
	return result;
})


export const ParticularBatch = createAsyncThunk("ParticularBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/labs/${data.labId}/batches/${data.batchId}`, {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json()
	return result;
})

export const createBatch = createAsyncThunk("createBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/labs/${data.labId}/batches`, {
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



export const deleteBatch = createAsyncThunk("deleteBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/labs/${data.labId}/batches/${data.batchId}`, {
		method: "DELETE",
		credentials: "include"
	})

	const result = await response.json()
	return result;
})



export const updateBatch = createAsyncThunk("updateBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/labs/${data.labId}/batches/${data.batchId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	const result = await response.json()
	return result;
})


const initialState = {
	batches: []
}

export const batchSlice = createSlice(
	{
		name: "batch",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(batchesByLab.fulfilled, (state, action) => {
				state.batches = [...action.payload.data]
			})

			builder.addCase(createBatch.fulfilled, (state, action) => {
				state.batches.push(action.payload.data)
			})


			builder.addCase(updateBatch.fulfilled, (state, action) => {
				const index = state.batches.findIndex((element) => {
					return element._id == action.payload.data._id
				})
				state.batches[index] = action.payload.data
			})

			builder.addCase(deleteBatch.fulfilled, (state, action) => {
				const index = state.batches.findIndex((element) => {
					return element._id == action.payload.data._id
				})
				state.batches.splice(index, 1)
			})
		}
	}
)

export default batchSlice.reducer

