import React from "react";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";

const CollectionCard = () => {
  return (
    <Card sx={{ maxWidth: 345, mx: 3, mt: 6 }}>
      <CardMedia
        component="img"
        height="280"
        image="https://source.unsplash.com/random"
        alt="작품"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          작가명
        </Typography>
        <Typography>
          작품 정보 작품 정보 작품 정보 작품 정보 작품 정보 작품 정보 작품 정보
          작품 정보 작품
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button>구매하기</Button>
      </CardActions>
    </Card>
  );
};

export default CollectionCard;
