import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const styled = { createGlobalStyle };
const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "EF_watermelonSalad";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_watermelonSalad.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input::selection,
  ::selection {
    background-color: #000000;
    color: #ffffff;
  }

  body {
    font-family: "EF_watermelonSalad";
    /* background: #ffffff; */
    /* background-attachment: fixed; */
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;

export default GlobalStyle;
