import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, FC } from "react";
import Link from "next/link";

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
  saleKallosTokenContract,
} from "../../web3Config";
import { IMyKallosData } from "../../interfaces";
import { getItemDetail, changeOwnerAfterBuy } from "../../store/modules/item";
import { RootState } from "../../store/modules";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    itemDetail: state.itemReducer.itemDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setItemDetail: (obj) => dispatch(getItemDetail(obj)),
    setNewOwner: (obj) => dispatch(changeOwnerAfterBuy(obj)),
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
  itemDetail: any;
  setItemDetail: any;
  setNewOwner: any;
  getOnSaleTokens: () => Promise<void>;
}

const ItemDetail: FC<SaleKallosCardProps> = ({
  account,
  itemDetail,
  setItemDetail,
  setNewOwner,
  getOnSaleTokens,
}) => {
  const router = useRouter();

  const [isNotBuyable, setIsNotBuyable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemInfo, setItemInfo] = useState({
    tokenId: "",
    title: "",
    authorName: "",
    itemImg: "",
    description: "",
    price: "",
    authorAddress: "",
  });

  const onShowModal = () => setShowModal(!showModal);
  const onShowAlert = () => alert("이미 구매하신 작품입니다");

  //구매 로직
  const onClickBuy = async () => {
    setShowModal(false);
    try {
      if (!account) return;

      const response = await saleKallosTokenContract.methods
        .purchaseKallosToken(itemInfo.tokenId)
        .send({
          from: account,
          value: (itemDetail.price * 1000000000000000000).toString(),
        });

      if (response.status) {
        // getOnSaleTokens();
        setNewOwner({ address: account, tokenId: itemInfo.tokenId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setItemDetail(router.query.id);
  }, [router.isReady]);

  useEffect(() => {
    setItemInfo(itemDetail);
  }, [itemDetail]);

  return (
    <Box sx={{ padding: "150px 200px", paddingTop: "0", height: "100%" }}>
      <Typography sx={{ marginTop: "200px", fontSize: "45px" }}>
        {itemInfo ? itemInfo.title : null}
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
              boxShadow: "0 0 5px #cfd4d1",
            }}
          >
            {itemInfo ? (
              <Image
                src={`https://kallosimages.s3.ap-northeast-2.amazonaws.com/calligraphyImages/${itemInfo.itemImg}`}
                width="100%"
                height="100%"
                alt="token image"
                layout="responsive"
              />
            ) : null}
          </Box>
          <Box
            sx={{
              marginLeft: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "400px",
              padding: "30px",
              boxShadow: "0 0 5px #cfd4d1",
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
                columnGap: 1,
              }}
            >
              <Typography sx={{ fontSize: "20px" }}>제목</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {itemInfo ? itemInfo.title : null}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>작가</Typography>
              {itemInfo ? (
                <Link href={`/artist/${itemInfo.authorAddress}`}>
                  <a>
                    <Typography sx={{ fontSize: "20px" }}>
                      {itemInfo.authorName}
                    </Typography>
                  </a>
                </Link>
              ) : null}
              <Typography sx={{ fontSize: "20px" }}>작품 소개</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {itemInfo ? itemInfo.description : null}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>가격</Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {itemInfo ? itemInfo.price : null} MATIC
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {itemInfo ? itemInfo.tokenId : null} MATIC
              </Typography>
            </Box>
            {isNotBuyable ? (
              <ColorButton
                variant="contained"
                size="large"
                onClick={onShowAlert}
              >
                구매완료
              </ColorButton>
            ) : (
              <ColorButton
                variant="contained"
                size="large"
                onClick={onShowModal}
              >
                구매하기
              </ColorButton>
            )}
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
