import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user
const initialState = {
  _id:"",
  name: "",
  email: "",
  ViewTask:{}
};

// Create the User slice
export const userSlice = createSlice({
  name: "userTask",
  initialState,
  reducers: {
    setUser: (state, action) => {
    


      const { _id , name, email } = action.payload;

      
    
      state._id = _id || "";
      state.name = name || "";
      state.email = email || "";
    },
    logout: (state) => {
   
       return { ...initialState }; // Reset to initial state
    },
    setViewTask:(state,action)=>{
      state.ViewTask = {...action.payload };
      console.log("store",state.ViewTask)

    }
  },
});

// Action creators generated for each reducer function
export const { setUser,logout,setViewTask } = userSlice.actions;

// The reducer to be used in store configuration
export default userSlice.reducer;
