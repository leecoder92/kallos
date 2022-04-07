/* eslint-disable */
import type { NextPage } from "next";
import React from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
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

const IndexImages = [
  require("../public/images/test_cali/daye.jpg"),
  require("../public/images/test_cali/jisu1.jpg"),
  require("../public/images/test_cali/jisu2.jpg"),
  require("../public/images/test_cali/jongjun.png"),
  require("../public/images/test_cali/nayeong.png"),
];

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
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ mt: { lg: 20, md: 15 } }}
      >
        <Box
          width="40%"
          textAlign="center"
          sx={{
            mt: 2,
            mx: { lg: 20, md: 10, xs: 5 },
          }}
        >
          <Carousel
            height="60vh"
            animation="slide"
            duration={1000}
            indicators={false}
            navButtonsAlwaysInvisible={true}
            stopAutoPlayOnHover={false}
          >
            {IndexImages.map((item, i) => (
              <Image width="550px" height="550px" key={i} src={item} alt="#" />
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
