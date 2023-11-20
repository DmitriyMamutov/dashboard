import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const studentsSlice = createSlice({
  name: "students",
  initialState: initialState,
  reducers: {
    getStudents: (state, action) => {
      state.students = action.payload;
    },
    sortStudentsAz: (state) => {
      state.students = state.students.sort((a, b) =>
        a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1,
      );
    },
    sortStudentsZa: (state) => {
      state.students = state.students.sort((a, b) =>
        a.firstName.toLowerCase() > b.firstName.toLowerCase() ? -1 : 1,
      );
    },
    sortStudentsAgeYoungest: (state) => {
      state.students = state.students.sort((a, b) => a.age - b.age);
    },
    sortStudentsAgeOldest: (state) => {
      state.students = state.students.sort((a, b) => b.age - a.age);
    },
    sortStudentsDefault: (state) => {
      state.students = state.students.sort((a, b) => a.id - b.id);
    },
    addStudent: (state, action) => {
      state.students.push({
        id: action.payload.id,
        image: "/static/images/dashboard/header/avatar.png",
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        age: action.payload.age,
        email: action.payload.email,
        company: {
          title: action.payload.company.title,
          department: action.payload.company.department,
        },
      });
    },
    updateCurrentStudent: (state, action) => {
      const updatedStudent = state.students.find(
        (item) => item.id === action.payload.id,
      );
      updatedStudent.firstName = action.payload.firstName;
      updatedStudent.image = action.payload.image;
      updatedStudent.lastName = action.payload.lastName;
      updatedStudent.age = action.payload.age;
      updatedStudent.email = action.payload.email;
      updatedStudent.company.title = action.payload.company.title;
      updatedStudent.company.department = action.payload.company.department;
    },
  },
});

export const {
  getStudents,
  addStudent,
  updateCurrentStudent,
  sortStudentsAz,
  sortStudentsZa,
  sortStudentsAgeYoungest,
  sortStudentsAgeOldest,
  sortStudentsDefault,
} = studentsSlice.actions;

export default studentsSlice.reducer;
