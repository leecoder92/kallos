/* eslint-disable */
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CaliImage from "../public/images/cali.jpg";

const Home: NextPage = () => {
  return (
    <div>
      <Container>
        <Stack direction="row" justifyContent="center">
          <Box width="40%" textAlign="center" sx={{ mt: 10, mr: 20 }}>
            <Image src={CaliImage} alt="any image" />
          </Box>
          <Box width="60%" sx={{ mt: 10, mr: 20 }}>
            <Typography variant="h3" sx={{ pb: 10 }}>
              당신의 손글씨를 남기고 싶지 않나요?
              <br />
              당신의 글씨의 가치를 보장해드립니다.
            </Typography>
            <Stack spacing={{ xs: 0.5, sm: 4.5 }}>
              <Link href="/create" passHref>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ fontSize: 18 }}
                >
                  내 작품 등록하러 가기
                </Button>
              </Link>
              <Link href="/view" passHref>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ fontSize: 18 }}
                >
                  다른 작품 구매하러 가기
                </Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
