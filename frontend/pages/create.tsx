import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  CssBaseline,
  ButtonBase,
} from "@mui/material";
import defaultImage from "../public/images/default-image.jpg";
import Image from "next/image";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { mintKallosTokenContract } from "web3Config";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function Create({ account }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    title: "",
    description: "",
  });

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

  // const saveImage = (e) => {
  //   e.preventDefault();
  //   const fileReader = new FileReader();

  //   if (e.target.files[0]) {
  //     setLoaded("loading");
  //     fileReader.readAsDataURL(e.target.files[0]);
  //   }
  //   fileReader.onload = () => {
  //     setImage({
  //       image_file: e.target.files[0],
  //       preview_URL: fileReader.result,
  //     });
  //     setLoaded(true);
  //   };
  // };

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
      console.log("file url:", fileUrl);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const createMint = async () => {
    const { title, description } = formInput;
    if (!title || !description || !fileUrl) return console.log("값이 비어있음");

    const data = JSON.stringify({
      title,
      description,
      image: fileUrl,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log("url은", url);
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  // async function createMint() {
  // }

  const createSale = async (url) => {
    try {
      const response = await mintKallosTokenContract.methods
        .mintKallosToken(url)
        .send({ from: account });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container>
        <Typography variant="h3" sx={{ my: 8 }}>
          NFT 등록하기
        </Typography>
        {/* <h1>NFT 등록하기</h1> */}
        <Box>
          <Stack direction="row" sx={{ mt: 10 }}>
            <Typography variant="h5" sx={{ mr: 14 }}>
              작품 파일
            </Typography>
            <input
              type="file"
              name="Asset"
              className="my-4"
              onChange={onChange}
            />
            {fileUrl && (
              <Image
                className="rounded mt-4"
                width="300px"
                height="300px"
                src={fileUrl}
              />
            )}

            {/* <input
              type="file"
              accept="image/*"
              onChange={saveImage}
              ref={(refParam) => (inputRef = refParam)}
              style={{ display: "none" }}
            />
            <div className="img-wrapper" style={{ cursor: "pointer" }}>
              {loaded === false || loaded === true ? (
                <Image
                  src={image.preview_URL}
                  alt="preview-image"
                  width="350"
                  height="350"
                  onClick={() => inputRef.click()}
                />
              ) : (
                <span>이미지를 불러오는 중입니다.</span>
              )}
            </div> */}
          </Stack>
          <Stack direction="row" sx={{ my: 8 }}>
            <Typography variant="h5" sx={{ mr: 7.7 }}>
              디스크립션
            </Typography>
            <textarea
              placeholder="Asset Description"
              className="mt-2 border rounded p-4"
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
            />
          </Stack>
          <Stack direction="row">
            <Typography variant="h5">제목(작품명)</Typography>
            <input
              placeholder="Asset Name"
              className="mt-8 border rounded p-4"
              onChange={(e) =>
                updateFormInput({ ...formInput, title: e.target.value })
              }
            />
          </Stack>
          {/* <Stack direction="row" sx={{ my: 8 }}>
            <Typography variant="h5">키워드(optional)</Typography>
            <TextField
              variant="standard"
              sx={{ ml: 6, width: 700 }}
            ></TextField>
          </Stack> */}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={createMint}>등록하기</Button>
        </Box>

        {/* 버튼 끝으로 옮기기 */}
        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
        </Box> */}
      </Container>
    </div>
  );
}
