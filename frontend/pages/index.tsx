/* eslint-disable */
import type { NextPage } from "next";
import React from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import CaliImage from "../public/images/test_cali/cali.jpg";
import CssImage from "../public/images/test_cali/css_is_awesome.png";
import TestImage from "../public/images/5.png";
import Carousel from "react-material-ui-carousel";
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
  const testImages = [
    { image: CaliImage, name: "cali" },
    { image: TestImage, name: "test image" },
    { image: CssImage, name: "css image" },
  ];
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
      <Stack direction="row" justifyContent="center" sx={{ mt: 10 }}>
        <Box
          width="40%"
          textAlign="center"
          sx={{
            mt: 10,
            mx: { lg: 20, md: 10, xs: 5 },
          }}
        >
          <Carousel
            height="50vh"
            animation="slide"
            duration={1000}
            indicators={false}
            navButtonsAlwaysInvisible={true}
            stopAutoPlayOnHover={false}
          >
            {testImages.map((item, i) => (
              <Image key={i} src={item.image} alt={item.name} />
            ))}
          </Carousel>
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
