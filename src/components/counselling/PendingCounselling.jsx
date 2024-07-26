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
  const [formData, setFormData] = useState({
    course_enrolled: "",
    student: "",
    course: "",
    isLumpsum: true,
    totalAmountPaid: "",
    installments: [],
  });

  const [courseData, setCourseData] = useState(undefined);

  const dispatch = useDispatch();
  const pendingStudents = useSelector(
    (state) => state.pendingStudents.pendingStudents
  );
  const allCourses = useSelector((state) => state.course.allCourses);
  const installments = useSelector((state) => state.installment.installments);

  useEffect(() => {
    dispatch(getPendingStudents()).then((data) => {
      if (data.payload.success) {
        console.log("Pending students are fetched");
      }
    });

    dispatch(getAllCourses()).then((data) => {
      if (data.payload.success) {
        console.log("All courses are fetched successfully");
      }
    });
  }, [dispatch]);

  function changeHandler(event, student) {
    const { name, type, value } = event.target;

    if (name === "isInstallment" && event.target.checked) {
      dispatch(installment_student({ student, course: courseData._id })).then(
        (data) => {
          if (data.payload.success) {
            console.log("Installments are fetched successfully");
          }
        }
      );
    }

    if (name === "isLumpsum" && !event.target.checked) {
      dispatch(createInstallment({ student, courseId: courseData._id })).then(
        (data) => {
          if (data.payload.success) {
            const installmentId = data.payload.data.map(
              (element) => element._id
            );
            setFormData((prevData) => ({
              ...prevData,
              installments: installmentId,
            }));
            console.log("Installment is created successfully");
          }
        }
      );
    }

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
    <div className="p-6 max-w-6xl mx-auto w-full">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Pending Counselling
      </h2>
      <div className="space-y-6">
        {pendingStudents.length > 0 ? (
          pendingStudents.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4 w-full"
            >
              <p className="text-xl font-semibold text-center">
                {element.fname} {element.lname}
              </p>
              <p className="text-gray-700 text-center">
                Email: {element.email}
              </p>

              <p className="text-gray-600 text-center">
                Interested in: {element.course_interested_in.course_name}
              </p>

              <form className="space-y-4">
                <select
                  name="course_enrolled"
                  id="course_enrolled"
                  onChange={(event) => changeHandler(event, element._id)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Course</option>
                  {allCourses.map((course) => (
                    <option
                      key={course._id}
                      value={course._id}
                      data-course={JSON.stringify(course)}
                    >
                      {course.course_name}
                    </option>
                  ))}
                </select>

                {courseData && (
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-lg font-medium mb-2">Course Details</h3>
                    <p>
                      <strong>Course Name:</strong> {courseData.course_name}
                    </p>
                    <p>
                      <strong>Description:</strong> {courseData.course_desc}
                    </p>
                    <p>
                      <strong>Lumpsum Fees:</strong> {courseData.lumpsum_price}
                    </p>
                    <p>
                      <strong>Installment Fees:</strong>{" "}
                      {courseData.installment_price}
                    </p>
                    <p>
                      <strong>Number of Installments:</strong>{" "}
                      {courseData.number_of_installment}
                    </p>
                    {courseData.installments.map((installment, index) => (
                      <div key={index} className="mt-2">
                        <p>
                          <strong>Installment No:</strong> {index + 1}
                        </p>
                        <p>
                          <strong>Amount:</strong> {installment.amount}
                        </p>
                        <p>
                          <strong>Due Day:</strong> {installment.due_day}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <label htmlFor="isLumpsum" className="flex items-center">
                    <input
                      type="checkbox"
                      id="isLumpsum"
                      name="isLumpsum"
                      checked={formData.isLumpsum}
                      onChange={(event) => changeHandler(event, element._id)}
                      className="mr-2"
                    />
                    Lumpsum Payment
                  </label>

                  <label htmlFor="isInstallment" className="flex items-center">
                    <input
                      type="checkbox"
                      id="isInstallment"
                      name="isInstallment"
                      onChange={(event) => changeHandler(event, element._id)}
                      className="mr-2"
                    />
                    Installment Payment
                  </label>
                </div>

                {installments.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {installments.map((installment) => (
                      <div
                        key={installment._id}
                        className="bg-gray-50 border rounded-lg p-4 flex-1 max-w-xs"
                      >
                        <input
                          type="number"
                          name="amount"
                          id="amount"
                          value={installment.amount}
                          className="w-full p-2 border rounded-lg"
                          readOnly
                        />
                        <input
                          type="text"
                          name="due_date"
                          id="due_date"
                          value={installment.due_date}
                          className="w-full p-2 border rounded-lg mt-2"
                          readOnly
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(
                              payInstallment({ installmentId: installment._id })
                            ).then((data) => {
                              if (data.payload.success) {
                                console.log("Installment is paid successfully");
                              }
                            });
                          }}
                          className="w-full p-2 border rounded-lg bg-green-500 text-white hover:bg-green-600 mt-2"
                        >
                          Pay Installment
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="number"
                  id="totalAmountPaid"
                  name="totalAmountPaid"
                  placeholder="Enter Total Amount"
                  onChange={changeHandler}
                  className="w-full p-2 border rounded-lg"
                />
              </form>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => {
                    formData.userId = element._id;
                    formData.student = element._id;
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
                  className="border rounded-lg py-2 px-4 w-full text-center bg-blue-500 text-white hover:bg-blue-600"
                >
                  Give Admission
                </button>
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
                  className="border rounded-lg py-2 px-4 w-full text-center bg-red-500 text-white hover:bg-red-600"
                >
                  Deny Admission
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No pending students</p>
        )}
      </div>
    </div>
  );
};

export default PendingCounselling;
