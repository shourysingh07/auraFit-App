import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
    //   console.log(action.payload);
      state.user=action.payload;
    },
    logout:(state,action)=>{
        state.user.name=''
        state.user.email=''
    }
  },
});

export const { login,logout } = userSlice.actions;

export default userSlice.reducer;
