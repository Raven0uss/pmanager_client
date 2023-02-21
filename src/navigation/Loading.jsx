import { Spin } from "antd";
import React from "react";

const Loading = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <Spin size="large" {...props}>
        {props.children}
      </Spin>
    </div>
  );
};

export default Loading;
