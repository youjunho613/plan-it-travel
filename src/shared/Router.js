import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, Map, Detail, Survey } from "pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
