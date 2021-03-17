/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "./socket";
import { updateDisplayName } from "./store/userSettingSlice";
import { leaveSetupPage } from "./store/pageSlice";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import SummitButton from "./SummitButton";

const UserLabel = styled.label`
  font-size: 1rem;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const UserNameInput = styled.input`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: none;
  appearance: none;
  border-radius: 0.25rem 0 0 0.25rem;
  outline: none;
`;

const wrapperStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 2rem);
`;

const Login = () => {
  const dispatch = useDispatch();
  const defaultDisplayName = useSelector(
    (state) => state.userSetting.displayName
  );
  const userId = useSelector((state) => state.userSetting.userId);
  const [userName, setUserName] = useState(defaultDisplayName);

  const onChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSummit = () => {
    if (!userName) {
      return;
    }
    if (!socket.connected) {
      socket.auth = { displayName: userName };
      socket.connect("http://localhost:4040");
    } else {
      socket.emit("updateDisplayName", {
        userId: userId,
        displayName: userName,
      });
      dispatch(leaveSetupPage());
    }

    dispatch(updateDisplayName(userName));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSummit();
    }
  };

  const isActive = typeof userName !== "undefined" && userName !== "";

  return (
    <div css={wrapperStyle}>
      <UserLabel htmlFor="userName">Display Name:</UserLabel>
      <UserNameInput
        id="userName"
        maxLength={20}
        value={userName}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <SummitButton isActive={isActive} onSummit={handleSummit}>
        enter
      </SummitButton>
    </div>
  );
};

export default Login;
