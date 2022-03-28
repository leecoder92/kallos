import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { create, IPFSHTTPClient } from 'ipfs-http-client'
import { Box, Button, Container, Stack, TextField, Typography, Dialog, DialogContent, DialogActions, CssBaseline } from "@mui/material";
import defaultImage from "../public/images/default-image.jpg";
import Image from "next/image";
import Link from "next/link";
import { mintKallosTokenContract, web3} from "web3Config";

interface MainProps {
  account: string;
}

// ipfs request
const ipfsClient = require('ipfs-http-client');
const projectId = '26r91y8NYOlD5hMX5CYsWQ1qFuc';
const projectSecret = 'de18b82921385c7f06cc1dc10bba3229';
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

const Create = ({ account }) =>  {
  const [privateKey, setPrivateKey] = useState<string>('');
  // console.log(account)

  //이미지 미리보기 
    const [image, setImage] = useState({
      image_file: "",
      preview_URL: defaultImage,
    });
    const [loaded, setLoaded] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    let inputRef:any;
    // console.log(image);
    
    //IPFS  
    let ipfs: IPFSHTTPClient | undefined;
    try {
      ipfs = create({
        url: "https://ipfs.infura.io:5001/api/v0",
  
      });
    } catch (error) {
      console.error("IPFS error ", error);
      ipfs = undefined;
    }
    // url 받아오기
    const saveImage = async (e) => {
      e.preventDefault();
      const fileReader = new FileReader();
      
      if(e.target.files[0]){
        fileReader.readAsDataURL(e.target.files[0])
      }
      let new_image;
      fileReader.onload = () => {
        new_image = fileReader.result
        setImage(
          {
            image_file: e.target.files[0],
            preview_URL: new_image
          }
          )
        setLoaded(true);
      }
      let updateFileUrl;
      try {
        const added = await ipfs.add(e.target.files[0]);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        setFileUrl(url);
        console.log(url)
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }
    
    //버튼누르면 metadata 생성
  //   const [isMint, setIsMint ] = useState(false);
  //   // 등록하기 변수 아이템(파일, 이름, input 클릭 참조), 작가명, 제목, 키워드, 토큰 ID
  //   const [tokenId, setTokenId] = useState<string>('');
  //   const ButtonCreate = async () => {
  //   const { author, title, description } = formInput;
  //   if (!author || !description || !title || !fileUrl) return;
  //   const data = JSON.stringify({ author, description, title, image: fileUrl});
  //   try {
    //     const added = await ipfs.add(data);
    //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //     console.log(data)
    //   } catch(error) {
      //     console.log("Error uploading file: ", error);
      //   }
      //   setIsMint(true);
      // }
      
  const [ formInput, updateFormInput ] = useState({ author : "", title:"", description:""});
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

  //개인키 입력 핸들링
  // const handlePrivateKey = (e) => {
  //   setPrivateKey(e.target.value);
  // }
  // nft로 만들기
  // const createNewNft = async () => {
  //   console.log(account)
  //   try {
  //     if (!account) return;
  //     const newTokenId = await mintKallosTokenContract.methods.MintKallosToken().send({ from : account})
  //     console.log(newTokenId)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // useEffect(() => {
  //   console.log(account);
  // }, []);

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
            <div style={{ cursor:'pointer' }}>
              {loaded === false || loaded === true ? (
                <Image src={image.preview_URL} alt="preview-image" width="350" height="350" onClick={() => inputRef.click()}/>
              ) : (
                <span>이미지를 불러오는 중입니다.</span>
              )}
            </div>
          </Stack>
          <Stack direction="row" sx={{ my : 8}}>
            <Typography variant="h5" sx={{mr : 7.7}}>작가명</Typography>
            <TextField 
              required 
              variant="standard" 
              sx={{ ml: 10, width: 700 }}
              onChange={(e) => updateFormInput({ ...formInput, author : e.target.value})}
              >
            </TextField>
          </Stack>
          <Stack direction="row">
            <Typography variant="h5">제목(작품명)</Typography>
            <TextField 
              required 
              variant="standard" 
              sx={{ml : 10, width:700}}
              onChange={(e) => updateFormInput({ ...formInput, title : e.target.value})}
            >
            </TextField>
          </Stack>
          <Stack direction="row" sx={{ my : 8}}>
            <Typography variant="h5">설명</Typography>
            <TextField 
              required
              variant="standard" 
              sx={{ml : 6, width:700}}
              onChange={(e) => updateFormInput({ ...formInput, description : e.target.value})}
            >
            </TextField>
          </Stack>  
        </Box>
        {/* 버튼 끝으로 옮기기 */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Button 
            onClick={createMint} 
            variant="contained" 
            size="large" 
            sx={{ mr : 28}}
            // onSubmit={ButtonCreate}
          >
            등록하기
          </Button>
          {/* <Dialog 
            open={open}
            onClose={handleClose}
          >
            <DialogContent sx={{ width : 400}}>
              <h3>등록 승인하기</h3>
              <TextField label="개인키 입력" sx={{ width : 350}}></TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button>승인하기</Button>
            </DialogActions>
          </Dialog> */}
        </Box>
      </Container>
    </div>
  );
};

export default Create;
