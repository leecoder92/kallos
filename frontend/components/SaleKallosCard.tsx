import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { text } from "stream/consumers";
import {
  mintKallosTokenContract,
  saleKallosTokenContract,
  web3,
} from "../web3Config";
import KallosCard from "./KallosCard";

interface SaleKallosCardProps {
  kallosType: string;
  kallosPrice: string;
  kallosTokenId: string;
  account: string;
  getOnSaleKallosTokens: () => Promise<void>;
}

const SaleKallosCard: FC<SaleKallosCardProps> = ({
  kallosType,
  kallosPrice,
  kallosTokenId,
  account,
  getOnSaleKallosTokens,
}) => {
  //살 수 있나 없나
  const [isBuyable, setIsBuyable] = useState<boolean>(true);

  const getKallosTokenOwner = async () => {
    try {
      //owner 주소 불러옴
      const response = await mintKallosTokenContract.methods
        .ownerOf(kallosTokenId)
        .call();

      // 주소 비교 시 대소문자 다르면 false라서 소문자로 맞춰주고 비교
      // 작품의 주인일 경우 살 수 없도록 만듬
      response.toLocaleLowerCase() === account.toLocaleLowerCase()
        ? setIsBuyable(false)
        : setIsBuyable(true);
    } catch (error) {
      console.error(error);
    }
  };

  //구매 로직
  const onClickBuy = async () => {
    try {
      if (!account) return;

      const response = await saleKallosTokenContract.methods
        .purchaseKallosToken(kallosTokenId)
        .send({ from: account, value: kallosPrice });

      if (response.status) {
        getOnSaleKallosTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getKallosTokenOwner();
  }, []);

  return (
    <Box textAlign="center" w={150}>
      <KallosCard kallosType={kallosType} kallosTokenId={kallosTokenId} />
      <Box>
        <Text d="inline-block">{web3.utils.fromWei(kallosPrice)} SSF</Text>
        {isBuyable ? (
          <Button size="sm" colorScheme="green" m={2} onClick={onClickBuy}>
            Buy
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default SaleKallosCard;
