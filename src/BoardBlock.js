/** @jsxImportSource @emotion/react */

import React, { useRef, useEffect } from "react";
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

  const nameBasicWith = "5rem";

  const ConversationBlock = styled.div`
    border-radius: 0.25rem;
    color: #333;
    padding: 1rem;
    text-align: ${isOwner ? "right" : "left"};
    background: ${isOwner ? "#7fc1f5" : "#fff"};
    max-width: calc(100% - ${nameBasicWith});
  `;

  const UserName = styled.div`
    display:  ${isOwner ? "none" : "block"};
    flex-basis: ${nameBasicWith});
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
