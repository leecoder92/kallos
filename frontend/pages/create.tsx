/* eslint-disable */
import React, { useState } from "react";
import { Box, Button, Container, createTheme, Stack, TextField, Typography } from "@mui/material";
import defaultImage from "../public/images/default-image.jpg";
import Image from "next/image";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { mintKallosTokenContract } from "web3Config";
import { addNewItem } from "@/store/modules/item";
import { connect } from "react-redux";
import LoadingInterface from "@/components/LoadingInterface";
import Router from "next/router";
import { ThemeProvider } from "@emotion/react";
import { grey } from '@mui/material/colors';
import styled from 'styled-components';

const Grey = grey[300]
const theme = createTheme({
  palette: {
    primary: {
      main : '#2C3C51',
    },
    secondary: {
      main: '#F9E6E1'
    },
  },
  typography: {
    fontFamily: "Nanum Bold",
  }
})

const StyledButton = styled(Button)`
  background-color: '#F9E6E1';
  color: #000000;
  padding: 10px 25px;
  &:hover {
    background-color: #FFECE6;
  }
`;


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

const ipfsClient = require('ipfs-http-client');

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
console.log(projectId)
const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRECT;
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
    console.log(res);
});


// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

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

  // 작품 등록 중 상태 false: 등록 X, true: 등록 중
  const [createLoad, setCreateLoad] = useState<Boolean>(false);

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
        .send({ from: account })
        // Metamask Confirm 버튼을 클릭하면 로딩이 시작되게
        .on("transactionHash", () => {
          setCreateLoad(true);
        });

      if (response.status) {
        Router.push("/mypage");
      }
    } catch (error) {
      // 에러 코드가 4001(reject)일 때 로딩 멈춤
      // if (error.code === 4001) {
      //   setCreateLoad(false);
      // }
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {createLoad ? (
        <>
          <LoadingInterface />
          <Typography variant="h6" align="center">
            작품 등록을 성공하면 마이페이지로 이동합니다.
          </Typography>
        </>
      ) : (
        <Container sx={{ my: 18, mx: 25 }}>
          <Typography variant="h3" >
            작품 등록하기
          </Typography>
          <Box>
            <Stack direction="row" sx={{ mt: 10 }}>
                <Typography variant="h5" sx={{ mr: 14 }}>
                  작품 파일
                </Typography>
              <Stack>
                <Typography variant="caption" sx={{ marginBottom: 1, color:"Grey"}} >
                  업로드 가능한 확장자: JPG, JPEG, PNG
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
              <Typography variant="h5">작품명</Typography>
              <TextField
                required
                variant="standard"
                sx={{ ml: 17, width: 700 }}
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
                sx={{ ml: 20, width: 700 }}
                onChange={(e) =>
                  updateFormInput({ ...formInput, description: e.target.value })
                }
              ></TextField>
            </Stack>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <StyledButton
              onClick={createMint}
              variant="contained"
              size="large"
              sx={{ mr: 30, mb: 5 }}
              color="secondary"
            >
              등록하기
            </StyledButton>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
};

export default connect(null, mapDispatchToProps)(Create);
