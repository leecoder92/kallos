import React, { useState, useEffect } from "react";
import { Box, Button, Container, Stack, TextField, Typography, Dialog, DialogContent, DialogActions } from "@mui/material";
import type { NextPage } from "next";

function Create() {
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return(
    <div>
      <Container>
        <Typography variant="h3" sx={{ my : 5}}>
          NFT 등록하기
        </Typography>
        <Stack direction="row" sx={{ mt : 10}}>
          <Typography variant="h5" sx={{mr : 14}}>작품 파일</Typography>
          {/* Box : 파일 업로드 하는 곳 */}
          <Box sx={{ width : 400, height:300, backgroundColor:'primary.dark' }}></Box>
        </Stack>
        <Stack direction="row" sx={{ my : 8}}>
          <Typography variant="h5" sx={{mr : 7.7}}>작가명</Typography>
          <TextField required variant="standard" sx={{ml : 10, width:700}}></TextField>
        </Stack>
        <Stack direction="row">
          <Typography variant="h5">제목(작품명)</Typography>
          <TextField required variant="standard" sx={{ml : 10, width:700}}></TextField>
        </Stack>
        <Stack direction="row" sx={{ my : 8}}>
          <Typography variant="h5">키워드(optional)</Typography>
          <TextField variant="standard" sx={{ml : 6, width:700}}></TextField>
        </Stack>
        {/* 버튼 끝으로 옮기기 */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={handleOpen} variant="contained" size="large" sx={{ mr : 28}}>등록하기</Button>
          <Dialog 
            open={open}
            onClose={handleClose}
          >
            <DialogContent sx={{ width : 400}}>
              <h3>등록 승인하기</h3>
              <TextField label="개인키 입력" sx={{ width : 350}}></TextField>
            </DialogContent>
            <DialogActions>
              <Button>취소</Button>
              <Button>승인하기</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
}

export default Create;