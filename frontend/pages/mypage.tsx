import { FC, useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  Box,
  TextField,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import CollectionCard from "../components/CollectionCard";
import Link from "next/link";
import { IMyKallosData } from "../interfaces";
import MyKallosCard from "@/components/MyKallosCard";

import {
  mintKallosTokenContract,
  saleKallosTokenContract,
  getKallosTokenContract,
} from "web3Config";

import { getUserInfo, getAllItemsOfUser } from "@/store/modules/user";
import { RootState } from "../store/modules";
import { connect } from "react-redux";

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

const MyPage: FC = ({ account }) => {
  const [kallosTokens, setKallosTokens] = useState<IMyKallosData[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

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

  useEffect(() => {
    getKallosTokens();
  }, [account]);

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 20, justifyContent: "center" }}>
        <Grid container spacing={10}>
          <Grid item direction="column" md={3} alignItems="center">
            <Typography sx={{ mb: 5 }}>프로필 사진</Typography>
            <Box sx={{ py: 5, px: 3, bgcolor: "text.disabled" }} spacing={8}>
              <Stack direction="column" spacing={2}>
                <Link href={"/mypageupdate"} passHref>
                  <Button
                    style={{
                      color: "white",
                      backgroundColor: "#1b5e20",
                    }}
                  >
                    프로필 편집
                  </Button>
                </Link>
                <Typography>이름</Typography>
                <Typography>계좌(지갑)</Typography>
                <Typography>보유 작품 수</Typography>
                <Typography>등등</Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item direction="column" md={9}>
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
