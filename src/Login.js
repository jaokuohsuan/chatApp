/** @jsxImportSource @emotion/react */

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/react";


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
  flex-grow: 1;
`;

const SummitButton = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border: none;
  border-radius: 0 0.25rem 0.25rem 0;
`;

const wrapperStyle = css`
  display: flex;
  flex-direction: row;
`;

const Login = () => {

  const [userName, setUserName] = useState("");

  const onChange = (event) => {
    setUserName(event.target.value);
  };

return (
  <div css={wrapperStyle}>
    <UserNameInput value={userName} onChange={onChange} />
    <SummitButton> > </SummitButton>
  </div>
)

}

export default Login;
