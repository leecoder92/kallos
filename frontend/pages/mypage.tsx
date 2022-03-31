/* eslint-disable */
import { FC, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import Link from "next/link";
import { IMyKallosData } from "../interfaces";
import MyKallosCard from "@/components/MyKallosCard";
import {
  mintKallosTokenContract,
  saleKallosTokenContract,
  getKallosTokenContract,
  saleKallosTokenAddress,
} from "web3Config";
import { getUserInfo, getAllItemsOfUser } from "@/store/modules/user";
import { RootState } from "../store/modules";
import { connect } from "react-redux";
import Image from "next/image";
import defaultProfile from "../public/images/defaultProfile.png";
import maticImage from "../public/images/matic-token.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
    userItems: state.userReducer.userItems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    //   setUserInfo: (userAddress) => getUserInfo(userAddress),
    //   setAllItemsOfUser: (paramObj) => getAllItemsOfUser(paramObj),
  };
};

//paramObj
interface ParamObj {
  userAddress: string;
  pageNumber: number;
  itemsPerOnePage: number;
}

const MyPage = ({ account }) => {
  const [kallosTokens, setKallosTokens] = useState<IMyKallosData[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const cutAddress1 = account.substr(0, 5);
  const cutAddress2 = account.slice(-4);
  const getKallosTokens = async () => {
    try {
      const response = await getKallosTokenContract.methods
        .getKallosTokens(account)
        .call();

      console.log("토큰리스트", response);

      setKallosTokens(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getSaleStatus = async () => {
    try {
      const response = await mintKallosTokenContract.methods
        .isApprovedForAll(account, saleKallosTokenAddress)
        .call();

      setSaleStatus(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickSaleStatus = async () => {
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

    getKallosTokens();
    getSaleStatus();
  }, [account]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ mt: 18, justifyContent: "center", mx: 25 }}
      >
        <Grid container spacing={10}>
          <Grid item direction="column" md={3.5} align="center">
            <Image src={defaultProfile} width="200px" height="200px" />
            <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
              유저 이름
            </Typography>
            <CopyToClipboard text={account}>
              <Button variant="outlined">
                {cutAddress1}...{cutAddress2}
              </Button>
            </CopyToClipboard>
            <br></br>
            {/* <Divider sx={{ borderBottomWidth: 5 }} /> */}
            <Button
              sx={{ mt: 1 }}
              onClick={onClickSaleStatus}
              variant="contained"
              color={saleStatus ? "secondary" : "info"}
            >
              {saleStatus ? "판매 모드 Off" : "판매 모드 On"}
            </Button>
            <Box sx={{ mt: 1, py: 5, px: 3, bgcolor: "#F9E6E1" }}>
              <Stack direction="column" spacing={2}>
                {/* <Typography>이름</Typography> */}
                <Divider>
                  <Chip label="소개글" />
                </Divider>
                {/* <Divider>
                  <Chip label="지갑 주소" />
                </Divider> */}

                <Typography>보유 작품 수</Typography>
                <Typography>등등</Typography>
                <Link href={"/mypageupdate"} passHref>
                  <Button>수정</Button>
                </Link>
              </Stack>
            </Box>
          </Grid>
          <Grid item direction="column">
            <Typography variant="h5" color={saleStatus ? "success" : "error"}>
              판매 등록 중 여부:{" "}
              {saleStatus ? "판매 등록 가능" : "판매 등록 불가능"}
            </Typography>
            {/* <Button
              onClick={onClickSaleStatus}
              variant="contained"
              color={saleStatus ? "error" : "success"}
            >
              {saleStatus ? "판매 등록 정지" : "판매 등록하기"}
            </Button> */}
            <Typography variant="h4">보유 중인 작품</Typography>
            {kallosTokens?.map((v, i) => {
              return (
                <MyKallosCard
                  key={i}
                  id={v.id}
                  uri={v.uri}
                  price={v.price}
                  saleStatus={saleStatus}
                  account={account}
                />
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
