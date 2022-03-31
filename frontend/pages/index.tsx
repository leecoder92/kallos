/* eslint-disable */
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  ButtonProps,
  styled,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CaliImage from "../public/images/cali.jpg";
import { minWidth } from "@mui/system";
import Head from "next/head";

const ColorButton = styled(Button)({
  backgroundColor: "#F9E6E1",
  color: "black",
  width: "400px",
  "&:hover": {
    backgroundColor: "#F9E6E1",
    color: "black",
  },
});

const Home: NextPage = () => {
  return (
    <Box minWidth="md" className="home-div">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* <Container> */}
      <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
        <Box width="40%" textAlign="center" sx={{ ml: 25 }}>
          <Image src={CaliImage} alt="any image" />
        </Box>
        <Box width="60%" sx={{ mr: 25 }}>
          <Typography variant="h3" sx={{ pb: 10 }}>
            당신의 손글씨를 남기고 싶지 않나요?
            <br />
            <br />
            당신의 글씨의 가치를 보장해드립니다.
          </Typography>
          <Stack
            spacing={{ xs: 0.5, sm: 4.5 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="/create" passHref>
              <ColorButton
                variant="contained"
                size="large"
                sx={{ fontSize: 18 }}
              >
                내 작품 등록하러 가기
              </ColorButton>
            </Link>
            <Link href="/view" passHref>
              <ColorButton
                variant="contained"
                size="large"
                sx={{ fontSize: 18 }}
              >
                다른 작품 구매하러 가기
              </ColorButton>
            </Link>
          </Stack>
        </Box>
      </Stack>
      {/* </Container> */}
      {/* <style jsx>
        {`
          .home-div {
            min-width: "1000px";
          }
        `}
      </style> */}
    </Box>
  );
};

export default Home;
