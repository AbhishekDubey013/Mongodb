import { ADD_RC } from './constant';

// Define the initial state
const initialState = {
  RC: []
};

// Define the reducer function
export const rchat = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RC:
      console.log("Data added to store:", action.payload);
      return {
        RC: [action.payload]
      };
    default:
      return state;
  }
};


