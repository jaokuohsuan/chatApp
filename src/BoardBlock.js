/** @jsxImportSource @emotion/react */

import React, { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const MessageItem = ({ displayName, message, isOwner, isLast }) => {
  const itemStyle = css`
    font-size: 0.8rem;
    display: flex;
    flex-direction: ${isOwner ? "row-reverse" : "row"};
    margin: 0.5rem 0;
  `;

  const ConversationBlock = styled.div`
    background: #fff;
    border-radius: 0.25rem;
    color: #333;
    padding: 1rem;
    text-align: ${isOwner ? "right" : "left"};
  `;

  const UserName = styled.div`
    font-size: 0.8rem;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0 0.5rem;
  `;

  const messageEl = useRef(null);

  const scrollIntoMessage = () => {
    messageEl.current.scrollIntoView();
  };

  useEffect(() => {
    scrollIntoMessage();
  }, [isLast]);

  return (
    <div className="MessageItem" css={itemStyle} ref={messageEl}>
      <UserName>{displayName}</UserName>
      <ConversationBlock>{message}</ConversationBlock>
    </div>
  );
};

const BoardBlock = () => {
  const wrapperStyle = css`
    flex-basis: calc(100vh - 6rem);
    overflow: scroll;
  `;

  const messages = useSelector((state) => state.messages.messageList);
  const userId = useSelector((state) => state.userSetting.userId);

  return (
    <div className="BoardBlock" css={wrapperStyle}>
      {messages.map((each, index) => {
        return (
          <MessageItem
            message={each.message}
            displayName={each.displayName}
            key={each.timestamp}
            isOwner={userId === each.userId}
            isLast={index < messages.length - 1}
          />
        );
      })}
    </div>
  );
};

export default BoardBlock;
