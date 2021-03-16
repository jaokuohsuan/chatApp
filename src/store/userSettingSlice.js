import { createSlice } from '@reduxjs/toolkit';


export const userSettingSlice = createSlice({
  name: 'userSetting',
  initialState: {
    displayName: '',
  },
  reducers: {
    updateDisplayName: (state, action)=> {
      state.displayName =  action.payload;
    }
  }
})

export const { updateDisplayName} = userSettingSlice.actions

export default userSettingSlice.reducer
