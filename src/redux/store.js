import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import courseSlice from "./slices/courseSlice";
import subjectReducer from "./slices/subjectSlice";
import topicSlice from "./slices/topicSlice";
import labSlice from "./slices/labSlice";
import batchSlice from "./slices/batchSlice";
import pendingStudentsSlice from "./slices/pendingStudentsSlice";
import attendanceSlice from "./slices/attendanceSlice";
import instructorSlice from "./slices/instructorSlice";
import studentSlice from "./slices/studentSlice";
import studyMaterialSlice from "./slices/studyMaterialSlice";
import counsellorSlice from "./slices/counsellorSlice";
import feedbackSlice from "./slices/feedbackSlice";
import installmentSlice from "./slices/installment";
import courseEnrollmentSlice from "./slices/courseEnrollment";

export const store = configureStore({
	reducer: {
		auth: authSlice,
		category: categorySlice,
		course: courseSlice,
		subject: subjectReducer,
		topic: topicSlice,
		lab: labSlice,
		batch: batchSlice,
		pendingStudents: pendingStudentsSlice,
		attendance: attendanceSlice,
		instructor: instructorSlice,
		student: studentSlice,
		studyMaterial: studyMaterialSlice,
		counsellor: counsellorSlice,
		feedback: feedbackSlice,
		installment: installmentSlice,
		courseEnrolllment: courseEnrollmentSlice
	},
});
