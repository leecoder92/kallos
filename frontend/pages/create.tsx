/* eslint-disable */
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
import { addNewItem } from "@/store/modules/item";
import { connect } from "react-redux";

interface NewItemInfo {
  name: string;
  artist: string;
  privateKey: string;
  keyword: string;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    // addNewItem: (itemInfo) => addNewItem(itemInfo),
  };
};

// interface MainProps {
//   account: string;
// }

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = ({ account }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    name: "",
    description: "",
  });
  //이미지 미리보기
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: defaultImage,
  });
  const [loaded, setLoaded] = useState(false);
  let inputRef: any;

  async function onChange(e) {
    const file = e.target.files[0];
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    let new_image;
    fileReader.onload = () => {
      new_image = fileReader.result;
      setImage({
        image_file: e.target.files[0],
        preview_URL: new_image,
      });
      setLoaded(true);
    };
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
    const { name, description } = formInput;
    if (!name || !description || !fileUrl) return console.log("값이 비어있음");

    const data = JSON.stringify({
      name,
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

  const createSale = async (url) => {
    try {
      const response = await mintKallosTokenContract.methods
        .mintKallosToken(url)
        .send({ from: account });

      // console.log(response);
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
        <Box>
          <Stack direction="row" sx={{ mt: 10 }}>
            <Typography variant="h5" sx={{ mr: 14 }}>
              작품 파일
            </Typography>
            <input
              type="file"
              accept="image/*"
              ref={(refParam) => (inputRef = refParam)}
              onChange={onChange}
              style={{ display: "none" }}
            />
            <div style={{ cursor: "pointer" }}>
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
            </div>
          </Stack>
          <Stack direction="row" sx={{ my: 8 }}>
            <Typography variant="h5" sx={{ mr: 7.7 }}>
              작가명
            </Typography>
            <Typography sx={{ ml: 10, width: 700 }}>
              !!작가이름 props 필요!! (현재 지갑 주소): {account}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography variant="h5">제목(작품명)</Typography>
            <TextField
              required
              variant="standard"
              sx={{ ml: 10, width: 700 }}
              onChange={(e) =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
            ></TextField>
          </Stack>
          <Stack direction="row" sx={{ my: 8 }}>
            <Typography variant="h5">설명</Typography>
            <TextField
              required
              variant="standard"
              sx={{ ml: 21, width: 700 }}
              onChange={(e) =>
                updateFormInput({ ...formInput, description: e.target.value })
              }
            ></TextField>
          </Stack>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={createMint}
            variant="contained"
            size="large"
            sx={{ mr: 29, mb: 5 }}
          >
            등록하기
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Create);
