/* eslint-disable */
import { FC } from "react";
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

import { updateUserInfo } from "@/store/modules/user";
import { RootState } from "../store/modules";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    //   updateUserInfo: (paramsObj) => updateUserInfo(paramsObj),
  };
};

const MyPageUpdate: FC = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ justifyContent: "center" }}>
        <Grid container justifyContent="center">
          <Grid item direction="column" sx={{ mt: 20 }} alignItems="center">
            <Typography variant="h3" align="center" sx={{ mb: 3 }}>
              회원 정보 수정
            </Typography>
            <Grid sx={{ p: 10 }} alignItems="center" lg={12}>
              <Stack direction="row" spacing={4}>
                <Typography>이름</Typography>
                <TextField defaultValue={"유저이름"}></TextField>
                <Button variant="contained">중복 확인</Button>
              </Stack>
              <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
                <Typography>소개글</Typography>
                <TextField defaultValue={"소개글"}></TextField>
              </Stack>
              <Grid direction="row" spacing={4} sx={{ mt: 4 }}>
                <Button variant="contained">프로필 이미지 변경</Button>
              </Grid>
              <Grid
                direction="row"
                spacing={4}
                sx={{ mt: 4 }}
                alignItems="right"
              >
                <Button variant="contained">수정 완료</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPageUpdate);
