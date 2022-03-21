import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import Box from "@mui/material/Box";

const ItemCard = ({ item }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={item.image} width={250} height={280} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>
          <Link href={{
              pathname: `details/${item.itemCode}`
          }}>
            <a>
              <strong>{item.name}</strong>
            </a>
          </Link>
          <br />
          by <span>{item.artist}</span>
        </p>
        <p>{item.price} eth</p>
      </Box>
    </Box>
  );
};

export default ItemCard;
