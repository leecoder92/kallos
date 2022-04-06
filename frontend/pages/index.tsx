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
// 이미지
import CaliImage1 from "../public/images/test_cali/cali1.jpg";
import CaliImage2 from "../public/images/test_cali/cali2.png";
import CaliImage3 from "../public/images/test_cali/cali3.jpg";
import CaliImage4 from "../public/images/test_cali/cali4.jpg";
import CaliImage5 from "../public/images/test_cali/cali5.jpg";

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
    { image: CaliImage1, name: "cali1" },
    { image: CaliImage2, name: "cali2" },
    { image: CaliImage3, name: "cali3" },
    { image: CaliImage4, name: "cali4" },
    { image: CaliImage5, name: "cali5" },
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
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ mt: { lg: 20, md: 15 } }}
      >
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
