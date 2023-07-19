export const SURVEY_TEXT = [
  {
    id: 1,
    question: "어떤 여행을 하고 싶으신가요?",
    option: [
      { id: 1, text: "저는 역사와 문화에 탐구하고 싶어요", result: "culture" },
      { id: 2, text: "저는 자연에서의 힐링 여행을 하고싶어요", result: "nature" },
      { id: 3, text: "저는 도시에서의 놀고싶어요", result: "city" }
    ]
  },
  {
    id: 2,
    question: "가고싶은 지역은 어디인가요?",
    option: [
      { id: 1, text: "수도권", result: "수도권" },
      { id: 2, text: "강원도", result: "강원도" },
      { id: 3, text: "경상도", result: "경상도" },
      { id: 4, text: "충청도", result: "충청도" },
      { id: 5, text: "전라도", result: "전라도" },
      { id: 6, text: "제주도", result: "제주도" }
    ]
  },
  {
    id: 3,
    question: "여행지 선택시 고려하는 요소는 무엇인가요?",
    option: [
      { id: 1, text: "저는 활동적인 장소를 찾아다녀요", result: "active" },
      { id: 2, text: "저는 힐링이 최우선이에요", result: "healing" },
      { id: 3, text: "저는 맛집을 찾아다녀요", result: "food" },
      { id: 4, text: "축제를 찾아다녀요", result: "festival" }
    ]
  },
  {
    id: 4,
    question: "몇 명이랑 가시나요??",
    option: [
      { id: 1, text: "1", result: "1" },
      { id: 2, text: "2", result: "2" },
      { id: 3, text: "3", result: "3" },
      { id: 4, text: "4", result: "4" },
      { id: 5, text: "5", result: "5" },
      { id: 6, text: "6", result: "6" },
      { id: 7, text: "7", result: "7" },
      { id: 8, text: "8", result: "8" }
    ]
  },
  {
    id: 5,
    question: "여행 경비는 얼마정도 생각하시나요?",
    option: [
      { id: 1, text: "10만원 미만", result: 10 },
      { id: 2, text: "10만원 이상", result: 50 },
      { id: 3, text: "50만원 이상", result: 100 },
      { id: 4, text: "100만원 이상", result: 200 }
    ]
  }
];

/*
  수도권
    자연 소야도 인천, 서울식물원
    도시 롯데월드, 더현대서울
    역사 남산골 한옥마을 서울, 경복궁
  강원도
    자연 서퍼비치 양양, 안반데기 강릉, 
    도시 오션월드, 엘리시안 강촌
    역사 동해신묘, 한계산성
  경상도
    자연 바람의 언덕 거제도, 몽돌 해수욕장
    도시 감천문화마을 부산, 경주월드 경주
    역사 보문단지 경주, 하회마을 안동
  충청도
    자연 보성녹차밭 보성, 영인산자연휴양림
    도시 성심당 대전, 예산 시장 예산군,
    역사 역사박물관 충청남도, 공산성 공주시
  전라도
    자연 순천만 순천, 윤제림 보성
    도시 송정역 시장 광주, 아쿠아시티 
    역사 고창읍성 고창, 전주한옥마을 전주
  제주도
    자연 산굼부리, 우도
    도시 드림타워, 아르떼뮤지엄
    역사 삼성혈, 제주목관아지
  */

