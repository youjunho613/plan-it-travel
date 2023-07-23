import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import backgroundImg from "../assets/background.png";

const styled = { createGlobalStyle };
const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "Giants-Inline";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Inline.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    color: #ffffff;
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
    font-family: "Pretendard-Regular";
    background-image: url(${backgroundImg});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }
`;

export default GlobalStyle;
