import styled from "styled-components";
import { useAuth } from "components/auth";
import { getBookmarks } from "api/bookmarks";
import { useQuery } from "react-query";
import { Bookmark } from "components/Bookmark";
import { useNavigate } from "react-router";

export const MyPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const bookmarksData = useQuery("bookmarks", getBookmarks).data?.filter(
    e => e.userEmail === currentUser?.email
  );
  const markerClickHandler = id => navigate(`/detail/${id}`);

  return (
    <PageContainer>
      <UserContainer>
        <UserImg src={currentUser?.photoURL}></UserImg>
        <p>{currentUser?.displayName}</p>
      </UserContainer>
      <BookContainer>
        {bookmarksData?.map(bookmark => {
          return (
            <BookBiv>
              <BookTitle>
                <DetailSvg
                  onClick={() => markerClickHandler(bookmark.kakaoId)}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                </DetailSvg>
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
                  {bookmark.place_name}
                </PlaceName>
                <Bookmark kakaoId={bookmark.kakaoId} left={170} height={"30px"} />
                <Adress>{bookmark.address_name}</Adress>
              </BookTitle>
            </BookBiv>
          );
        })}
      </BookContainer>
    </PageContainer>
  );
};

const DetailSvg = styled.svg`
  cursor: pointer;
  fill: ${props => props.theme.colors.white};
  position: relative;
  bottom: 30px;
  left: 170px;
  height: 25px;
  transition: scale 0.3s;
  &:hover {
    scale: 1.2;
  }
  &:active {
    scale: 0.8;
  }
`;
const Adress = styled.p`
  width: 300px;
  text-align: center;
`;

const PinMarker = styled.span`
  margin: 5px;
`;

const PlaceName = styled.h1`
  font-size: 19px;
  width: 300px;
  text-align: center;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
`;
const UserImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const BookContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  width: 1280px;
`;
const BookBiv = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  width: 400px;
  padding: 40px 40px 70px 40px;
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
