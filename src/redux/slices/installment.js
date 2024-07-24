import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// we have to apply so many checks here
export const createInstallment = createAsyncThunk("createInstallment", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/installment", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})


	return await response.json()
})


export const payInstallment = createAsyncThunk("payInstallment", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/installment/pay", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"
	})

	return await response.json()
})


export const installment_student = createAsyncThunk("installment_student", async (data) => {
	const response = await fetch(`http://localhost:4000/api/v1/installment/student/?course=${data.course}&student=${data.student}`, {
		method: "GET",
		credentials: "include"
	})

	return await response.json()
})

const initialState = {
	installments: []   // installment for particular student and course altogether
}


export const installmentSlice = createSlice({
	name: "installment",
	initialState,
	extraReducers: (builder) => {

		// we have to add checks over frontend also , that zero is not acceptable while giving, 
		// number of instalments
		builder.addCase(createInstallment.fulfilled, (state, action) => {
			console.log("installments are created ", action.payload)

		})

		builder.addCase(installment_student.fulfilled, (state, action) => {
			console.log("installments are fetched ", action.payload)
			state.installments = [...action.payload.data]

		})


		// installment is modified
		builder.addCase(payInstallment.fulfilled, (state, action) => {
			const index = state.installments.findIndex((element) => {
				return element._id === action.payload.data._id
			})

			state.installments[index] = action.payload.data
		})
	}
})


export default installmentSlice.reducer