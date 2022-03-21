import type { NextPage } from "next";
import React, { FC } from "react";
import Navbar from "./Navbar";

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
