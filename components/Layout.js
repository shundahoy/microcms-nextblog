import React from "react";
import Header from "./Header";
const Layout = ({ children, pageName }) => {
  return (
    <>
      <Header pageName={pageName} />
      <main className="main-wrap">{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
