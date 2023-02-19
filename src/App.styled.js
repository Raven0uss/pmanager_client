import { createGlobalStyle } from "styled-components";

// import "antd/lib/input/style/css";
// import "antd/lib/table/style/css";

const AppStyled = createGlobalStyle`
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body,
  #root {
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
`;

export { AppStyled };
