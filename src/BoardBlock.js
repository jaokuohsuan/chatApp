/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import {css } from "@emotion/react";
import styled from "@emotion/styled";


const MessageItem = () => {
  const itemStyle = css`
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
    margin: .5rem 0;
  `;

  const CoversationBlock = styled.div`
    background: #fff;
    border-radius: 0.25rem;
    color: #333;
    padding: 1rem;
  `;

  const UserName = styled.div`
    font-size: 0.8rem;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 0.5rem;
  `;

  const [messageObj] = useState({
    message: "lalalalal",
    userId: "123",
    displayName: "funny",
    timestamp: "1234656",
  });

  return (
    <div className="MessageItem" css={itemStyle}>
      <UserName>{messageObj.displayName}</UserName>
      <CoversationBlock>{messageObj.message}</CoversationBlock>
    </div>
  );
};

const BoardBlock = () => {
  const wrapperStyle = css`
    flex-basis: calc(100vh - 6rem);
    overflow: scroll;
  `;

  return (
    <div className="BoardBlock" css={wrapperStyle}>
      <MessageItem />
      <MessageItem />
    </div>
  );
};

export default BoardBlock;