export const SURVEY_RESULT = [
  {
    id: 1,
    region: "바다",
    concept: "nonActive",
    name: "소야도 – 인천",
    answer:
      "서해 여행이나 인천의 섬으로 떠나고 싶다면 소야도를 추천한다. 1박 2일 여행지, 인천 섬 여행지로 유명한 덕적도와 가까운 작은 섬으로 두 섬 사이에 다리가 개통되어 여행객이 늘어나고 있지만, 아직 많은 사람이 모이지 않아 조용한 섬 여행을 누리기에 안성맞춤이다. 낚시나 해루질, 갯벌체험 등이 가능해 서해 가족 여행지로 추천하는 곳. 선착장부터 국사봉, 갓섬, 물푸레섬 등까지 트레킹 즐기기에도 좋다. 백패킹을 원한다면 떼뿌리해변에 텐트를 치고 하룻밤을 보내보자."
  },
  {
    id: 2,
    region: "바다",
    concept: "active",
    name: " 서퍼비치 – 양양",
    answer:
      "이국적인 풍광을 자랑하는 양양 서피비치는 40년만에 개방된 프라이빗 비치로 1km 구간에 서핑전용 해변, 스위밍존, 빈백존, 해먹존, 칠링존 등 휴식을 즐길 수 있는 공간으로 꾸며져 있습니다. 백사장 주변에 예쁜 포토존도 있고, 바다를 조망할 수 있는 곳에 분위기 좋은 비치 바가 있어 커피나 음료를 즐기면서 가볍게 쉬기도 좋은데요. 석양을 감상하며 즐기기 좋은 펍&라운지와 서피비치만의 애프터 파티도 준비되어 있다고 합니다."
  },
  {
    id: 3,
    region: "산",
    concept: "nonActive",
    name: "안반데기 – 강릉",
    answer:
      "이미 유명한 강원도 여행지인 강릉에서 색다른 풍경을 보고 싶다면 안반데기를 빼놓을 수 없다. 1,100m 고산지대로 넓은 밭이 펼쳐져 있어 독특한 풍경을 이룬 곳이다. 봄의 초원부터 겨울의 설경까지 사계절 모두 아름다워 여행객의 발길이 끊기지 않는다. 독특한 일출 풍경과 여름 은하수를 만날 수 있으니 좀 더 부지런히 이동해보자. 고산지대인 만큼 쌀쌀한 편이니 따뜻한 옷을 챙기는 것은 필수"
  },
  {
    id: 4,
    region: "산",
    concept: "active",
    name: " 산굼부리 – 제주",
    answer:
      "이국적인 풍광을 자랑하는 양양 서피비치는 40년만에 개방된 프라이빗 비치로 1km 구간에 서핑전용 해변, 스위밍존, 빈백존, 해먹존, 칠링존 등 휴식을 즐길 수 있는 공간으로 꾸며져 있습니다. 백사장 주변에 예쁜 포토존도 있고, 바다를 조망할 수 있는 곳에 분위기 좋은 비치 바가 있어 커피나 음료를 즐기면서 가볍게 쉬기도 좋은데요. 석양을 감상하며 즐기기 좋은 펍&라운지와 서피비치만의 애프터 파티도 준비되어 있다고 합니다."
  },
  {
    id: 5,
    region: "역사",
    concept: "nonActive",
    name: "남산골 한옥마을 – 서울",
    answer:
      "남산골 한옥마을에서는 한국의 미를 그대로 간직한 전통 정원과 한옥을 둘러보고 투호, 활 만들기 같은 전통 체험이나 어린 시절을 회상할 수 있는 딱지치기도 해보실 수 있어요"
  },
  {
    id: 6,
    region: "역사",
    concept: "nonActive",
    name: "고창 – 전라북도",
    answer:
      "문경은 과거를 보러 한양에 가던 선비들이 지나다니던 지역이라 붙여진 이름이다. 시간 여행을 떠나고 싶거나, 국내 1박 2일 여행을 떠나는 여행객에게 추천한다. 문경새재 도립공원은 문경 여행 필수 코스. 전동차를 타거나 걸어서 둘러볼 수 있으며 사극 촬영지로 많이 사용되는 문경새재 오픈세트장도 같이 있다. 그 밖에도 고모산성을 오르거나 불정역, 가은역 등의 폐역에서 시간 여행을 즐겨보는 것은 어떨까? 문경에서 빼놓을 수 없는 사과, 오미자 등을 이용한 음식과 디저트도 꼭 맛보자."
  },
  {
    id: 7,
    region: "도시",
    concept: "nonActive",
    name: "도시1",
    answer: "도시1"
  },
  {
    id: 8,
    region: "도시",
    concept: "nonActive",
    name: "도시2",
    answer: "도시2"
  }
];
