/* eslint-disable */
import react from "react";
import { Typography, Box, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// image import
import guide6 from "../public/images/guide/guide6.png";
import guide7 from "../public/images/guide/guide7.png";
import guide8 from "../public/images/guide/guide8.png";
import guide9 from "../public/images/guide/guide9.png";
import guide10 from "../public/images/guide/guide10.png";
import guide11 from "../public/images/guide/guide11.png";

const guide = () => {
  return (
    <Container sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h3">Metamask 사용방법(10 STEPS)</Typography>
      <Typography>
        1. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다.
      </Typography>
      <Typography>
        (단, chrome에 싸피 관련 홈페이지(에듀싸피, 깃랩, 프로젝트 싸피 등)를
        먼저 들어가게 되면 메타마스크 확장프로그램이 실행되지 않으니
        유의바랍니다!)
      </Typography>
      <Typography>
        2. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다.
      </Typography>
      <Typography>
        (단, chrome에 싸피 관련 홈페이지(에듀싸피, 깃랩, 프로젝트 싸피 등)를
        먼저 들어가게 되면 메타마스크 확장프로그램이 실행되지 않으니
        유의바랍니다!)
      </Typography>
      <Typography>
        3. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다.
      </Typography>
      <Typography>
        (단, chrome에 싸피 관련 홈페이지(에듀싸피, 깃랩, 프로젝트 싸피 등)를
        먼저 들어가게 되면 메타마스크 확장프로그램이 실행되지 않으니
        유의바랍니다!)
      </Typography>
      <Typography>
        4. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다.
      </Typography>
      <Typography>
        (단, chrome에 싸피 관련 홈페이지(에듀싸피, 깃랩, 프로젝트 싸피 등)를
        먼저 들어가게 되면 메타마스크 확장프로그램이 실행되지 않으니
        유의바랍니다!)
      </Typography>
      <Typography>
        5. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다.
      </Typography>
      <Typography>
        (단, chrome에 싸피 관련 홈페이지(에듀싸피, 깃랩, 프로젝트 싸피 등)를
        먼저 들어가게 되면 메타마스크 확장프로그램이 실행되지 않으니
        유의바랍니다!)
      </Typography>
      <Typography>
        6. 완료 버튼을 누르면 아래 사진으로 이동하게 되는데요. Metamask상의
        본인의 지갑이라고 생각하시면 됩니다. 사진 상단 Account1 밑의 숫자와
        영문자가 섞여 보이는 것이 본인의 지갑 주소이고 현재 잔액은 0ETH 라고
        표시됩니다.
      </Typography>
      <Image src={guide6} alt="guide6" />
      <Typography>
        7. 오른쪽 상단을 보면 이더리움 메인넷이라고 현재 연결되어있는 네트워크가
        표시되어있습니다. 하지만 우리는 폴리곤 네트워크의 뭄바이 테스트넷을
        사용할것이기 때문에 따로 추가해주겠습니다. 오른쪽 상단의 이더리움 메인넷
        옆의 화살표를 누르고 하단에 네트워크 추가를 눌러주세요.
      </Typography>
      <Image src={guide7} alt="guide7" />
      <Typography>
        8. 아래와 같은 화면이 뜨면 네트워크 이름은 임의로 작성해 주시고, 아래
        정보를 그대로 복붙해 넣어주시면 됩니다.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ textAlign: "start" }}>
          새 RPC URL : https://rpc-mumbai.maticvigil.com/
          <br />
          체인 ID : 80001
          <br />
          통화 기호 : MATIC
          <br />
          블록 탐색시 URL : https://mumbai.polygonscan.com/
        </Typography>
      </Box>
      <Image src={guide8} alt="guide8" />
      <Typography>9. 아래의 화면이 보이면 네트워크 추가도 성공!!</Typography>
      <Image src={guide9} alt="guide9" />
      <Typography>
        10. 거래를 하려면 MATIC이 필요한데, 현재 0MATIC입니다. 하지만
        문제없어요!테스트용이기때문에 MATIC 토큰을 무료로 나눠주는 사이트가
        있는데요. 구글에 polygon faucet을 검색하면 나오는 사이트를 클릭해주세요.{" "}
        <br />
        polygon faucet link :{" "}
        <a
          href="https://faucet.polygon.technology/"
          style={{
            textDecoration: "underline",
            textDecorationColor: "blue",
            color: "blue",
          }}
        >
          {" "}
          https://faucet.polygon.technology/
        </a>
        <br />
        아래 사진이 바로 보일테데 다른 것은 건드리지 말고 마지막 wallet
        address에 7번에 설명드린 것 처럼 메타마스크 지갑에서 Account1 아래의
        지갑주소 눌러 복사해 붙여줍니다.
      </Typography>
      <Image src={guide10} alt="guide10" />
      <Typography>
        submit까지 누르고 조금 기다리면 0.5MATIC이 지갑에 들어와있는 것을 확인할
        수 있습니다.
        <br />
        (faucet은 중복 submit이 가능하나 1분에 1번씩 받을 수 있기 때문에 이 점
        유의하시길 바랍니다.)
      </Typography>
      <Image src={guide11} alt="guide11" />
      <Typography>이제 준비 끝!! 저희 사이트에 들어가시면 됩니다!!</Typography>
    </Container>
  );
};

export default guide;
