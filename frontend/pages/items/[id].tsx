import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, FC } from "react";

import {
  Button,
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  styled,
} from "@mui/material";

import {
  mintKallosTokenContract,
  saleKallosTokenContract,
  web3,
} from "../../web3Config";
import { IMyKallosData } from "../../interfaces";
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
    setItemDetail: (tokenId) => getItemDetail(tokenId),
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

const ColorButton = styled(Button)({
  backgroundColor: "#F9E6E1",
  color: "black",
  "&:hover": {
    backgroundColor: "#F9E6E1",
    color: "black",
  },
});

interface SaleKallosCardProps extends IMyKallosData {
  account: string;
  getOnSaleTokens: () => Promise<void>;
  itemDetail: any;
  setItemDetail: any;
}

const ItemDetail: FC<SaleKallosCardProps> = ({
  account,
  itemDetail,
  setItemDetail,
  getOnSaleTokens,
}) => {
  const router = useRouter();
  const [isBuyable, setIsBuyable] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemInfo, setItemInfo] = useState(itemDetail);
  const [tokenId, setTokenId] = useState("");

  const onShowModal = () => setShowModal(!showModal);

  const getKallosTokenOwner = async () => {
    try {
      const response = await mintKallosTokenContract.methods
        .ownerOf(tokenId)
        .call();

      setIsBuyable(
        response.toLocaleLowerCase() === account.toLocaleLowerCase()
      );
    } catch (error) {
      console.error(error);
    }
  };

  //구매 로직
  const onClickBuy = async () => {
    setShowModal(!showModal);
    try {
      if (!account) return;

      const response = await saleKallosTokenContract.methods
        .purchaseKallosToken(tokenId)
        .send({ from: account, value: itemDetail.price });

      if (response.status) {
        getOnSaleTokens();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getItemInfo = () => {
    setItemDetail(tokenId);
  };

  useEffect(() => {
    console.log(router.query.id);
    setTokenId(router.query.id);
    getItemInfo();
  }, [router.isReady]);

  return (
    <Box sx={{ padding: "150px 200px", paddingTop: "0", height: "100%" }}>
      <Typography sx={{ marginTop: "200px", fontSize: "45px" }}>
        작품 제목
      </Typography>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            alignItems: "center",
            height: "100%",
            marginTop: "50px",
          }}
        >
          <Box
            sx={{
              borderRadius: "10px",
              overflow: "hidden",
              width: "400px",
              height: "400px",
            }}
          >
            <Image
              src="/images/5.png"
              width="100%"
              height="100%"
              alt="token image"
              layout="responsive"
            />
          </Box>
          <Box
            sx={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "400px",
              padding: "30px",
              border: "1px solid #cfd4d1",
              borderRadius: "10px",
              width: "inherit",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gridTemplateRows: "repeat(4, 1fr)",
                height: "inherit",
                columnGap: 1
              }}
            >
              <Typography sx={{ fontSize: "20px" }}>제목</Typography>
              <Typography sx={{ fontSize: "20px" }}>abc</Typography>
              <Typography sx={{ fontSize: "20px" }}>작가</Typography>
              <Typography sx={{ fontSize: "20px" }}>abc</Typography>
              <Typography sx={{ fontSize: "20px" }}>작품 소개</Typography>
              <Typography sx={{ fontSize: "20px" }}>abc</Typography>
              <Typography sx={{ fontSize: "20px" }}>가격</Typography>
              <Typography sx={{ fontSize: "20px" }}>abc</Typography>
            </Box>
            <ColorButton variant="contained" size="large" onClick={onShowModal}>
              구매하기
            </ColorButton>
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
                  <ColorButton
                    variant="contained"
                    sx={{ marginTop: "20px" }}
                    onClick={onClickBuy}
                  >
                    구매하기
                  </ColorButton>
                </Box>
              </Fade>
            </Modal>
          </Box>
        </Box>
        <style jsx>
          {`
            .detailContainer {
              padding: 150px 200px;
              padding-top: 0;
              height: 100%;
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
