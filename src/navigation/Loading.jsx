import { Spin } from "antd";
import React from "react";
import { LoadingContainer } from "./Loading.styled";

const Loading = (props) => {
  return (
    <LoadingContainer>
      <Spin size="large" {...props}>
        {props.children}
      </Spin>
    </LoadingContainer>
  );
};

export default Loading;
