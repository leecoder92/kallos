import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export const KallosItemCard = ({ kallosData }) => {
  useEffect(() => {
    // getMetadata();
  }, []);
  return (
    <Box>
      <Image width="300px" height="300px" src="/images/1.png" alt="NFT Image" />
      <Box flexDirection="row">
        <Box>
          <Typography>{kallosData.name}</Typography>
          <Typography>작가이름</Typography>
        </Box>
        <Typography>가격</Typography>
      </Box>
    </Box>
  );
};
