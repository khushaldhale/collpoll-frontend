import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// one APi is remained  to apply here


export const getAllCategories = createAsyncThunk("getAllCategories", async () => {
	const response = await fetch("http://localhost:4000/api/v1/categories", {
		method: "GET",
		credentials: "include"
	})

	const result = await response.json();
	console.log("categories are fetched : ", result)
	return result;
})


export const createCategory = createAsyncThunk("createCategory", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/categories", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"


	})

	const result = await response.json();

	return result;
})


export const updateCategory = createAsyncThunk("updateCategory", async (data) => {

	const response = await fetch(`http://localhost:4000/api/v1/categories/${data.id}`, {
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



export const getSingleCategory = createAsyncThunk("getSingleCategory", async (id) => {
	const response = await fetch(`http://localhost:4000/api/v1/categories/${id}`, {
		method: "GET",
		credentials: "include"


	})

	const result = await response.json();

	return result;
})


export const deleteCategory = createAsyncThunk("deleteCategory", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/categories/${data._id}`, {
		method: "DELETE",
		credentials: "include"


	})

	const result = await response.json();

	return result;
})


const initialState = {
	categories: []
}


export const categorySlice = createSlice(
	{
		name: "category",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(getAllCategories.fulfilled, (state, action) => {
				state.categories = [...action?.payload?.data]
			})

			builder.addCase(createCategory.fulfilled, (state, action) => {
				state.categories.push(action.payload.data)
			})


			builder.addCase(updateCategory.fulfilled, (state, action) => {

				const index = state.categories.findIndex((element) => {
					return element._id === action.payload.data._id
				})

				state.categories[index] = action.payload.data

			})

			builder.addCase(deleteCategory.fulfilled, (state, action) => {
				const index = state.categories.findIndex((element) => {
					console.log(element._id)
					console.log("index to match", action.payload.data._id)
					return element._id == action.payload.data._id
				})
				console.log("index is ", index)
				state.categories.splice(index, 1)
			})
		}
	}
)


export default categorySlice.reducer