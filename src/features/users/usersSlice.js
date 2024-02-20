import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  } catch (error) {
    return error;
  }
});
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "Success";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "Pending";
      });
  },
});

export const {} = usersSlice.actions;
export const getStatus = (state) => state.users.status;
export const getError = (state) => state.users.error;
export const selectAllUsers = (state) => state.users.users;
export default usersSlice.reducer;
