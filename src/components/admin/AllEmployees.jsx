import React from "react";
import { useDispatch } from "react-redux";
import accountType from "../../constants/application";
import { getAllInstructor } from "../../redux/slices/instructorSlice";
import { allCounsellors } from "../../redux/slices/counsellorSlice";

const AllEmployees = () => {
  const dispatch = useDispatch();
  function changeHandler(event) {
    if (event.target.value == accountType.instructor) {
      dispatch(getAllInstructor()).then((data) => {
        if (data.payload.success) {
          console.log("all instructors are fetched");
        }
      });
    } else {
      dispatch(allCounsellors()).then((data) => {
        if (data.payload.success) {
          console.log("all instructors are fetched");
        }
      });
    }
  }
  return (
    <div>
      <p>select a filter</p>

      <form method="post">
        <select name="employeeType" id="employeeType" onChange={changeHandler}>
          <option value="">select employee type</option>
          <option value={accountType.instructor}>Instructor</option>
          <option value={accountType.counsellor}>Counsellor</option>
        </select>
      </form>
    </div>
  );
};

export default AllEmployees;
