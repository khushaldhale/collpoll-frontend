import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const createSub = createAsyncThunk("createSub", async (data) => {
	const { categoryId, courseId } = data;
	const response = await fetch(
		`http://localhost:4000/api/v1/categories/${categoryId}/courses/${courseId}/sub`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			credentials: "include",
		}
	);

	const result = await response.json();
	return result;
});

export const subByCategory = createAsyncThunk("subByCategory", async (data) => {
	const { categoryId, courseId } = data;

	const response = await fetch(
		`http://localhost:4000/api/v1/categories/${categoryId}/courses/${courseId}/sub`,
		{
			method: "GET",
			credentials: "include",
		}
	);
	const result = await response.json();

	return result;
});

export const deleteSub = createAsyncThunk("deleteSub", async (data) => {
	const { categoryId, courseId, subjectId } = data;

	const response = await fetch(
		`http://localhost:4000/api/v1/categories/${categoryId}/courses/${courseId}/sub/${subjectId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);
	const result = await response.json();

	return result;
});

export const updateSub = createAsyncThunk("updateSub", async (data) => {
	const { categoryId, courseId, subjectId } = data;

	const response = await fetch(
		`http://localhost:4000/api/v1/categories/${categoryId}/courses/${courseId}/sub/${subjectId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			credentials: "include",
		}
	);
	const result = await response.json();

	return result;
});


// fetch the sub via course only

export const subByCourse = createAsyncThunk("subByCourse", async (data) => {
	//courseId it is an  object here not ID total object is sent 
	const { courseId } = data;
	const response = await fetch(
		`http://localhost:4000/api/v1/subjects/${courseId._id}`, // given  id here now
		{
			method: "GET",
			credentials: "include",
		}
	);
	const result = await response.json();

	return result;
});

export const particularSub = createAsyncThunk("particularSub", async (data) => {
	const { subjectId } = data;

	const response = await fetch(
		`http://localhost:4000/api/v1/sub/${subjectId}`,
		{
			method: "GET",
			credentials: "include",
		}
	);
	const result = await response.json();

	return result;
});


const initialState = {
	subjects: [],
	subByCourse: []
};

export const subjectSlice = createSlice({
	name: "subject",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(subByCategory.fulfilled, (state, action) => {
			state.subjects = [...action.payload.data];
		});
		builder.addCase(createSub.fulfilled, (state, action) => {
			state.subjects.push(action.payload.data);
		});
		builder.addCase(updateSub.fulfilled, (state, action) => {
			const index = state.subjects.findIndex((element) => {
				return element._id == action.payload.data._id;
			});

			state.subjects[index] = action.payload.data;
		});
		builder.addCase(deleteSub.fulfilled, (state, action) => {
			const index = state.subjects.findIndex((element) => {
				return element._id == action.payload.data._id;
			});
			state.subjects.splice(index, 1);
		});
		builder.addCase(subByCourse.fulfilled, (state, action) => {
			state.subByCourse = [...action.payload.data];
		});
		builder.addCase(particularSub.fulfilled, (state, action) => {
			// not storing  aqnything in redux store
			console.log("particular subject is fetched ", action.payload.data)
		});
	},
});

export default subjectSlice.reducer;
