import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



// batch  id should also be provideed here , shoudd be taken from params
export const createStudyMaterial = createAsyncThunk("createStudyMaterial", async (data) => {
	console.log(data);
	const formData = new FormData();
	formData.append("notes", data.notes);
	formData.append("subjectId", data.subjectId);

	// Log the FormData entries
	for (let [key, value] of formData.entries()) {
		console.log(`${key}: ${value}`);
	}

	const response = await fetch(`http://localhost:4000/api/v1/batches/${data.batchId}/study-material`, {
		method: "POST",
		// Do not set the Content-Type header manually
		body: formData,
		credentials: "include"
	});

	const result = await response.json();
	return result;
});


// batch and study id  both should be taken from params
export const deleteMaterial = createAsyncThunk("deleteMaterial", async (data) => {
	console.log(data)

	const response = await fetch(`http://localhost:4000/api/v1/batches/${data.batchId}/study-material/${data.studyId}`, {
		method: "DELETE",
		credentials: "include"
	})

	const result = await response.json();
	return result;

})


export const studyMaterialByBatch = createAsyncThunk("studyMaterialByBatch", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/batches/${data.batchId}/study-material`, {
		method: "GET",

		credentials: "include"
	})

	const result = await response.json();
	console.log("study material ", result)
	return result;
})





const initialState = {
	studyMaterials: []
}


export const studyMaterialSlice = createSlice(
	{
		name: "studyMaterial",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(studyMaterialByBatch.fulfilled, (state, action) => {

				console.log("study ka data ", action.payload)

				state.studyMaterials = [...action.payload.data]
			})


			builder.addCase(createStudyMaterial.fulfilled, (state, action) => {
				state.studyMaterials.push(action.payload.data)
			})

			builder.addCase(deleteMaterial.fulfilled, (state, action) => {
				console.log(action.payload.data)
				const index = state.studyMaterials.findIndex((element) => {
					return element._id == action.payload.data._id
				})
				state.studyMaterials.splice(index, 1)

			})


		}
	}
)


export default studyMaterialSlice.reducer