import react from 'react';
import Image from "next/image";
import guide1 from "../public/images/guide/guide1.png"
import guide2 from "../public/images/guide/guide2.png"
import guide301 from "../public/images/guide/guide3-1.png"
import guide302 from "../public/images/guide/guide3-2.png"
import guide303 from "../public/images/guide/guide3-3.png"
import guide401 from "../public/images/guide/guide4-1.png"
import guide402 from "../public/images/guide/guide4-2.png"
import guide5 from "../public/images/guide/guide5.png"
import { Typography, Box, Link, Stack, Container } from "@mui/material";

const guide = () => {
  return (
    <Container sx={{ mt : 10, textAlign:"center"}}>
      <Typography variant="h3">
        Metamask 사용방법(10 STEPS)
      </Typography>
      <Typography>
        1. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다. 
      </Typography>
      <Typography>
        (단, chrome에 싸피 관련 홈페이지(에듀싸피, 깃랩, 프로젝트 싸피 등)를 먼저 들어가게 되면 메타마스크 확장프로그램이 실행되지 않으니 유의바랍니다!) 
      </Typography>
      <Link href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" underline='none'>
        확장 프로그램 링크
      </Link>
      <Image 
        src={guide1} alt="guide1"
      />
      <Typography>
        2. 확장 프로그램 설치 후, 확장 프로그램을 눌러줍니다. 아래의 화면이 뜨면 시작하기 버튼을 눌러줍니다! 
      </Typography>
      <Image 
        src={guide2} alt="guide2"
      />
      <Typography>
        3.우리는 메타 마스크가 처음이기 때문에 오른쪽의 지갑 생성 버튼을 누르고 메타마스크 개선에 참여 동의까지 눌러줍니다. 그리고 메타마스크에 쓰일 비밀번호까지 만들어줍니다.
      </Typography>
      <Stack>
        <Image 
          src={guide301} alt="guide3-1"
        />
        <Image 
          src={guide302} alt="guide3-2"
        />
        <Image 
          src={guide303} alt="guide3-3"
        />
      </Stack>
      <Typography>
        4. 다음은 비밀 복구 구문인데 이 구문이 있어야지 어디서든 계정을 백업하거나 복구할 수 있습니다.
      </Typography>
      <Typography>
        비밀 복구 구문은 반드시 따로 그대로 적어서 보관을 해주세요(단어 순서도 중요)!!!!아주 중요!!!! 누군가가 당신의 비밀 복구 구문을 알게되면 당신의 계정은 뺏긴 것입니다.  
      </Typography>
      <Typography>
        비밀 복구 구문은 중요하기 때문에 아래 페이지의 동영상을 보는 것을 추천드립니다!! 비밀 백업 구문 확인까지 완료해주시면 됩니다. 
      </Typography>
      <Stack>
        <Image 
          src={guide401} alt="guide4-1"
        />
        <Image 
          src={guide402} alt="guide4-2"
        />
      </Stack>
      <Typography>
        5. 아래 화면이 나오면 회원가입 성공!!! 
      </Typography>
      <Image 
        src={guide5} alt="guide5"
      />
      <Typography>
      6. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다. 
      </Typography>
      <Typography>
      7. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다. 
      </Typography>
      <Typography>
      8. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다. 
      </Typography>
      <Typography>
      9. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다. 
      </Typography>
      <Typography>
      10. Chrome에서 메타마스크를 검색해 확장 프로그램(link)을 먼저 깔아줍니다. 
      </Typography>
    </Container>
  )
}

export default guide;