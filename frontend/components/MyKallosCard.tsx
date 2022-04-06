import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { saleKallosTokenContract, web3 } from "../web3Config";
import { IMyKallosData } from "../interfaces";
import axios from "axios";
import Image from "next/image";
import {
  Typography,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  styled,
} from "@mui/material";
import Link from "next/link";
import LoadingInterface from "@/components/LoadingInterface";

interface MyKallosCardProps extends IMyKallosData {
  saleStatus: boolean;
  account: string;
  kallosData: any;
}

const ColorButton = styled(Button)({
  backgroundColor: "#F9E6E1",
  color: "black",
  "&:hover": {
    backgroundColor: "#F9E6E1",
    color: "black",
  },
});

const MyKallosCard: FC<MyKallosCardProps> = ({
  id,
  price,
  saleStatus,
  account,
  kallosData,
}) => {
  const [sellPrice, setSellPrice] = useState<any>("");
  const [myKallosPrice, setMyKallosPrice] = useState<any>(price);

  const [sellLoad, setSellLoad] = useState(false);

  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await saleKallosTokenContract.methods
        .setForSaleKallosToken(id, web3.utils.toWei(String(sellPrice), "ether"))
        .send({ from: account })
        .on("transactionHash", () => {
          setSellLoad(true);
        });

      if (response.status) {
        setMyKallosPrice(web3.utils.toWei(String(sellPrice), "ether"));
        setSell();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setSell = async () => {
    const setSellParams = {
      tokenId: id,
      price: sellPrice,
    };
    await axios
      .put("https://j6c107.p.ssafy.io:8443/api/item/sell", setSellParams)
      .then((res) => {
        console.log("put 보낸 결과는", res);
      });
  };

  return (
    <>
      {sellLoad ? (
        <>
          <LoadingInterface />
          <Typography variant="h6" align="center">
            작품 판매 중
          </Typography>
        </>
      ) : (
        <div>
          <Box
            sx={{
              borderRadius: "10px",
              boxShadow: "0 0 5px #cfd4d1",
              overflow: "hidden",
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
                <Link href={`/items/${kallosData.authorAddress}`}>
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
          <div>
            {myKallosPrice === 0 ? (
              <div
                style={{ display: "flex", height: "24px", marginTop: "3px" }}
              >
                <FormControl fullWidth>
                  <OutlinedInput
                    sx={{ height: "24px" }}
                    fullWidth
                    value={sellPrice}
                    onChange={onChangeSellPrice}
                    endAdornment={
                      <InputAdornment position="end">Matic</InputAdornment>
                    }
                  />
                </FormControl>
                <ColorButton
                  style={{ width: "40%" }}
                  onClick={onClickSell}
                  disabled={!saleStatus}
                >
                  판매
                </ColorButton>
              </div>
            ) : (
              <Typography>{String(myKallosPrice)} MATIC</Typography>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyKallosCard;
