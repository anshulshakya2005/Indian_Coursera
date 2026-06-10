import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    token: localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setloading(state,value){
            state.loading = value.payload;
        }
    },
});

// ✅ export actions
export const { setToken,setloading } = authSlice.actions;

// ✅ export reducer
export default authSlice.reducer;