import React from 'react';
import { Box, Button, Container, Stack, TextField, Typography, CssBaseline, Divider, Grid } from "@mui/material";
import CollectionCard from '../components/CollectionCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Row() {
  return (
    <Grid container>
      <Stack direction="row" >
        <Grid item xs={4}>
          <CollectionCard />
        </Grid>
        <Grid item xs={4}>
          <CollectionCard />
        </Grid>
        <Grid item xs={4}>
          <CollectionCard />
        </Grid>
      </Stack>
    </Grid>
  )
}

export default function creatorDetail() {
  return (
    <div>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
        <Container>
          <Stack direction="row" sx={{ justifyContent : "center"}}>
            {/* 프로필 사진 */}
            <AccountCircleIcon sx={{ fontSize : 120}}/>
            <Box sx={{ m : 1.8}}>
              <Typography variant="h5">
                작가명
              </Typography>
              <Typography>
              Something short and leading about the collection below—its contents, the creator, etc. 
              <br />
              Make it short and sweet, but not too short so folks don't simply skip over it entirely.
              </Typography>
            </Box>
          </Stack>
          <Divider variant="middle" sx={{ my : 5, border: '1px solid black' }}/>
          <Typography variant="h4" align="center">
            판매 작품
          </Typography>
          <Row />
          <Row /> 
        </Container>
        </Box>
      </main>
    </div>
  )
}