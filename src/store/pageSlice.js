import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    isSetupPage: true,
  },
  reducers: {
    gotoSetupPage: state => {
      state.isSetupPage =  true;
    },
    leaveSetupPage: state => {
      state.isSetupPage =  false;
    },
  }
})

export const { gotoSetupPage, leaveSetupPage } = pageSlice.actions

export default pageSlice.reducer
