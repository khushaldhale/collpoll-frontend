import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// define seprate thunk where u are providing counsellor ID to calculate perfromance 
// api is alredy created for that


export const counsellorPerformance = createAsyncThunk("counsellorPerformance", async () => {
	const response = await fetch(`http://localhost:4000/api/v1/counsellor/performance`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})

export const allCounsellors = createAsyncThunk("allCounsellors", async () => {
	const response = await fetch(`http://localhost:4000/api/v1/counsellors/all`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})







const initialState = {
	performance: undefined,
	allCounsellors: undefined
}

export const counsellorSlice = createSlice(
	{
		name: "counsellor",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(counsellorPerformance.fulfilled, (state, action) => {
				console.log("performance ", action.payload)
				state.performance = action.payload.data
			})

			builder.addCase(allCounsellors.fulfilled, (state, action) => {

				state.allCounsellors = [...action.payload.data]
			})

		}

	}
)

export default counsellorSlice.reducer;