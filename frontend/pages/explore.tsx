/* eslint-disable */
import React, { useEffect, useState, FC } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { KallosItemCard } from "../components/KallosItemCard";
import { getAllItems } from "../store/modules/item";

import { RootState } from "../store/modules";
import { connect } from "react-redux";

//paramObj
// interface ParamObj {
//   searchOption: string;
//   searchKeyword: string;
//   page: number;
//   size: number;
// }

const mapStateToProps = (state) => {
  return {
    items: state.itemReducer.allItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAllItems: (paramObj) => dispatch(getAllItems(paramObj)),
  };
};

interface SaleKallosProps {
  account: string;
  items: Array<Object>;
  setAllItems: any;
}

const View: FC<SaleKallosProps> = ({ items, setAllItems }) => {
  const [onSaleItems, setOnSaleItems] = useState([]);
  const [showOnlySale, setShowOnlySale] = useState<boolean>(false);

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
    console.log("dk");
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
                <MenuItem value={10}>All</MenuItem>
                <MenuItem value={20}>Artist</MenuItem>
                <MenuItem value={30}>Item</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <input placeholder="keyword.." onKeyUp={handleKeyword} />
        </Box>

        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={showOnlySale}
                onChange={handleSwitchShowStatus}
                name="sale"
              />
            }
            label={showOnlySale ? "모든 작품 보기" : "판매중인 작품만 보기"}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 200px)",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 7,
          rowGap: 3,
          columnGap: 1,
        }}
      >
        {onSaleItems?.map((item) => (
          <KallosItemCard key={item.id} kallosData={item} />
        ))}
      </Box>
      {/* <button onClick={onClickButton}>jisu</button> */}
      <style jsx>
        {`
          .viewContainer {
            min-width: 800px;
            margin: 150px 200px;
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
            border: 1px solid black;
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

export default connect(mapStateToProps, mapDispatchToProps)(View);
