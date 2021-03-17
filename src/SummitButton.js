/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Button = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border: none;
  border-radius: 0 0.25rem 0.25rem 0;
  outline: none;
`;

const SummitButton = (props) => {
  const activeStyleButton = css`
    background-color: ${props.isActive ? "#0d6efd" : "#ccc"};
    color: ${props.isActive ? "#fff" : "#666"};
  `;

  const handleClick = (event) => {
    event.preventDefault();
    props.onSummit();
  };

  return (
    <Button css={activeStyleButton} onClick={handleClick}>
      {props.children}
    </Button>
  );
};

export default SummitButton;
