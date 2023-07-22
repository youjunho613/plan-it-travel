import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, Main, Detail, Survey, Layout, MyPage } from "pages";
import Header from "components/Header/Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Layout />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/mypage/:uid" element={<MyPage />} />
        </Route>
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
