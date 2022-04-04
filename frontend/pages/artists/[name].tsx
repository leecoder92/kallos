/* eslint-disable */
import React, { useState, useEffect, FC } from "react";
import { Box, Button, Container, Stack, TextField, Typography, CssBaseline, Divider, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { KallosItemCard } from "../../components/KallosItemCard";
import { getAllItems } from "../../store/modules/item";
import { getArtistInfo, getAllItemsOfArtist } from "@/store/modules/artist";
import { RootState } from "../../store/modules";
import { connect } from "react-redux";
import Pagination from '../../components/pagination';

const mapStateToProps = (state: RootState) => {
  return {
    artistInfo: state.artistReducer.artistInfo,
    artistItems: state.artistReducer.artistItems,
    items: state.itemReducer.allItems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    // setArtistInfo: (artistName) => getArtistInfo(artistName),
    // setAllItemsOfArtist: (paramsObj) => getAllItemsOfArtist(paramsObj),
    setAllItems: (paramObj) => dispatch(getAllItems(paramObj)),
  };
};

interface SaleKallosProps {
  account: string;
  items: Array<Object>;
  setAllItems: any;
}

//paramObj
interface ParamObj {
  artistName: string;
  pageNumber: number;
  itemsPerOnePage: number;
}

const artistDetail: FC<SaleKallosProps> = ({ items, setAllItems }) => {
  const [onSaleItems, setOnSaleItems] = useState([]);

  const [option, setOption] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  //pagination
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalItems, setTotalItems] = useState(0);
  // const paginate = (pageNumber) => setCurPage(pageNumber);

  const params = {
    searchOption: "users",
    searchKeyword: keyword,
    page: curPage,
    size: itemsPerPage,
  };
  // console.log(items.length);
  // console.log(curPage);

  useEffect(() => {
    setAllItems(params);
  }, []);

  useEffect(() => {
    setOnSaleItems(items);
    setTotalItems(items.length);
  }, [items]);


  return (
    <div>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 18,
            pb: 6,
          }}
        >
          <Container>
            <Stack direction="row" sx={{ justifyContent: "center" }}>
              {/* 프로필 사진 */}
              <AccountCircleIcon sx={{ fontSize: 170 }} />
              <Box sx={{ m: 2.5 }}>
                <Typography variant="h5" sx={{ mb : 1}}>작가명</Typography>
                <Typography>
                  Something short and leading about the collection below—its
                  contents, the creator, etc.
                  <br />
                  Make it short and sweet, but not too short so folks don't
                  simply skip over it entirely.
                </Typography>
              </Box>
            </Stack>
            <Divider
              variant="middle"
              sx={{ my: 5 }}
            />
            <Typography variant="h4" align="center">
              판매 작품
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 270px)",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
                rowGap: 5,
                columnGap: 1,
              }}
            >
            {onSaleItems
              .slice(
                (curPage - 1) * itemsPerPage,
                (curPage - 1) * itemsPerPage + itemsPerPage
              )
              .map((item) => (
              <KallosItemCard key={item.id} kallosData={item} />
            ))}
            </Box>
          </Container>
          <Pagination 
            curPage={curPage}
            setCurPage={setCurPage} 
            totalItems={totalItems} 
            itemsPerPage={itemsPerPage}
          />
        </Box>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(artistDetail);
