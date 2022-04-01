import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

//kallosData: 작품 정보 prop
export const KallosItemCard = ({ kallosData }) => {
  return (
    <Box sx={{ borderRadius: "10px" }}>
      {/* <Link href={`/items/${kallosData.tokenId}`}>
        <a> */}
      <Box sx={{ borderRadius: "20px 20px 0 0", overflow: "hidden" }}>
        <Image
          width="100%"
          height="100%"
          //   src={kallosData.itemHash}
          src="/images/3.png"
          alt="NFT Image"
          layout="responsive"
        />
      </Box>
      {/* </a>
      </Link> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 15px",
          border: "1px solid #cfd4d1",
          borderTop: "none",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <Box>
          {/* <Link href={`/items/${kallosData.tokenId}`}>
            <a> */}
          <Typography>{kallosData.name}</Typography>
          {/* </a>
          </Link>
          <Link href={`/items/${kallosData.makerAddress}`}>
            <a> */}
          <Typography>작가이름</Typography>
          {/* </a>
          </Link> */}
        </Box>
        <Typography>가격</Typography>
      </Box>
    </Box>
  );
};
