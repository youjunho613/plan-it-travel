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
    font-family: "EF_watermelonSalad";
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
    font-family: "EF_watermelonSalad";
    background-image: url("https://github.com/judygab/web-dev-projects/blob/main/personal-portfolio/src/assets/img/banner-bg.png?raw=true");
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
