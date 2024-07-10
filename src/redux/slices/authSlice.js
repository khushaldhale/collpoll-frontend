import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const sendOTP = createAsyncThunk("sendOTP", async (data) => {

	const response = await fetch("http://localhost:4000/api/v1/auth/otp", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),

	})

	const result = await response.json();

	return result.data;
})

export const registerUser = createAsyncThunk("registerUser", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),


	})

	const result = await response.json();

	return result;
})


export const loginUser = createAsyncThunk("loginUser", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
		credentials: "include"

	})
	const result = await response.json()

	console.log(result)
	return result;
})


export const studentRegistration = createAsyncThunk("studentRegistration", async (data) => {
	const response = await fetch("http://localhost:4000/api/v1/auth/register/student", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),


	})

	const result = await response.json();

	return result;
})




const initialState = {
	user: null,
	loading: false,
	email: null,
	token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: (builder) => {


		builder.addCase(sendOTP.fulfilled, (state, action) => {
			state.email = action.payload.email

		})

		builder.addCase(registerUser.fulfilled, (state) => {
			console.log("User is registered succefully")
		})
		builder.addCase(studentRegistration.fulfilled, (state) => {
			console.log("student is registered succefully")
		})

		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.data
			localStorage.setItem("token", JSON.stringify(action.payload.token))
		})
	}
})
export default authSlice.reducer;