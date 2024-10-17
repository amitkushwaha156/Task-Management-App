import { configureStore } from '@reduxjs/toolkit';
import UserSlices from './UserSlice';

export const store = configureStore({
  reducer: {
    userTask: UserSlices, 
    
  },
});
