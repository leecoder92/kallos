import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Container, Box, Stack, Typography } from "@mui/material";

const animationImages = [
  require("../public/images/loading/writing1.png"),
  require("../public/images/loading/writing2.png"),
  require("../public/images/loading/writing3.png"),
  require("../public/images/loading/writing4.png"),
  require("../public/images/loading/writing5.png"),
  require("../public/images/loading/writing6.png"),
  require("../public/images/loading/writing7.png"),
];

const LoadingInterface: FC = () => {
  const [num, setNum] = useState<number>(1);

  useEffect(() => {
    let cnt = 0;
    let cntInterval = setInterval(() => {
      setNum(cnt++ % 7);
    }, 1000 / 2);

    return () => clearInterval(cntInterval);
  }, []);

  return (
    <div className="viewContainer">
      <Stack
        sx={{
          alignItems: "center",
        }}
      >
        <Image
          src={animationImages[num]}
          key={num}
          alt="pencil"
          width="300px"
          height="300px"
        />
        <Typography sx={{ marginTop: "20px" }}>작품 판매 중</Typography>
      </Stack>
      <style jsx>
        {`
          .viewContainer {
            width: inherit;
            height: inherit;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingInterface;
