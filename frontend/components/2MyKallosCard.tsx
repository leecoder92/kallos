import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { saleKallosTokenContract, web3 } from "../web3Config";
import { IMyKallosData } from "../interfaces";
import axios from "axios";
import Image from "next/image";
import { Co2Sharp } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface MyKallosCardProps extends IMyKallosData {
  saleStatus: boolean;
  account: string;
}

const MyKallosCard: FC<MyKallosCardProps> = ({
  id,
  uri,
  price,
  saleStatus,
  account,
}) => {
  const [metadata, setMetaData] = useState<any>();
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myKallosPrice, setMyKallosPrice] = useState<string>(price);

  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const getMetadata = async () => {
    try {
      const response = await axios.get(uri);

      setMetaData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;

      const response = await saleKallosTokenContract.methods
        .setForSaleKallosToken(id, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });

      // console.dir(response);

      if (response.status) {
        setMyKallosPrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMetadata();
  }, []);

  return (
    <div>
      {metadata && (
        <>
          <Image
            width="300px"
            height="300px"
            src={metadata.image}
            alt="Animal Card"
          />
          <Typography>제목: {metadata.name}</Typography>
          <Typography>설명: {metadata.description}</Typography>
        </>
      )}
      <div>
        {myKallosPrice === "0" ? (
          <>
            <form>
              <input
                type="number"
                value={sellPrice}
                onChange={onChangeSellPrice}
              />
              MATIC
            </form>
            <button onClick={onClickSell} disabled={!saleStatus}>
              Sell
            </button>
          </>
        ) : (
          <Typography>{web3.utils.fromWei(myKallosPrice)} MATIC</Typography>
        )}
      </div>
    </div>
  );
};

export default MyKallosCard;
