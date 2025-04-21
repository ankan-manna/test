import { configureStore } from '@reduxjs/toolkit';

const placeholderReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    placeholder: placeholderReducer, 
  },
});

export default store;