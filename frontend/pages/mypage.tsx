import { FC } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mintKallosTokenContract, saleKallosTokenAddress } from "web3Config";
import MyKallosCard, { IMyKallosCard } from "../components/MyKallosCard";
import Image from "next/image";

const MyPage = ({ account }) => {
  const [kallosCardArray, setKallosCardArray] = useState<IMyKallosCard[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const getKallosTokens = async () => {
    try {
      const balanceLength = await mintKallosTokenContract.methods
        .balanceOf(account)
        .call();

      if (balanceLength === "0") return;

      const tempKallosCardArray: IMyKallosCard[] = [];

      const response = await mintKallosTokenContract.methods
        .getKallosToken(account)
        .call();

      console.log(response);
      response.map((item: IMyKallosCard) => {
        tempKallosCardArray.push({
          kallosTokenId: item.kallosTokenId,
          kallosType: item.kallosType,
          kallosPrice: item.kallosPrice,
        });
      });
      setKallosCardArray(tempKallosCardArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintKallosTokenContract.methods
        .isApprovedForAll(account, saleKallosTokenAddress)
        .call();

      if (response) setSaleStatus(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return;

      const response = await mintKallosTokenContract.methods
        .setApprovalForAll(saleKallosTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;

    getIsApprovedForAll();
    getKallosTokens();
  }, [account]);

  useEffect(() => {
    console.log(kallosCardArray);
  }, [kallosCardArray]);

  return (
    <div className="container">
      <Link href="/regist">
        <a>
          <button>regist</button>
        </a>
      </Link>
      <p>Sale Status: {saleStatus ? "True" : "False"}</p>
      <button onClick={onClickApproveToggle}>
        {saleStatus ? "Cancel" : "Approve"}
      </button>

      <h1>My Page</h1>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginRight: "40px" }}
        >
          <Image width={200} height={200} src={"/images/1.png"}></Image>
          <Box>
            <Link href="/mypageupdate">
              <a>
                <Button>정보수정</Button>
              </a>
            </Link>
            <p>이름</p>
            <p>계좌(지갑)</p>
            <p>보유 작품 수</p>
            <p>등등</p>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 200px)",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 7,
            rowGap: 3,
            columnGap: 1,
          }}
        >
          {kallosCardArray &&
            kallosCardArray.map((item, idx) => {
              return (
                <MyKallosCard
                  key={idx}
                  kallosTokenId={item.kallosTokenId}
                  kallosType={item.kallosType}
                  kallosPrice={item.kallosPrice}
                  saleStatus={saleStatus}
                  account={account}
                />
              );
            })}
        </Box>
      </Box>
      <style jsx>
        {`
          .container {
            min-width: 800px;
            margin: 100px 200px;
          }
          h1 {
            text-align: center;
            margin-bottom: 70px;
            font-size: 50px;
          }
        `}
      </style>
    </div>
  );
};

export default MyPage;
