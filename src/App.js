/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./socket";
import { leaveSetupPage, gotoSetupPage } from "./store/pageSlice";
import { updateUserId, updateDisplayName } from "./store/userSettingSlice";
import { newMessage, recoverMessages } from "./store/messagesSlice";
import InputBlock from "./InputBlock";
import BoardBlock from "./BoardBlock";
import Login from "./Login";

const App = () => {
  const isSetupPage = useSelector((state) => state.page.isSetupPage);
  const dispatch = useDispatch();

  const getUserIdSession = () => {
    const userId = sessionStorage.getItem("userId");
    if (userId !== "undefined" || userId !== "null") {
      return userId;
    } else {
      return undefined;
    }
  };

  const connectWebSocket = () => {
    const userId = getUserIdSession();
    if (userId) {
      socket.auth = { userId: userId };
      socket.connect("http://localhost:4040");
      socket.emit("getSessionMessages", { userId });
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

      console.log("App seesion displayName", displayName);

      if (displayName) {
        dispatch(updateDisplayName(displayName));
      }
    });

    socket.on("newMessage", (aMessageObj) => {
      dispatch(newMessage(aMessageObj));
    });

    socket.on("receiveSessionMessages", (messages) => {
      dispatch(recoverMessages(messages));
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
  const styled = css`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: calc(10px + 2vmin);
    color: white;
    padding: 1rem;
    box-sizing: border-box;
    align-items: stretch;
  `;

  return <div className="App" css={styled}>{pageRender()}</div>;
};

export default App;
