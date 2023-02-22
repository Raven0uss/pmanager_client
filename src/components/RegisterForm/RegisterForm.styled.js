import { Button, Input } from "antd";
import styled from "styled-components";

const RegisterFormContainer = styled.form`
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
  margin-bottom: 10px;
`;

const ConfirmPasswordInput = styled(Input)`
  width: 50%;
  margin-top: 5px;
  margin-bottom: unset;
`;

const WarnBoxPasswordNotMatching = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #faad14;
`;

const RegisterButton = styled(Button)`
  width: 33%;
  margin-top: 30px;
  margin-bottom: 5px;
`;

export {
  RegisterFormContainer,
  UsernameInput,
  PasswordInput,
  ConfirmPasswordInput,
  WarnBoxPasswordNotMatching,
  RegisterButton,
};
