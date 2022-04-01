/* eslint-disable */
import type { NextPage } from "next";
import React from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import CaliImage from "../public/images/cali.jpg";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "../store/modules";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const isLogin = useSelector((state: RootState) => state.loginReducer.value);
  const handleForceLogin = () => {
    if (!isLogin) {
      alert("로그인을 하셔야 작품등록이 가능합니다.");
    } else {
      router.push("/create");
    }
  };
  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&family=Nanum+Pen+Script&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* <Container> */}
      <Stack direction="row" justifyContent="center" sx={{ mt: 10 }}>
        <Box
          width="40%"
          textAlign="center"
          sx={{ mt: 10, mx: { lg: 20, md: 10, xs: 5 } }}
        >
          <Image src={CaliImage} alt="any image" />
        </Box>
        <Box
          width="60%"
          sx={{ mt: 10, mr: { lg: 20, md: 10, xs: 5 }, textAlign: "center" }}
        >
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
            <ColorButton
              variant="contained"
              size="large"
              sx={{ fontSize: 18 }}
              onClick={handleForceLogin}
            >
              내 작품 등록하러 가기
            </ColorButton>
            <Link href="/explore" passHref>
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
    </div>
  );
};

export default Home;
