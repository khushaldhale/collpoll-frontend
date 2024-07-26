import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import accountType from "../../constants/application";
import { getAllInstructor } from "../../redux/slices/instructorSlice";
import { allCounsellors } from "../../redux/slices/counsellorSlice";

const AllEmployees = () => {
  const dispatch = useDispatch();

  const [isInstructor, setIsInstructor] = useState(undefined);
  const [isCounsellor, setIsCounsellor] = useState(undefined);

  const counsellors = useSelector((state) => state.counsellor.allCounsellors);
  const instructors = useSelector((state) => state.instructor.instructors);

  function changeHandler(event) {
    if (event.target.value === accountType.instructor) {
      setIsInstructor(true);
      setIsCounsellor(false);
      dispatch(getAllInstructor()).then((data) => {
        if (data.payload.success) {
          console.log("All instructors are fetched", data.payload.data);
        }
      });
    } else {
      dispatch(allCounsellors()).then((data) => {
        setIsInstructor(false);
        setIsCounsellor(true);
        if (data.payload.success) {
          console.log("All counsellors are fetched", data.payload.data);
        }
      });
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Select Employee Type
      </h2>
      <form method="post" className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="employeeType"
            className="text-sm font-medium text-gray-700"
          >
            Employee Type
          </label>
          <select
            name="employeeType"
            id="employeeType"
            onChange={changeHandler}
            className="block w-full p-3 text-lg text-gray-700 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select employee type</option>
            <option value={accountType.instructor}>Instructor</option>
            <option value={accountType.counsellor}>Counsellor</option>
          </select>
        </div>
      </form>

      <div className="mt-6 space-y-4">
        {isInstructor &&
          instructors &&
          instructors.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {element.fname + " " + element.lname}
              </h3>
              <p className="text-gray-600">{element.email}</p>
              {/* Add additional instructor data here */}
            </div>
          ))}

        {isCounsellor &&
          counsellors &&
          counsellors.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {element.fname + " " + element.lname}
              </h3>
              <p className="text-gray-600">{element.email}</p>
              {/* Add additional counsellor data here */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllEmployees;
