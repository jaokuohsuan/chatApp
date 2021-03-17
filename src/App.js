import "./App.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./socket";
import { leaveSetupPage, gotoSetupPage } from "./store/pageSlice";
import { updateUserId } from "./store/userSettingSlice";
import { newMessage } from "./store/messagesSlice";
import InputBlock from "./InputBlock";
import BoardBlock from "./BoardBlock";
import Login from "./Login";

const App = () => {
  const isSetupPage = useSelector((state) => state.page.isSetupPage);
  const dispatch = useDispatch();
  const [ws, setWs] = useState(null);

  const getUserIdSession = () => {
    const userId = sessionStorage.getItem("userId");
    if (userId !== "undefined" || userId !== "null") {
      return userId;
    } else {
      return undefined;
    }
  };

  const connectWebSocket = () => {
    if (getUserIdSession()) {
      socket.auth = { userId: getUserIdSession() };
      socket.connect("http://localhost:4040");
      dispatch(leaveSetupPage());
    } else {
      dispatch(gotoSetupPage());
    }
  };

  const initWebSocket = () => {
    socket.on("session", ({ userId, displayName }) => {
      dispatch(leaveSetupPage());

      if (userId) {
        sessionStorage.setItem("userId", userId);
        socket.auth = { userId };
        dispatch(updateUserId(userId));
      }
      socket.displayName = displayName;
    });

    socket.on("newMessage", (aMessageObj) => {
      dispatch(newMessage(aMessageObj));
    });
  };

  useEffect(() => {
    connectWebSocket();
    initWebSocket();
  }, []);

  const pageRender = () => {
    if (isSetupPage) {
      return <Login />;
    } else {
      return (
        <>
          <BoardBlock />
          <InputBlock />
        </>
      );
    }
  };

  return <div className="App">{pageRender()}</div>;
};

export default App;
