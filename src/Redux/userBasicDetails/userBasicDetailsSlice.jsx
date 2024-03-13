import {createSlice} from '@reduxjs/toolkit'


export const userBasicDetailsSlice = createSlice(
   {
    name: 'user_basic_details',
    initialState: {
      name: null,
      user_id:null
    },
    reducers: {
      set_user_basic_details: (state, action) => {
        state.name = action.payload.name;
        state.user_id = action.payload.user_id;
      }
    }


})

export const {set_user_basic_details} =  userBasicDetailsSlice.actions

export default userBasicDetailsSlice.reducer