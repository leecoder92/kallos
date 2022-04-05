/* eslint-disable */
import React, { useEffect, useState, FC } from "react";
import styles from "../styles/form.module.scss";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { KallosItemCard } from "../components/KallosItemCard";
import { getAllItems } from "../store/modules/item";

import { RootState } from "../store/modules";
import { connect } from "react-redux";

import Pagination from "../components/pagination";

const mapStateToProps = (state: RootState) => {
  return {
    items: state.itemReducer.allItems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAllItems: (params) => dispatch(getAllItems(params)),
  };
};

interface SaleKallosProps {
  account: string;
  items: Array<Object>;
  setAllItems: any;
}

const Explore: FC<SaleKallosProps> = ({ items, setAllItems }) => {
  const [onSaleItems, setOnSaleItems] = useState([]);
  const [showOnlySale, setShowOnlySale] = useState(false);

  const [option, setOption] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");

  //pagination
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  //   const paginate = (pageNumber) => setCurPage(pageNumber);

  //검색옵션 설정
  const handleOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as string);
  };

  //검색키워드 설정
  const handleKeyword = (event) => {
    event.preventDefault();
    setKeyword(event.target.value as string);
  };

  //판매 중인 작품만 볼지 여부 설정
  const handleSwitchShowStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOnlySale(!showOnlySale);
  };

  useEffect(() => {
    const params = {
      option,
      keyword,
      pageNo: curPage,
      itemPerPage: itemsPerPage,
      onSaleYN: showOnlySale ? 1 : 0,
    };
    setAllItems(params);
  }, [option, keyword, curPage, showOnlySale]);

  useEffect(() => {
    setOnSaleItems(items);
    setTotalItems(items.length);
    console.log(items);
  }, [items]);

  useEffect(() => {
    console.log(showOnlySale);
  }, [showOnlySale]);

  return (
    <div className="viewContainer">
      <h1>Explore Calligraphy</h1>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">분류</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                label="Option"
                onChange={handleOption}
              >
                <MenuItem value="all">모두</MenuItem>
                <MenuItem value="name">작가</MenuItem>
                <MenuItem value="title">작품</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <input placeholder="검색어.." onChange={handleKeyword} />
        </Box>

        <Box>
          {showOnlySale ? (
            <div className={styles.toggleBox}>
              <input
                id="caseOne"
                type="checkbox"
                className={styles.toggleContainer}
                onChange={handleSwitchShowStatus}
                checked
              />
              <label htmlFor="caseOne" className={styles.toggleBtn}></label>
              <span>모든 작품 보기</span>
            </div>
          ) : (
            <div className={styles.toggleBox}>
              <input
                id="caseTwo"
                type="checkbox"
                className={styles.toggleContainer}
                onChange={handleSwitchShowStatus}
              />
              <label htmlFor="caseTwo" className={styles.toggleBtn}></label>
              <span>판매중인 작품만 보기</span>
            </div>
          )}
        </Box>
      </Box>

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
        {onSaleItems?.map((item) => (
          <KallosItemCard key={item.item_id} kallosData={item} />
        ))}
      </Box>
      <Pagination
        curPage={curPage}
        setCurPage={setCurPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
      <style jsx>
        {`
          .viewContainer {
            padding: 150px 200px;
            min-width: 1300px;
          }
          h1 {
            text-align: center;
            margin-bottom: 70px;
            font-size: 50px;
          }
          input {
            width: 200px;
            font-size: 17px;
            margin-left: 10px;
            padding: 0 10px;
            height: 56px;
            border-radius: 4px;
            outline: none;
            border: 1px solid #2c3c51;
            opacity: 0.25;
          }
          input:focus {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
