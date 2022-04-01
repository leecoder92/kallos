import type { NextPage } from "next";
import React, { FC } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: NextPage = ({ children }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
