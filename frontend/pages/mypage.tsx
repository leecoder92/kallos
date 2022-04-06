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
  Tooltip,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { IMyKallosData } from "../interfaces";
// import MyKallosCard from "@/components/MyKallosCard";
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
import { KallosItemCard } from "../components/KallosItemCard";
import { getAllItems } from "../store/modules/item";
import Pagination from "../components/pagination";
import axios from "axios";
import styled from "styled-components";
// import { BACKEND_URL } from "../config/index";

// const ImageWrap = styled.

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
    userItems: state.userReducer.userItems,
    items: state.itemReducer.allItems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserInfo: (userAddress) => dispatch(getUserInfo(userAddress)),
    //   setAllItemsOfUser: (paramObj) => getAllItemsOfUser(paramObj),
    setAllItems: (paramObj) => dispatch(getAllItems(paramObj)),
  };
};

const MyPage = ({ account, items, setAllItems, userInfo, setUserInfo }) => {
  const [kallosTokens, setKallosTokens] = useState<IMyKallosData[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const [onSaleItems, setOnSaleItems] = useState([]);

  const cutAddress1 = account.substr(0, 5);
  const cutAddress2 = account.slice(-4);

  // 판매 상태 전환 로딩 상태
  const [saleStatusLoading, setSaleStatusLoading] = useState<Boolean>(false);

  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [myItems, setMyItems] = useState([]);

  const paginate = (pageNumber) => setCurPage(pageNumber);

  const getKallosTokens = async () => {
    try {
      const response = await getKallosTokenContract.methods
        .getKallosTokens(account)
        .call();

      console.log("토큰리스트", response);
      // setTotalItems(response.length);

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
        .send({ from: account })
        .on("transactionHash", () => {
          setSaleStatusLoading(true);
        });

      if (response.status) {
        setSaleStatus(!saleStatus);
        setSaleStatusLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserItems = async () => {
    const getItemParams = {
      address: account,
      pageNo: curPage,
      itemPerPage: itemsPerPage,
    };

    await axios
      .get("https://j6c107.p.ssafy.io:8443/api/user/mypage/items", {
        params: getItemParams,
      })
      .then((res) => {
        console.log(res.data);
        setTotalPages(res.data.totalPage);
        setMyItems(res.data.items);
      });
  };

  useEffect(() => {
    if (!account) return;

    getKallosTokens();
    getSaleStatus();
    setUserInfo(account);
    getUserItems();
  }, [account]);

  useEffect(() => {
    getUserItems();
  }, [curPage]);

  // useEffect(() => {
  //   getUserItems();
  // }, [myItems]);

  console.log("My Itmes:::", myItems);

  return (
    <div className="viewContainer">
      <Container maxWidth="lg" sx={{ justifyContent: "center" }}>
        <Grid container spacing={10}>
          <Grid
            xs={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 10,
            }}
          >
            {userInfo.profile_img !== null ? (
              <div style={{ borderRadius: "100px", overflow: "hidden" }}>
                <Image
                  src={`https://kallosimages.s3.ap-northeast-2.amazonaws.com/profileImages/${userInfo.profile_img}`}
                  alt="user profile image"
                  width="200px"
                  height="200px"
                />
              </div>
            ) : (
              <div style={{ borderRadius: "100px", overflow: "hidden" }}>
                <Image
                  className="makeImageCircular"
                  src={defaultProfile}
                  width="200px"
                  height="200px"
                />
              </div>
            )}
            <Typography variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
              {userInfo.name}
            </Typography>
            <CopyToClipboard text={account}>
              <Tooltip title="Copy" placement="right">
                <Button
                  style={{
                    color: "black",
                  }}
                  variant="outlined"
                  sx={{ mt: 3, borderRadius: 16, borderColor: "text.primary" }}
                >
                  <Stack direction="row" alignItems="center" spacing={0.7}>
                    <Image src={maticImage} width="25px" height="25px" />
                    <Typography>
                      {cutAddress1}...{cutAddress2}
                    </Typography>
                  </Stack>
                </Button>
              </Tooltip>
            </CopyToClipboard>
            <Typography
              sx={{ mt: 3 }}
              variant="h6"
              color={saleStatus ? "primary" : "error"}
            >
              {saleStatus ? "판매 등록 가능" : "판매 등록 불가능"}
            </Typography>
            {saleStatusLoading ? <CircularProgress color="primary" /> : null}
            <Button
              sx={{ mt: 3 }}
              onClick={onClickSaleStatus}
              variant="contained"
              color={saleStatus ? "error" : "primary"}
            >
              {saleStatus ? "판매 모드 Off" : "판매 모드 On"}
            </Button>
            <Box
              sx={{
                mt: 3,
                py: 5,
                px: 3,
                bgcolor: "#F9E6E1",
                width: 200,
              }}
            >
              <Stack direction="column" spacing={2}>
                <Divider>
                  <Chip label="소개글" />
                </Divider>
                {userInfo.description === null ||
                userInfo.description === "null" ? (
                  <Typography align="center">소개글이 없습니다.</Typography>
                ) : (
                  <Typography align="center">{userInfo.description}</Typography>
                )}
                <Link href={"/mypageupdate"} passHref>
                  <Button>프로필 수정</Button>
                </Link>
              </Stack>
            </Box>
          </Grid>
          <Grid item direction="column" xs={9}>
            <Typography variant="h4" sx={{ my: 5 }}>
              보유 중인 작품
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 200px)",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
                rowGap: 5,
                columnGap: 1,
              }}
            >
              {myItems?.map((item) => (
                <MyKallosCard
                  id={item.tokenId}
                  key={item.item_id}
                  kallosData={item}
                  saleStatus={saleStatus}
                  price={item.price}
                  account={account}
                  uri={item.item_id}
                />
              ))}
            </Box>
            <Pagination
              curPage={curPage}
              setCurPage={setCurPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={totalPages * itemsPerPage}
            />
          </Grid>
        </Grid>
      </Container>
      <style jsx>
        {`
          .viewContainer {
            padding: 150px 200px;
          }
        `}
      </style>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
