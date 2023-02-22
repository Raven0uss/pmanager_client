import styled from "styled-components";

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthenticationBox = styled.div`
  width: 50%;
  max-width: 620px;
  min-width: 320px;
  margin-top: 40px;
  border: solid 2px #f3f3f3;
  border-radius: 10px;
  box-shadow: 3px 3px 5px 1px #f3f3f3;
`;

const AuthenticationTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const AuthenticationTabLogin = styled.div`
  flex: 40%;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.tabIndex === 0 ? "#FFF" : "#F3F3F3")};
  border-bottom: ${(props) =>
    props.tabIndex !== 0 ? "solid 1px #f0f0f0" : "unset"};
  color: ${(props) => (props.tabIndex !== 0 ? "#b9b9b9" : "unset")};
  border-top-left-radius: 10px;
  font-weight: ${(props) => (props.tabIndex === 0 ? "bold" : "normal")};
`;
const AuthenticationTabRegister = styled.div`
  flex: 40%;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  background-color: ${(props) => (props.tabIndex === 1 ? "#FFF" : "#F3F3F3")};
  border-bottom: ${(props) =>
    props.tabIndex !== 1 ? "solid 1px #f0f0f0" : ""};
  color: ${(props) => (props.tabIndex !== 1 ? "#b9b9b9" : "")};
  border-top-right-radius: 10px;
  font-weight: ${(props) => (props.tabIndex === 1 ? "bold" : "normal")};
`;

export {
  LoginContainer,
  AuthenticationBox,
  AuthenticationTabs,
  AuthenticationTabLogin,
  AuthenticationTabRegister,
};
