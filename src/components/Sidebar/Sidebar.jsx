import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

const Sidebar = () => {
  return (
    <SideBar>
      <h1>Logo</h1>
      <SideBarUl>
        <li>
          <FontAwesomeIcon icon={faHouse} style={{ color: "#BF94FF", marginRight: 10 }} />
          home
        </li>
        <li>
          <FontAwesomeIcon icon={faHouse} style={{ color: "#BF94FF", marginRight: 10 }} />
          home
        </li>
        <li>
          <FontAwesomeIcon icon={faHouse} style={{ color: "#BF94FF", marginRight: 10 }} />
          home
        </li>
        <li>
          <FontAwesomeIcon icon={faHouse} style={{ color: "#BF94FF", marginRight: 10 }} />
          home
        </li>
      </SideBarUl>
      <div>
        {" "}
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          style={{ color: "#BF94FF", marginRight: 10 }}
        />
        Logout
      </div>
    </SideBar>
  );
};

export default Sidebar;

const SideBar = styled.div`
  width: 15vw;
  min-width: 200px;
  height: 100vh;
  background-color: #1f1f22;
  color: white;
  padding: 20px;
  position: relative;

  & > h1 {
    margin: 25px 0 60px 0;
  }

  & > div {
    position: absolute;
    bottom: 20px;
    display: flex;
    cursor: pointer;
  }
`;

const SideBarUl = styled.ul`
  padding-left: 15px;

  & > li {
    display: flex;
    cursor: pointer;
    margin-bottom: 40px;
  }
`;
