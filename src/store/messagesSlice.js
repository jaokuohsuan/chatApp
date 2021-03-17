import { createSlice } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messageList: [],
  },
  reducers: {
    summitMessage: (state, action) => {
      state.messageList = [...state.messageList, action.payload];
    },
    newMessage: (state, action) => {
      state.messageList = [...state.messageList, action.payload];
    },
    recoverMessages: (state, action) => {
      state.messageList = action.payload;
    },
  },
});

export const {
  summitMessage,
  newMessage,
  recoverMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
