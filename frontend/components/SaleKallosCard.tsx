import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { text } from "stream/consumers";
import {
  mintKallosTokenContract,
  saleKallosTokenContract,
  web3,
} from "../web3Config";
import { IMyKallosData } from "../interfaces";
import axios from "axios";
import Image from "next/image";

interface SaleKallosCardProps extends IMyKallosData {
  account: string;
  getOnSaleTokens: () => Promise<void>;
}

const SaleKallosCard: FC<SaleKallosCardProps> = ({
  id,
  uri,
  price,
  account,
  getOnSaleTokens,
}) => {
  //살 수 있나 없나
  const [metadata, setMetaData] = useState<any>();
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getMetadata = async () => {
    try {
      const response = await axios.get(uri);

      setMetaData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getKallosTokenOwner = async () => {
    try {
      const response = await mintKallosTokenContract.methods.ownerOf(id).call();

      setIsBuyable(
        response.toLocaleLowerCase() === account.toLocaleLowerCase()
      );
    } catch (error) {
      console.error(error);
    }
  };

  //구매 로직
  const onClickBuy = async () => {
    try {
      if (!account) return;

      const response = await saleKallosTokenContract.methods
        .purchaseKallosToken(id)
        .send({ from: account, value: price });

      if (response.status) {
        getOnSaleTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMetadata();
    getKallosTokenOwner();
  }, []);

  return (
    <Box textAlign="center" w={150}>
      {metadata && (
        <Image
          width="300px"
          height="300px"
          src={metadata.image}
          alt="NFT Image"
        />
      )}
      <Box>
        <Text d="inline-block">{web3.utils.fromWei(price)} MATIC</Text>
        {isBuyable ? null : (
          <Button size="sm" colorScheme="green" m={2} onClick={onClickBuy}>
            Buy
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SaleKallosCard;
