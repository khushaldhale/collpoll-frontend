import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const createTopic = createAsyncThunk("createTopic", async (data) => {
	const { categoryId, courseId, subjectId } = data;
	const response = await fetch(`http://localhost:4000/api/v1/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	const result = await response.json()
	return result
})


export const updateTopic = createAsyncThunk("updateTopic", async (data) => {
	const { categoryId, courseId, subjectId, topicId } = data;
	const response = await fetch(`http://localhost:4000/api/v1/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics/${topicId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	const result = await response.json()
	return result
})



export const deleteTopic = createAsyncThunk("deleteTopic", async (data) => {
	const { categoryId, courseId, subjectId, topicId } = data;
	const response = await fetch(`http://localhost:4000/api/v1/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics/${topicId}`, {
		method: "DELETE",
		credentials: "include"
	})

	const result = await response.json()
	return result
})

export const topicBySub = createAsyncThunk("topicBySub", async (data) => {
	const { categoryId, courseId, subjectId } = data;
	const response = await fetch(`http://localhost:4000/api/v1/categories/${categoryId}/courses/${courseId}/sub/${subjectId}/topics`, {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json()
	return result
})





const initialState = {
	topics: []
}
export const topicSlice = createSlice(
	{
		name: "topic",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(topicBySub.fulfilled, (state, action) => {
				state.topics = [...action.payload.data]
			})
			builder.addCase(createTopic.fulfilled, (state, action) => {
				state.topics.push(action.payload.data)
			})
			builder.addCase(updateTopic.fulfilled, (state, action) => {
				const index = state.topics.findIndex((element) => {
					return element._id == action.payload.data._id
				})

				state.topics[index] = action.payload.data
			})
			builder.addCase(deleteTopic.fulfilled, (state, action) => {
				const index = state.topics.findIndex((element) => {
					return element._id == action.payload.data._id
				})

				state.topics.splice(index, 1)
			})

		}
	}
)
export default topicSlice.reducer