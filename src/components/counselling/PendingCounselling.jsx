import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admitStudent,
  denyAdmission,
  getPendingStudents,
} from "../../redux/slices/pendingStudentsSlice";
import { getAllCourses } from "../../redux/slices/courseSlice";
import {
  createInstallment,
  installment_student,
  payInstallment,
} from "../../redux/slices/installment";
import { createCourseEnrollment } from "../../redux/slices/courseEnrollment";

const PendingCounselling = () => {
  //to capture a data
  const [formData, setFormData] = useState({
    course_enrolled: "",
    student: "",
    course: "",
    isLumpsum: true,
    totalAmountPaid: "",
    installments: [],
  });

  // to store complete information of the course that student is going to enroll into
  const [courseData, setCourseData] = useState(undefined);

  const dispatch = useDispatch();

  // pending students who are not enrolled into the course  yet
  const pendingStudents = useSelector(
    (state) => state.pendingStudents.pendingStudents
  );
  // all  courses in the system
  const allCourses = useSelector((state) => state.course.allCourses);
  //installments for that particular student and course
  const installments = useSelector((state) => state.installment.installments);

  // to load initial data
  useEffect(() => {
    // all students  who havnt taken admission are fetched
    dispatch(getPendingStudents()).then((data) => {
      if (data.payload.success) {
        console.log("Pending students are fetched");
      }
    });

    // all courses in the system are fetched
    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("All courses are fetched successfully");
      }
    });
  }, [dispatch]);

  // captueing data on onchange
  function changeHandler(event, student) {
    const { name, type, value } = event.target;

    if (name === "isInstallment" && event.target.checked == true) {
      dispatch(installment_student({ student, course: courseData._id })).then(
        (data) => {
          if (data.payload.success) {
            console.log("installments are fetched succesfully");
          }
        }
      );
    }

    // creating installment if lumpsum is false
    if (name === "isLumpsum" && event.target.checked == false) {
      dispatch(createInstallment({ student, courseId: courseData._id })).then(
        (data) => {
          if (data.payload.success) {
            const installmentId = data.payload.data.map((element) => {
              return element._id;
            });

            setFormData((prevData) => ({
              ...prevData,
              installments: installmentId,
            }));
            console.log("Installment is created successfully");
          }
        }
      );
    }

    // setting up the data
    if (name === "course_enrolled") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        course: value,
      }));
      const selectedOption = event.target.selectedOptions[0];
      const courseObject = JSON.parse(selectedOption.dataset.course);
      setCourseData(courseObject);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? event.target.checked : value,
      }));
    }
  }

  return (
    <div className="p-4 max-w-6xl mx-auto w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Pending Counselling
      </h2>
      <div className="flex flex-col gap-6 mt-6">
        {pendingStudents.length > 0 ? (
          pendingStudents.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4 w-full"
            >
              <p className="text-xl font-semibold text-center">
                {element.fname + " "} {element.lname}
              </p>
              <p className="text-gray-700 text-center">{element.email}</p>
              <p className="text-gray-600 text-center">{element.contact}</p>
              <p className="text-gray-600 text-center">
                {element.course_interested_in.course_name}
              </p>

              {courseData && (
                <div>
                  <p>Course name: {courseData.course_name}</p>
                  <p>Course desc: {courseData.course_desc}</p>
                  <p>Lumpsum fees: {courseData.lumpsum_price}</p>
                  <p>Installment fees: {courseData.installment_price}</p>
                  <p>
                    Number of installments: {courseData.number_of_installment}
                  </p>
                  {courseData.installments.map((element, index) => (
                    <div key={index}>
                      <p>Installment No: {index + 1}</p>
                      <p>Installment amount: {element.amount}</p>
                      <p>Installment Due Day: {element.due_day}</p>
                    </div>
                  ))}
                </div>
              )}

              <form className="space-y-4">
                <select
                  name="course_enrolled"
                  id="course_enrolled"
                  onChange={changeHandler}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Course</option>
                  {allCourses.map((element) => (
                    <option
                      key={element._id}
                      value={element._id}
                      data-course={JSON.stringify(element)}
                    >
                      {element.course_name}
                    </option>
                  ))}
                </select>
                <label htmlFor="isLumpsum" className="flex items-center">
                  <input
                    type="checkbox"
                    id="isLumpsum"
                    name="isLumpsum"
                    checked={formData.isLumpsum}
                    onChange={(event) => changeHandler(event, element._id)}
                    className="mr-2"
                  />
                  Is Lumpsum
                </label>

                <label htmlFor="isInstallment" className="flex items-center">
                  <input
                    type="checkbox"
                    id="isInstallment"
                    name="isInstallment"
                    onChange={(event) => changeHandler(event, element._id)}
                    className="mr-2"
                  />
                  Is Installment
                </label>

                {installments.length > 0 &&
                  installments.map((element) => (
                    <div key={element._id} className="space-y-2">
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        value={element.amount}
                        className="w-full p-2 border rounded"
                        readOnly
                      />
                      <input
                        type="text"
                        name="due_date"
                        id="due_date"
                        value={element.due_date}
                        className="w-full p-2 border rounded"
                        readOnly
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            payInstallment({ installmentId: element._id })
                          ).then((data) => {
                            if (data.payload.success) {
                              console.log(
                                "Installment is modified successfully"
                              );
                            }
                          });
                        }}
                        className="w-full p-2 border rounded bg-gray-200 hover:bg-gray-300"
                      >
                        Pay Installment
                      </button>
                    </div>
                  ))}

                <input
                  type="number"
                  id="totalAmountPaid"
                  name="totalAmountPaid"
                  placeholder="Enter Total Amount"
                  onChange={changeHandler}
                  className="w-full p-2 border rounded"
                />
              </form>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    formData.userId = element._id;
                    formData.student = element._id;
                    console.log("formData is ", formData);
                    dispatch(admitStudent(formData)).then((data) => {
                      if (data.payload.success) {
                        console.log("Admission given");
                      }
                    });

                    dispatch(createCourseEnrollment(formData)).then((data) => {
                      if (data.payload.success) {
                        console.log("Course is enrolled successfully");
                      }
                    });
                  }}
                  className="border rounded-lg py-2 px-4 w-full max-w-xs text-center hover:bg-gray-200"
                >
                  Give Admission
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    dispatch(denyAdmission({ studentId: element._id })).then(
                      (data) => {
                        if (data.payload.success) {
                          console.log("Admission denied and data deleted");
                        }
                      }
                    );
                  }}
                  className="border rounded-lg py-2 px-4 w-full max-w-xs text-center hover:bg-gray-200"
                >
                  Deny Admission
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">
            No pending students for counselling
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingCounselling;
