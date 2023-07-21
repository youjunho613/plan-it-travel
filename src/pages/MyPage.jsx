import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const MyPage = () => {
  return (
    <PageContainer>
      <UserContainer>
        <UserImg></UserImg>
        <p>userName</p>
      </UserContainer>

      <BookContainer>
        <BookBiv>
          <BookMarker>
            <FontAwesomeIcon icon={faBookmark} />
          </BookMarker>
          <BookTitle>
            <PlaceName>
              <PinMarker>
                <svg
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="0.8em"
                  viewBox="0 0 384 512"
                >
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
              </PinMarker>
              에버랜드
            </PlaceName>
            <Adress>경기도 용인시 처인구 포곡읍 에버랜드로 199</Adress>
          </BookTitle>
        </BookBiv>
      </BookContainer>
    </PageContainer>
  );
};

export default MyPage;
const Adress = styled.p``;

const PinMarker = styled.span`
  margin: 5px;
`;

const PlaceName = styled.h1`
  font-size: 19px;
  /* width: 200px; */
  height: 30px;
`;

const BookMarker = styled.div`
  position: relative;
  left: 480px;
  height: 30px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  /* background-image: url("https://rare-gallery.com/uploads/posts/962823-drawing-colorful-artwork-space-space-art.png"); */
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
`;
const UserImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: white;
  margin-bottom: 20px;
`;

const BookContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
`;
const BookBiv = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid white;
  width: 540px;
  height: 90px;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.049);
  backdrop-filter: blur(10px);
`;

const BookTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
