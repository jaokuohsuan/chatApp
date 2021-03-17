/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import {css} from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector} from "react-redux";

const MessageItem = ({displayName, message, owner}) => {
  const itemStyle = css`
    font-size: 0.8rem;
    display: flex;
    flex-direction: ${owner ? 'row-reverse': 'row'};
    margin: .5rem 0;
  `;

  const ConversationBlock = styled.div`
    background: #fff;
    border-radius: 0.25rem;
    color: #333;
    padding: 1rem;
    text-align:  ${owner ? 'right': 'left'};
  `;

  const UserName = styled.div`
    font-size: 0.8rem;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 0 0.5rem;
  `;

  return (
    <div className="MessageItem" css={itemStyle}>
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
      {messages.map((each) => {
        return (
          <MessageItem message={each.message} displayName={each.displayName} key={each.timestamp} owner={userId === each.userId} />
        );
      })}
    </div>
  );
};

export default BoardBlock;
