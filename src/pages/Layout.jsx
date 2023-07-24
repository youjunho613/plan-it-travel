import { Outlet } from "react-router";

export const Layout = ({ children }) => {
  return (
    <>
      <Outlet />
      {children}
    </>
  );
};
