import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import userSettingReducer from "./userSettingSlice";
import messagesReducer from "./messagesSlice";

export default configureStore({
  reducer: {
    page: pageReducer,
    userSetting: userSettingReducer,
    messages: messagesReducer,
  },
});
