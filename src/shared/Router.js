import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, Main, Detail, Survey, Layout } from "pages";
import Header from "components/Header/Header";
import MyPage from "pages/MyPage";

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
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
