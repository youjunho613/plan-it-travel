import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import * as Styled from "./Header.style";

const Header = () => {
  return (
    <Styled.NavContainer>
      <Styled.Logospan>
        <h1>Logo</h1>
        <p>Home</p>
        <p>Mypage</p>
      </Styled.Logospan>
      <Styled.Searchspan>
        <Styled.SearchForm>
          <input type="search" placeholder="Search" />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </Styled.SearchForm>

        <Styled.Btn>Log In</Styled.Btn>
        <Styled.Btn>Sign Up</Styled.Btn>
      </Styled.Searchspan>
    </Styled.NavContainer>
  );
};

export default Header;
