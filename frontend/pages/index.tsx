/* eslint-disable */
import type { NextPage } from "next";
import React from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import CaliImage from "../public/images/cali.jpg";
<<<<<<< HEAD
import { minWidth } from "@mui/system";
=======
>>>>>>> 017410f6dc6ea513f31e8a07b54365f58f0b0c09
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
<<<<<<< HEAD
    <Box minWidth="md" className="home-div">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap"
=======
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&family=Nanum+Pen+Script&display=swap"
>>>>>>> 017410f6dc6ea513f31e8a07b54365f58f0b0c09
          rel="stylesheet"
        />
      </Head>
      {/* <Container> */}
      <Stack direction="row" justifyContent="center" sx={{ mt: 10 }}>
        <Box width="40%" textAlign="center" sx={{ mt: 10, mx: 20 }}>
          <Image src={CaliImage} alt="any image" />
        </Box>
        <Box width="60%" sx={{ mt: 10, mr: 20 }}>
          <Typography className="ff" variant="h2" sx={{ pb: 10 }}>
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
    </Box>
  );
};

export default Home;
