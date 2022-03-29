import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { ViewColumn } from "@mui/icons-material";
import { getItemDetail } from "@/store/modules/item";
import { RootState } from "../../store/modules";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => {
  return {
    itemDetail: state.itemReducer.itemDetail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    //   setItemDetail: (tokenId) => getItemDetail(tokenId),
  };
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const ItemDetail = ({ code }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  //작품 상세 정보 조회 api

  const onShowModal = () => setShowModal(!showModal);

  useEffect(() => {
    console.log(code);
  }, [router.isReady]);

  return (
    <div className="detailContainer">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src="/images/5.png" width={250} height={280} alt="token image" />
        <Box
          sx={{
            marginLeft: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <p>제목</p>
          <p>작가</p>
          <p>작품 소개</p>
          <p>가격</p>
          <Button variant="contained" size="large" onClick={onShowModal}>
            구매하기
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showModal}
            onClose={onShowModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={showModal}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  정말 해당 작품을 구매하시겠습니까?
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  해당 제품은 구매 취소 또는 환불이 불가합니다.
                </Typography>
                <Button variant="contained" sx={{ marginTop: "20px" }}>
                  구매하기
                </Button>
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
      <style jsx>
        {`
          .detailContainer {
            min-width: 800px;
            margin: 150px 200px;
          }
        `}
      </style>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
