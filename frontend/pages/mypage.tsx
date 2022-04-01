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
import { KallosItemCard } from "../components/KallosItemCard";
import { getAllItems } from "../store/modules/item";
import { SaleKallosProps } from "../interfaces";

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
    userItems: state.userReducer.userItems,
    items: state.itemReducer.allItems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    //   setUserInfo: (userAddress) => getUserInfo(userAddress),
    //   setAllItemsOfUser: (paramObj) => getAllItemsOfUser(paramObj),
    setAllItems: (paramObj) => dispatch(getAllItems(paramObj)),
  };
};

//paramObj
interface ParamObj extends SaleKallosProps {
  userAddress: string;
  pageNumber: number;
  itemsPerOnePage: number;
}

const MyPage: FC<ParamObj> = ({ account, items, setAllItems }) => {
  const [kallosTokens, setKallosTokens] = useState<IMyKallosData[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const [onSaleItems, setOnSaleItems] = useState([]);

  const cutAddress1 = account.substr(0, 5);
  const cutAddress2 = account.slice(-4);

  const [curPage, setCurPage] = useState(0);
  const [postsPerPage, setPostPerPage] = useState(10);
  const paginate = (pageNumber) => setCurPage(pageNumber);
  const onChangePostsPerPage = (event) => setPostPerPage(event.target.value);

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

  const params = {
    searchOption: "users",
    page: curPage,
    size: postsPerPage,
  };

  useEffect(() => {
    setAllItems(params);
  }, []);

  useEffect(() => {
    setOnSaleItems(items);
  }, [items]);

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
            <Image src={defaultProfile} width="200px" height="200px" />
            <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
              한석봉
            </Typography>

            <CopyToClipboard text={account}>
              <Tooltip title="Copy" placement="right">
                <Button
                  style={{
                    color: "black",
                  }}
                  variant="outlined"
                  sx={{ mt: 1, borderRadius: 16, borderColor: "text.primary" }}
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
              sx={{ mt: 1 }}
              variant="h6"
              color={saleStatus ? "primary" : "error"}
            >
              {saleStatus ? "판매 등록 가능" : "판매 등록 불가능"}
            </Typography>
            <Button
              sx={{ mt: 1 }}
              onClick={onClickSaleStatus}
              variant="contained"
              color={saleStatus ? "primary" : "error"}
            >
              {saleStatus ? "판매 모드 Off" : "판매 모드 On"}
            </Button>
            <Box
              sx={{
                mt: 1,
                py: 5,
                px: 3,
                bgcolor: "#F9E6E1",
                width: 200,
                height: 380,
              }}
            >
              <Stack direction="column" spacing={2}>
                <Divider>
                  <Chip label="소개글" />
                </Divider>
                <Typography align="center">
                  I need you baby And if it's quite all right I need you baby
                  And if its quite alright I need you baby To warm the lonely
                  nights I love you baby Trust in me when I say its okay
                </Typography>
                <Link href={"/mypageupdate"} passHref>
                  <Button>프로필 수정</Button>
                </Link>
              </Stack>
            </Box>
          </Grid>
          <Grid item direction="column" xs={9}>
            <Typography variant="h4" sx={{ my: 5 }}>
              보유 중인 작품 100개
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
              {onSaleItems?.map((item) => (
                <KallosItemCard key={item.id} kallosData={item} />
              ))}
            </Box>
            {/* {kallosTokens?.map((v, i) => {
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
            })} */}
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
