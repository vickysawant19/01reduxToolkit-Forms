import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    username: "vicky sawant",
  },
  {
    id: 2,
    username: "vitthal sawant",
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const {} = usersSlice.actions;
export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
