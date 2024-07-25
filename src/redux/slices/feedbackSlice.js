import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const notSubmittedFeedback = createAsyncThunk("notSubmittedFeedback", async () => {
	const response = await fetch("http://localhost:4000/api/v1/feedbacks/not-submitted", {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})


export const submitFeedback = createAsyncThunk("submitFeedback", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/feedbacks/${data.feedbackId}/submit`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	return await response.json()

})



export const feedbacksViaBatch = createAsyncThunk("feedbacksViaBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/${data.instructorId}/batches/${data.batchId}/feedbacks`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})



export const instructorPerformanceViaBatch = createAsyncThunk("instructorPerformanceViaBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/instructors/${data.instructorId}/batches/${data.batchId}/performance`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})





const initialState = {
	feedback_not_submitted: [],
	feedbackByBatch: [],
	performance: undefined
}

export const feedbackSlice = createSlice(
	{
		name: "feedback",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(notSubmittedFeedback.fulfilled, (state, action) => {
				console.log(action.payload)
				state.feedback_not_submitted = [...action.payload.data]
			})

			builder.addCase(submitFeedback.fulfilled, (state, action) => {
				console.log("feedback is submitted succesfully", action.payload)


				const index = state.feedback_not_submitted.findIndex((element) => {
					return element._id === action.payload.data._id
				})

				state.feedback_not_submitted.splice(index, 1)

			})
			builder.addCase(feedbacksViaBatch.fulfilled, (state, action) => {
				console.log("feedback of batch ", action.payload)
				state.feedbackByBatch = [...action.payload.data]
			})

			builder.addCase(instructorPerformanceViaBatch.fulfilled, (state, action) => {
				console.log("performance is ", action.payload)
				state.performance = action.payload.data[0]?.averageRating;

			})
		}
	}
)


export default feedbackSlice.reducer