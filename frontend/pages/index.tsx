import type { NextPage } from "next";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import React, { FC, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { mintAnimalTokenContract } from "contracts";
import Test from "./api/counter";
import AnimalCard from "../components/AnimalCard";

interface MainProps {
  account: string;
}

const Home: FC<MainProps> = () => {
  const [account, setAccount] = useState<string>("");
  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("Install Metamask");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(account);
    getAccount();
  }, [account]);
  const [newAnimalType, setNewAnimalType] = useState<string>();
  const onClickMint = async () => {
    try {
      if (!account) return;

      const response = await mintAnimalTokenContract.methods
        .mintAnimalToken()
        .send({
          from: account,
        });

      if (response.status) {
        const balanceLength = await mintAnimalTokenContract.methods
          .balanceOf(account)
          .call();

        const animalTokenId = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength, 10) - 1)
          .call();

        const animalType = await mintAnimalTokenContract.methods
          .animalTypes(animalTokenId)
          .call();

        setNewAnimalType(animalType);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      w="full"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box>
        {newAnimalType ? (
          <AnimalCard animalType={newAnimalType} />
        ) : (
          <Text>Let us mint Animal Card!!</Text>
        )}
      </Box>
      <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>
        Mint
      </Button>
    </Flex>
  );
};

export default Home;
