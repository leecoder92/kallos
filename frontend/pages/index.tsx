import type { NextPage } from "next";
import React, { FC } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Test from "./api/counter";

const Home: FC = () => {
  return <Test></Test>;
};

export default Home;
