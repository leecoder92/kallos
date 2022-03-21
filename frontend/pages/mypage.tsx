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
import CollectionCard from "../components/CollectionCard";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Row() {
  return (
    <Grid container>
      <Stack direction="row">
        <Grid item xs={3}>
          <CollectionCard />
        </Grid>
        <Grid item xs={3}>
          <CollectionCard />
        </Grid>
        <Grid item xs={3}>
          <CollectionCard />
        </Grid>
        <Grid item xs={3}>
          <CollectionCard />
        </Grid>
      </Stack>
    </Grid>
  );
}

const MyPage: FC = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 20, justifyContent: "center" }}>
        <Grid container spacing={10}>
          <Grid item direction="column" md={3} align="center">
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
            <Typography>보유 중인 작품</Typography>
            <Row />
            <Row />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyPage;
