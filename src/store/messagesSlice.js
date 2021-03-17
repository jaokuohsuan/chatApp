import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import socket from "../socket";

// const socketEmitMessage = (message) => {
//   return new Promise((resolve, reject) => {
//     socket.emit("sendMessage", message, (response) => {
//       if (response.error) {
//         reject(response.error);
//       } else {
//         resolve(message);
//       }
//     });
//   });
// };
//
// const summitMessage = createAsyncThunk("socket/summitMessage", async () => {
//   return await socketEmitMessage;
// });

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
    // extraReducers: {
    //   // Add reducers for additional action types here, and handle loading state as needed
    //   [summitMessage.fulfilled]: (state, action) => {
    //     // Add user to the state array
    //     state.message = [...state.message, action.payload];
    //   }
    // }
  },
});

export const { summitMessage, newMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
