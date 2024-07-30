import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admitStudent,
  denyAdmission,
  getPendingStudents,
} from "../../redux/slices/pendingStudentsSlice";
import { getAllCourses } from "../../redux/slices/courseSlice";
import { payInstallment } from "../../redux/slices/installment";
import { createCourseEnrollment } from "../../redux/slices/courseEnrollment";

const PendingCounselling = () => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  // pending students
  const pendingStudents = useSelector(
    (state) => state.pendingStudents.pendingStudents
  );
  // all courses
  const allCourses = useSelector((state) => state.course.allCourses);

  // loading all initial data
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

  function changeHandler(event, student_id) {
    const { name, value, type } = event.target;

    if (name === "course_enrolled") {
      const selectedIndex = event.target.selectedIndex;
      const selectedOption = event.target.options[selectedIndex];
      const courseData = JSON.parse(selectedOption.getAttribute("data-course"));
      const installmentsWithIsPaid = courseData.installments.map((inst) => ({
        ...inst,
        isPaid: false,
      }));

      setFormData((prevData) => {
        return {
          ...prevData,
          [student_id]: {
            ...prevData[student_id],
            [name]: type === "checkbox" ? event.target.checked : value,
            installments: installmentsWithIsPaid,
            isLumpsum: true,
          },
        };
      });
    } else {
      setFormData((prevData) => {
        return {
          ...prevData,
          [student_id]: {
            ...prevData[student_id],
            [name]: type === "checkbox" ? event.target.checked : value,
          },
        };
      });
    }
  }

  const handlePayInstallment = (studentId, installmentIndex) => {
    setFormData((prevData) => {
      const updatedInstallments = prevData[studentId].installments.map(
        (installment, index) => {
          if (index === installmentIndex) {
            return {
              ...installment,
              isPaid: true,
              paid_date: new Date(Date.now()),
            };
          }
          return installment;
        }
      );

      return {
        ...prevData,
        [studentId]: {
          ...prevData[studentId],
          installments: updatedInstallments,
        },
      };
    });

    // Optionally, dispatch an action to update the backend
    // dispatch(payInstallment({ studentId, installmentIndex }));
  };

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

                {formData[element._id]?.installments?.length === 0 && (
                  <p>Installment option is not available. </p>
                )}

                <div className="flex flex-col gap-4">
                  <label htmlFor="isLumpsum" className="flex items-center">
                    <input
                      type="checkbox"
                      id="isLumpsum"
                      name="isLumpsum"
                      checked={formData[element._id]?.isLumpsum}
                      onChange={(event) => changeHandler(event, element._id)}
                      className="mr-2"
                    />
                    Lumpsum Payment
                  </label>
                </div>

                {formData[element._id]?.isLumpsum === false &&
                  formData[element._id]?.installments?.map(
                    (installment, index) => {
                      return (
                        <div key={index}>
                          <input
                            type="number"
                            name="amount"
                            value={installment.amount}
                            readOnly
                          />
                          <input
                            type="number"
                            name="due_day"
                            value={installment.due_day}
                            readOnly
                          />
                          <p
                            onClick={() =>
                              handlePayInstallment(element._id, index)
                            }
                            className="cursor-pointer text-blue-500"
                          >
                            Pay Installment
                          </p>
                        </div>
                      );
                    }
                  )}

                <input
                  type="number"
                  id="totalAmountPaid"
                  name="totalAmountPaid"
                  placeholder="Enter Total Amount"
                  onChange={(event) => {
                    changeHandler(event, element._id);
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              </form>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => {
                    console.log(formData);
                    formData[element._id].student = element._id;
                    console.log(formData[element._id]);
                    dispatch(
                      createCourseEnrollment(formData[element._id])
                    ).then((data) => {
                      if (data.payload.success) {
                        console.log("enrolled in the course");
                      }
                    });
                  }}
                  className="border rounded-lg py-2 px-4 w-full text-center bg-blue-500 text-white hover:bg-blue-600"
                >
                  Give Admission
                </button>
                <button
                  onClick={() => {}}
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
