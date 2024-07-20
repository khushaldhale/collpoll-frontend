import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const CoursesByCategory = createAsyncThunk("CoursesByCategory", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/categories/${data.categoryId}/courses`, {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json();
	return result;
})



export const particularCourse = createAsyncThunk("particularCourse", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/categories/${data.categoryId}/courses/${data.courseId}`, {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json();
	return result;
})



export const deleteCourse = createAsyncThunk("deleteCourse", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/categories/${data.categoryId}/courses/${data.courseId}`, {
		method: "DELETE",
		credentials: "include"
	})

	const result = await response.json();
	return result;
})

export const createCourse = createAsyncThunk("createCourse", async (data) => {
	const { categoryId } = data;
	console.log(categoryId)
	delete data.courseId;
	const response = await fetch(`http://localhost:4000/api/v1/categories/${categoryId}/courses`, {
		method: "POST",
		headers: {
			'Content-Type': "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	const result = await response.json();
	console.log("course creation ", result)
	return result
})


export const updateCourse = createAsyncThunk("updateCourse", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/categories/${data.categoryId}/courses/${data.courseId}`, {
		method: "PUT",
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	const result = await response.json();
	return result
})


export const getAllCourses = createAsyncThunk("getAllCourses", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/courses", {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json();
	return result;
})







const initialState = {
	// it stores courses by category
	courses: [],

	// here all courses are stored
	allCourses: []
}



export const courseSlice = createSlice(
	{
		name: "course",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(CoursesByCategory.fulfilled, (state, action) => {
				console.log(action.payload)
				state.courses = [...action.payload.data]
			})

			builder.addCase(deleteCourse.fulfilled, (state, action) => {
				const index = state.courses.findIndex((element) => {
					return element._id == action.payload.data._id
				})

				state.courses.splice(index, 1)
			})

			builder.addCase(getAllCourses.fulfilled, (state, action) => {
				state.allCourses = [...action.payload.data]
			})



		}
	}
)

export default courseSlice.reducer;