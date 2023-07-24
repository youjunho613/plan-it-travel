# Plan-It-Travel

## 목차

[1.페이지 소개](#휴양지-검색-사이트)</br>
[2. 팀구성](#팀구성)</br>
[3. 기술 스택](#기술-스택)</br>
[4. 페이지 구성](#페이지-구성)</br>
[5. 컨벤션](#컨벤션)

## 휴양지 검색 사이트

> 당신의 여행 계획 리스트업에 도움이 되는 사이트

<p>유저가 지도로 검색한 장소의 세부 내용을 확인할 수 있게 하거나 지정한 장소에 대한 의견들을 댓글로 공유하며 정보를 얻어갈 수 있습니다. </br>
현재 위치 기반으로도 주변의 시설들을 검색하거나 카테고리를 통해 편의시설, 숙박시설등의 정보도 한눈에 찾아볼 수 있습니다.</p>
<p>마땅히 정한 곳이 없을 때에는 저희 사이트가 제공하는 질문지를 통해 적절한 장소를 제시해드립니다.</p>
<p>여행을 어떻게 가야할 지 모르겠을 때에는 저희가 추천해드리는 여행 꿀팁을 유튜브 동영상으로 보시면서 좀 더 수월한 여행을 계획해보세요.</p>
<p>공개적으로 정보가 있는 장소도 있겠지만 나만의 장소를 지정해서 나의 이야기가 담겨있는 특별한 장소를 저장해보세요.</p>
<p>저희 프로젝트에서 여러분만의 장소를 저장하고 한눈에 볼 수 있도록 지원해드립니다!</p>

## 팀구성

|  양지원   |  김성훈   |  김유진   |  김진수   |  유준호   |
| :-------: | :-------: | :-------: | :-------: | :-------: |
|   팀장    |   팀원    |   팀원    |   팀원    |   팀원    |
| Front-end | Front-end | Front-end | Front-end | Front-end |

## 기술 스택

<p>
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
    <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/>
</p>

### API

<p>
<img src="https://react-kakao-maps-sdk.jaeseokim.dev/img/logo.png" width=40px/>
<img src="https://t1.daumcdn.net/cfile/tistory/9986A64E5FD398480F" width=40px/>
</p>

## 페이지 구성

- 홈페이지
  ![pthome](https://github.com/youjunho613/plan-it-travel/assets/124483981/905023b7-a275-420e-bb4b-969b7ffd374c)
  로그인, 로그아웃, 메인페이지, 추천페이지, 마이페이지 등 기능을 이용할 수 있는 페이지 및 모달로 이동

- 메인페이지
  ![ptmain](https://github.com/youjunho613/plan-it-travel/assets/124483981/c31f8654-3f16-4de6-9444-c4cb403da1d5)
  사이드바의 카테고리, 상단의 검색창을 사용하여 지도에서 위치 검색 가능</br>
  검색창 오른쪽 사용자 현재 위치 버튼을 클릭해 서비스 이용 가능</br>
  현재 위치 서비스 사용 시 사용자의 위치 기반으로 지도 화면 이동 및 검색 가능 범위 1km로 설정됨</br>

  ![ptyoutube](https://github.com/youjunho613/plan-it-travel/assets/124483981/7086ee73-bc58-481d-b04d-e07e3552d7b0)
  여행 꿀팁 버튼 클릭시 유튜브 영상 표시

  ![ptsearch](https://github.com/youjunho613/plan-it-travel/assets/124483981/35e8d45f-d170-458c-9018-c169ef3eda22)
  키워드 검색 시 지도에 마커 표시와 사이드바에 검색 결과 리스트업</br>
  마커 클릭 시 오버레이 표시, 상세보기 버튼 클릭 시 상세페이지로 이동

- 상세페이지
  ![ptdetail](https://github.com/youjunho613/plan-it-travel/assets/124483981/56de54ae-2030-45f0-afea-3fe11a2c1cab)
  장소의 대한 위치가 있는 지도, 장소명, 주소명, 전화번호 확인 가능</br>
  북마크 버튼과 댓글 작성 기능</br>
  댓글에 무한 스크롤 기능을 적용해 존재하는 댓글 갯수만큼 스크롤 다운 시 일정 갯수의 댓글 출력됨

- 마이페이지
  ![ptmypage](https://github.com/youjunho613/plan-it-travel/assets/124483981/9801ae1b-0374-45a4-87f2-9477c900f542)
  회원 정보, 북마크한 장소, 유저가 작성한 나만의 장소 확인 가능</br>
  설정 버튼 클릭 시 회원 탈퇴, 회원 정보 수정 기능 이용 가능

- 추천페이지
  ![ptservey](https://github.com/youjunho613/plan-it-travel/assets/124483981/aebf4b70-e813-4d9a-8b4a-07ac024ed53a)
  홈페이지나 헤더의 recommend버튼을 통해 접근 가능</br>
  몇가지의 질문들을 통해 답한 내용을 기반으로 어울리는 장소를 추천</br>
  질문을 모두 완료하고 submit 버튼을 누르면 추천한 장소의 상세페이지로 이동

- 게시물 작성페이지
  ![ptmyplace](https://github.com/youjunho613/plan-it-travel/assets/124483981/b3301f4e-7d2f-49e4-ba46-09e4781b83eb)
  메인페이지 사이드바 하단의 '나만의 장소 지정하기' 버튼을 통해 접근 가능</br>
  지도에 마커를 찍으면 오른쪽 맨 위의 input에 마커가 찍힌 위치 주소 입력됨</br>
  마커를 좀 더 자유롭게 찍기위해 지도의 검색창 구현</br>
  작성이 완료된 게시물들은 메인페이지 사이드바 하단의 '나만의 장소 보기' 혹은 마이페이지에서 확인 가능

## 컨벤션

### 커밋 컨벤션

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 변경, 폴더 구조 변경
- design : UI, UX 변경
- refactor : 코드 리팩토링
- chore : 설정 변경 등의 기타 변경사항

### 코드 컨벤션

- #### 함수

  > 함수명은 카멜 케이스(camelCase)를 원칙으로 한다.

  ```javascript
  function nameOfFunction() {
    // ...some logic
  }
  ```

- #### 스타일 코드 순서

  > 스타일 코드의 순서는 아래와 같이 작성한다.

  ```css
  .sample {
    /* position 관련 */
    position: absolute;
    top: 0;
    left: 0;

    /* display 관련 */
    display: flex;
    justify-content: center;
    align-items: center;

    /* size 관련 */
    width: auto;
    height: auto;

    /* margin, padding */
    margin: 0 auto;
    padding: 12px;

    /* background 관련 */
    background-color: #ffffff;

    /* border 관련 */
    border: 1px solid #ffffff;
    border-radius: 12px;

    /* font 관련 */
    font-size: 24px;
    font-weight: 700;
    text-align: center;

    /* animation 관련 */
    transform: translate(10px, 100%);
    transition: 300ms;
  }
  ```
