import * as Styled from "./customModal.style";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import sideBarLogo from "assets/sideBarLogo.png";
import { getDataList } from "redux/modules/detailData";
import { closeModal } from "redux/modules/modal";
import { Text } from "components/common/Text";

export const MainListModal = ({ setState, state, setIsLocation }) => {
  const { dataList, pagination } = useSelector(state => state.detailData);
  const dispatch = useDispatch();

  const prevPage = () => {
    if (pagination === null) return;
    if (pagination.hasPrevPage) pagination.prevPage();
  };
  const NextPage = () => {
    if (pagination === null) return;
    if (pagination.hasNextPage) pagination.nextPage();
  };

  const modalCloseHandler = () => {
    setState({
      ...state,
      searchValue: "",
      markers: [],
      position: { center: { lat: 37.566826, lng: 126.9786567 }, isPanto: false }
    });
    dispatch(closeModal("ListIsOpen"));
    dispatch(closeModal("MyPlaceIsOpen"));
    setIsLocation(false);
    dispatch(getDataList([]));
  };

  const showInfoHandler = data => {
    setState({
      ...state,
      info: { id: data.id },
      position: { center: { lat: data.y, lng: data.x }, isPanto: true }
    });
  };

  return (
    <Styled.ModalDiv>
      <Styled.ImgBox>
        <Styled.Img src={sideBarLogo} alt={"plan-it-travel"} />
        <Styled.XButton onClick={modalCloseHandler}>
          <FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ffffff" }} />
        </Styled.XButton>
      </Styled.ImgBox>
      <Styled.ModalUl>
        <Styled.Result>검색 결과: {pagination?.totalCount}건</Styled.Result>
        {dataList?.map(e => (
          <Styled.ModalLi key={e.id} onClick={() => showInfoHandler(e)}>
            {e.place_name}
          </Styled.ModalLi>
        ))}
      </Styled.ModalUl>
      <Styled.MoveBtnBox>
        <button onClick={prevPage}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" style={{ color: "#ffffff" }} />
        </button>
        <Text as={"span"}>
          {pagination?.current}...
          {pagination?.last}
        </Text>
        <button onClick={NextPage}>
          <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#ffffff" }} />
        </button>
      </Styled.MoveBtnBox>
    </Styled.ModalDiv>
  );
};
