import * as Styled from "./Bookmark.style";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { getBookmarks } from "api/bookmarks";
import { BookmarkIcon } from "components/Bookmark";

export const Bookmark = ({ currentUser }) => {
  const navigate = useNavigate();

  const bookmarksData = useQuery("bookmarks", getBookmarks).data?.filter(
    e => e.email === currentUser?.email
  );

  const MoveDetailPageHandler = id => navigate(`/detail/${id}`);

  return (
    <Styled.BookContainer>
      {bookmarksData?.map(bookmark => {
        return (
          <Styled.BookBiv key={bookmark.id}>
            <Styled.BookTitle>
              <Styled.DetailSvg
                onClick={() => MoveDetailPageHandler(bookmark.kakaoId)}
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
              >
                <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
              </Styled.DetailSvg>
              <Styled.LargeFont>
                <Styled.PinMarker>
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="0.8em"
                    viewBox="0 0 384 512"
                    style={{ marginRight: "5px" }}
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                </Styled.PinMarker>
                {bookmark.place_name}
              </Styled.LargeFont>
              <BookmarkIcon kakaoId={bookmark.kakaoId} left={170} height={"30px"} />
              <Styled.Address>{bookmark.address_name}</Styled.Address>
            </Styled.BookTitle>
          </Styled.BookBiv>
        );
      })}
    </Styled.BookContainer>
  );
};
