import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import userSettingReducer from "./userSettingSlice";

export default configureStore({
  reducer: {
    page: pageReducer,
    userSetting: userSettingReducer,
  },
});
