import React, { useState, useEffect } from "react";
import { Box, Button, Container, Stack, TextField, Typography, Dialog, DialogContent, DialogActions, CssBaseline } from "@mui/material";
import defaultImage from "../public/images/default-image.jpg";
import Image from "next/image";

export default function Create() {
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //이미지 미리보기
    const [image, setImage] = useState({
      image_file: "",
      preview_URL: defaultImage,
    });
  
    const [loaded, setLoaded] = useState(false);
  
    let inputRef;
  
    const saveImage = (e) => {
      e.preventDefault();
      const fileReader = new FileReader();
      
      if(e.target.files[0]){
        setLoaded("loading")
        fileReader.readAsDataURL(e.target.files[0])
      }
      fileReader.onload = () => {
        setImage(
          {
            image_file: e.target.files[0],
            preview_URL: fileReader.result
          }
        )
        setLoaded(true);
      }
      
    }
  

  return(
    <div>
      <Container>
        <Typography variant="h3" sx={{ my : 8}}>
          NFT 등록하기
        </Typography>
        {/* <h1>NFT 등록하기</h1> */}
        <Box>
          <Stack direction="row" sx={{ mt : 10}}>
            <Typography variant="h5" sx={{mr : 14}}>작품 파일</Typography>
            {/* Box : 이미지 파일 미리보기 */}
            <input type="file" accept="image/*"
              onChange={saveImage}
              ref={refParam => inputRef = refParam}
              style={{ display: "none" }}
            />
            <div className="img-wrapper" style={{ cursor:'pointer' }}>
              {loaded === false || loaded === true ? (
                <Image src={image.preview_URL} alt="preview-image" width="350" height="350" onClick={() => inputRef.click()}/>
              ) : (
                <span>이미지를 불러오는 중입니다.</span>
              )}
            </div>
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
        </Box>
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
