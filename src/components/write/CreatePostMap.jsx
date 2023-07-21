// import { Button, Input } from "components/common";
// import { useEffect, useState } from "react";
// import { Map, MapMarker } from "react-kakao-maps-sdk";

// const { kakao } = window;

// function CreatePostMap() {
//   const [position, setPosition] = useState({ lat: "", lng: "" });
//   const [clickPosition, setClickPosition] = useState({ lat: "", lng: "" });
//   const [map, setMap] = useState();
//   const [value, setvalue] = useState("");
//   const [address, setAddress] = useState("");

//   useEffect(() => {
//     const currentLoaction = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//           setPosition({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//         });
//       }
//     };
//     currentLoaction();
//   }, []);

//   const submitSearchValue = event => {
//     event.preventDefault();
//     const ps = new kakao.maps.services.Places();

//     ps.keywordSearch(value, (data, status) => {
//       if (status === kakao.maps.services.Status.OK) {
//         const bounds = new kakao.maps.LatLngBounds();
//         const { y, x } = data[0];
//         console.log(data[0].y);
//         bounds.extend(new kakao.maps.LatLng(y, x));
//         map.setBounds(bounds);
//       } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//         alert("검색 결과가 없습니다. 검색어를 확인해주세요");
//         return;
//       }
//     });
//   };

//   const getAddress = (lat, lng) => {
//     const geocorder = new kakao.maps.services.Geocoder();
//     let coord = new kakao.maps.LatLng(lat, lng);
//     const callback = (result, status) => {
//       if (status === kakao.maps.services.Status.OK) {
//         const arr = { ...result };
//         const _arr = arr[0].address.address_name;
//         setAddress(_arr);
//       }
//     };
//     geocorder.coord2Address(coord.getLng(), coord.getLat(), callback);
//   };

//   return (
//     <Map
//       center={position}
//       style={{ width: "100%", height: "450px" }}
//       level={4}
//       onCreate={setMap}
//       onClick={(_t, MouseEvent) => {
//         setClickPosition({ lat: MouseEvent.latLng.getLat(), lng: MouseEvent.latLng.getLng() });
//         getAddress(clickPosition.lat, clickPosition.lng);
//       }}
//     >
//       <Input $bgcolor={"white"} value={address} disabled />
//       <form onSubmit={submitSearchValue}>
//         <input
//           type="text"
//           style={{ color: "black" }}
//           value={value}
//           autoFocus
//           onChange={e => setvalue(e.target.value)}
//         />
//       </form>

//       {position && <MapMarker position={clickPosition} />}
//     </Map>
//   );
// }

// export default CreatePostMap;
