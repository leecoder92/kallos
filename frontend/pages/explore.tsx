/* eslint-disable */
import React, { useEffect, useState, FC } from "react";
import styles from "../styles/form.module.scss";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputBase from "@mui/material/InputBase";
import { makeStyles, styled } from "@mui/styles";

import { KallosItemCard } from "../components/KallosItemCard";
import { getAllItems } from "../store/modules/item";

import { RootState } from "../store/modules";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => {
  return {
    items: state.itemReducer.allItems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAllItems: (paramObj) => dispatch(getAllItems(paramObj)),
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

  const [option, setOption] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  //pagination
  const [curPage, setCurPage] = useState(0);
  const [postsPerPage, setPostPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const paginate = (pageNumber) => setCurPage(pageNumber);
  const onChangePostsPerPage = (event) => setPostPerPage(event.target.value);

  //검색옵션 설정
  const handleOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as string);
  };

  //검색키워드 설정
  const handleKeyword = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      setKeyword(event.target.value as string);
      //   event.target.value = "";
    }
  };

  //판매 중인 작품만 볼지 여부 설정
  const handleSwitchShowStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOnlySale(!showOnlySale);
  };

  const params = {
    searchOption: "users",
    searchKeyword: keyword,
    page: curPage,
    size: postsPerPage,
  };

  useEffect(() => {
    setAllItems(params);
  }, []);

  useEffect(() => {
    setOnSaleItems(items);
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
              <InputLabel id="demo-simple-select-label">Option</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                label="Option"
                onChange={handleOption}
              >
                <MenuItem value={10}>모두</MenuItem>
                <MenuItem value={20}>작가</MenuItem>
                <MenuItem value={30}>작품</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <input placeholder="검색어.." onKeyUp={handleKeyword} />
        </Box>

        <Box>
          {showOnlySale ? (
            <div className={styles.toggleBox}>
              <input
                id="caseOne"
                type="checkbox"
                // value={showOnlySale}
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
                // value={showOnlySale}
                className={styles.toggleContainer}
                onChange={handleSwitchShowStatus}
                // checked
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
          <KallosItemCard key={item.id} kallosData={item} />
        ))}
      </Box>
      <style jsx>
        {`
          .viewContainer {
            padding: 150px 200px;
            
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
