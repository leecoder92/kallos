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

const MyPageUpdate: FC = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ justifyContent: "center" }}>
        <Grid container justifyContent="center">
          <Grid item direction="column" sx={{ mt: 20 }} align="center">
            <Typography variant="h3" align="center" sx={{ mb: 3 }}>
              회원 정보 수정
            </Typography>
            <Grid sx={{ p: 10 }} align="center" lg={12}>
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
              <Grid direction="row" spacing={4} sx={{ mt: 4 }} align="right">
                <Button variant="contained">수정 완료</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyPageUpdate;
