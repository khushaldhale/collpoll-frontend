import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const batchesByLab = createAsyncThunk("batchesByLab", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/labs/${data.labId}/batches`, {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json()
	return result;
})



//  not maintainig data at frontend we should do that
// batch is fetched followed by lab Id
export const ParticularBatchByLabId = createAsyncThunk("ParticularBatchByLabId", async (data) => {
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


export const batchesByInstructor = createAsyncThunk("batchesByInstructor", async () => {
	const response = await fetch(`http://localhost:4000/api/v1/instructor/batches`, {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json()
	return result;
})

// create an API to fetch a batch  by  batch ID



export const particularBatch = createAsyncThunk("particularBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/batches/${data.batchId}`, {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json()
	return result;
})


export const allBatches = createAsyncThunk("allBatches", async () => {
	const response = await fetch("http://localhost:4000/api/v1/batches", {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})




const initialState = {
	batches: [],
	instructorBatches: [],
	singleBatch: undefined
}

export const batchSlice = createSlice(
	{
		name: "batch",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(batchesByLab.fulfilled, (state, action) => {
				state.batches = [...action.payload.data]
			})
			builder.addCase(allBatches.fulfilled, (state, action) => {
				state.batches = [...action.payload.data]
			})
			builder.addCase(batchesByInstructor.fulfilled, (state, action) => {
				state.instructorBatches = [...action.payload.data]
			})

			builder.addCase(createBatch.fulfilled, (state, action) => {
				state.batches.push(action.payload.data)
			})


			builder.addCase(updateBatch.fulfilled, (state, action) => {
				console.log(action.payload)
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

			builder.addCase(particularBatch.fulfilled, (state, action) => {
				console.log(" whole data is fetched", action.payload)
				state.singleBatch = action.payload.data;
			})
		}
	}
)

export default batchSlice.reducer

