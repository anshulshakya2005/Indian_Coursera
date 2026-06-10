import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   loading:false,
   user:null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setloading(state,value){
                    state.loading = value.payload;
                }
    },
});

// ✅ export actions
export const { setUser,setloading } = profileSlice.actions;

// ✅ export reducer
export default profileSlice.reducer;