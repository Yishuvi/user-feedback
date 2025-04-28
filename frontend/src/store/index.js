import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'; // Assuming you have an auth slice defined in another file

const store = configureStore({
  reducer: {
    auth : authReducer, // Assuming you have an authReducer defined in another file
  },
});

export default store;