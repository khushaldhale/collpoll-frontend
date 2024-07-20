import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getAllInstructor = createAsyncThunk("getAllInstructor", async () => {
	const response = await fetch("http://localhost:4000/api/v1/instructors/all", {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})


const initialState = {
	instructors: []
}

export const instructorSlice = createSlice(
	{
		name: "instructor",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(getAllInstructor.fulfilled, (state, action) => {
				state.instructors = [...action.payload.data]
			})
		}
	}
)


export default instructorSlice.reducer;