import "./App.css";
import React, { useState, useEffect } from "react";
import socket from "./socket";
import InputBlock from "./InputBlock";
import BoardBlock from "./BoardBlock";
import Login from "./Login";

const App = () => {
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
    if (getUserIdSession) {
      socket.auth = { userId: getUserIdSession() };
    }

    socket.connect("http://localhost:4040");
  };

  const initWebSocket = () => {
    console.log("init ws");

    socket.on("session", ({ userId, displayName }) => {
      // store it in the sessionStorage
      if (userId) {
        sessionStorage.setItem("userId", userId);
        socket.auth = { userId };
      }
      socket.displayName = displayName;
    });

    socket.on("getMessage", (message) => {
      console.log(message);
    });
  };

  const sendMessage = () => {
    socket.emit("getMessage", "只回傳給發送訊息的 client");
  };

  useEffect(() => {
    // if (ws) {
    //
    // } else {
    connectWebSocket();
    // }
    initWebSocket();
  }, []);

  return (
    <div className="App">
      <BoardBlock />
      <InputBlock />
    </div>
  );
};

export default App;
