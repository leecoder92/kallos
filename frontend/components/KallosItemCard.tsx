import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

//kallosData: 작품 정보 prop
export const KallosItemCard = ({ kallosData }) => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        boxShadow: "0 0 5px #cfd4d1",
        overflow: "hidden"
      }}
    >
      <Link href={`/items/${kallosData.tokenId}`}>
        <a>
          <Box sx={{ borderRadius: "20px 20px 0 0" }}>
            <Image
              width="100%"
              height="100%"
              src={`https://kallosimages.s3.ap-northeast-2.amazonaws.com/calligraphyImages/${kallosData.itemImg}`}
              alt="NFT Image"
              layout="responsive"
            />
          </Box>
        </a>
      </Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 15px",
          borderTop: "1px solid #cfd4d1",
        }}
      >
        <Box>
          <Link href={`/items/${kallosData.tokenId}`}>
            <a>
              <Typography>{kallosData.title}</Typography>
            </a>
          </Link>
          <Link href={`/artist/${kallosData.authorAddress}`}>
            <a>
              <Typography>{kallosData.authorName}</Typography>
            </a>
          </Link>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography>{kallosData.price}</Typography>
          <Typography>MATIC</Typography>
        </Box>
      </Box>
    </Box>
  );
};
