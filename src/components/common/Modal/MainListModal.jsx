import React from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import logo from "assets/logo.png";
import { getDataList } from "redux/modules/detailData";
import { closeModal } from "redux/modules/modal";

function MainListModal({ setState, state }) {
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
    dispatch(closeModal("ListIsOpen"));
    setState({
      ...state,
      searchValue: "",
      markers: [],
      position: {
        center: {
          lat: 37.566826,
          lng: 126.9786567
        },
        isPanto: false
      }
    });
    dispatch(getDataList([]));
  };

  const showInfoHandler = data => {
    setState({
      ...state,
      info: { content: data.place_name },
      position: { center: { lat: data.y, lng: data.x }, isPanto: true }
    });
  };

  return (
    <Modaldiv>
      <ImgBox>
        <Img src={logo} alt={"plan-it-travel"} />
        <XButton onClick={modalCloseHandler}>
          <FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ffffff" }} />
        </XButton>
      </ImgBox>
      <ModalUl>
        검색 결과: {pagination?.totalCount}건
        {dataList?.map(e => (
          <ModalLi key={e.id} onClick={() => showInfoHandler(e)}>
            {e.place_name}
          </ModalLi>
        ))}
      </ModalUl>
      <MoveBtnBox>
        <button onClick={prevPage}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" style={{ color: "#ffffff" }} />
        </button>
        <span>
          {pagination?.current}...
          {pagination?.last}
        </span>
        <button onClick={NextPage}>
          <FontAwesomeIcon icon={faChevronRight} size="lg" style={{ color: "#ffffff" }} />
        </button>
      </MoveBtnBox>
    </Modaldiv>
  );
}

const Modaldiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
`;

const XButton = styled.button`
  position: absolute;
  top: 1%;
  left: 15%;
  background-color: #1f1f22;
  width: 30px;
  height: 50px;
  padding-right: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Img = styled.img`
  display: inherit;
  align-self: center;
  width: 150px;
  margin: 20px;
`;

const ModalUl = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: baseline;
  gap: 10px;
`;

const ModalLi = styled.li`
  padding: 5px 3px;
  width: 100%;
  &:hover {
    cursor: pointer;
    background-color: #a290e6;
    border-radius: 5px;
  }
`;

const MoveBtnBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

export default MainListModal;