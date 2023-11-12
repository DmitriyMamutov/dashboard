import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "",
    email: "",
    avatarUrl: "/static/images/dashboard/header/avatar.png",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginAccount: (state, action) => {
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
        avatarUrl: action.payload.image,
      };
    },
    logoutAccount: (state) => {
      state.user = initialState;
    },
  },
});

export const { loginAccount, logoutAccount } = userSlice.actions;

export default userSlice.reducer;
