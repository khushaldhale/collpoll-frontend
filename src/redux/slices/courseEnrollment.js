import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const createCourseEnrollment = createAsyncThunk("createCourseEnrollment", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/course-enrollment", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	return await response.json()
})



const initialState = {
	courseEnrollmentData: {}
}


export const courseEnrollmentSlice = createSlice(
	{
		name: "courseEnrolllment",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(createCourseEnrollment.fulfilled, (state, action) => {
				console.log("course enrollment data", action.payload)
				state.courseEnrollmentData = action.payload.data
			})

		}
	}
)


export default courseEnrollmentSlice.reducer