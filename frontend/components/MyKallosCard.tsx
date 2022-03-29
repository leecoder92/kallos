import React, { ChangeEvent, FC, useEffect, useState } from "react";
import KallosCard from "./KallosCard";
import { saleKallosTokenContract, web3 } from "../web3Config";
import { IMyKallosData } from "../interfaces";
import axios from "axios";
import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";

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

  const getMetadata = async () => {
    try {
      const response = await axios.get(uri);

      setMetaData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const onChangeSellPrice = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSellPrice(event.target.value);
  // };

  // const onClickSell = async () => {
  //   try {
  //     if (!account || !saleStatus) return;

  //     const response = await saleKallosTokenContract.methods
  //       .setForSaleKallosToken(
  //         kallosTokenId,
  //         web3.utils.toWei(sellPrice, "ether")
  //       )
  //       .send({ from: account });

  //     if (response.status)
  //       setMyKallosPrice(web3.utils.toWei(sellPrice, "ether"));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getMetadata();
  }, []);

  return (
    <div>
      {metadata && <Image src={metadata.image} alt="Animal Card" />}
      {/* <p>제목: {metadata.title}</p>
      <p>설명: {metadata.description}</p> */}
      {/* <div>
        {myKallosPrice === "0" ? (
          <>
            <form>
              <input
                type="number"
                value={sellPrice}
                // onChange={onChangeSellPrice}
              />
              MATIC
            </form>
            <button>Sell</button>
          </>
        ) : (
          <p>{web3.utils.fromWei(myKallosPrice)} SSF</p>
        )}
      </div> */}
    </div>
  );
};

export default MyKallosCard;
