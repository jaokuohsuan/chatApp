import { createSlice } from "@reduxjs/toolkit";

export const userSettingSlice = createSlice({
  name: "userSetting",
  initialState: {
    displayName: "",
    userId: "",
  },
  reducers: {
    updateDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    updateUserId:(state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { updateDisplayName, updateUserId } = userSettingSlice.actions;

export default userSettingSlice.reducer;
