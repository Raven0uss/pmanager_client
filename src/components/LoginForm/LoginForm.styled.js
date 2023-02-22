import { Button, Input } from "antd";
import styled from "styled-components";

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 30px;
`;

const UsernameInput = styled(Input)`
  width: 50%;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const PasswordInput = styled(Input)`
  width: 50%;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const LoginButton = styled(Button)`
  width: 33%;
  margin-top: 30px;
  margin-bottom: 5px;
`;

export {
  LoginFormContainer,
  UsernameInput,
  PasswordInput,
  LoginButton,
};
