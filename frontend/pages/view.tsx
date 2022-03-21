import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import ItemCard from "@/components/ItemCard";

const label = { inputProps: { "aria-label": "Switch demo" } };

const View = () => {
  const [option, setOption] = React.useState<string>("");
  const [keyword, setKeyword] = React.useState<string>("");
  const [showOnlySale, setShowOnlySale] = React.useState<boolean>(false);

  const handleOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value as string);
  };

  const handleKeyword = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      setKeyword(event.target.value as string);
      //   event.target.value = "";
    }
  };

  const handleSwitchShowStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOnlySale(!showOnlySale);
  };

  //임시 데이터
  const items = [
    {
      image: "/images/5.png",
      artist: "sue",
      name: "hi",
      price: 100,
      itemCode: 5,
    },
    {
      image: "/images/4.png",
      artist: "march",
      name: "welcome",
      price: 200,
      itemCode: 4,
    },
    {
      image: "/images/3.png",
      artist: "april",
      name: "hello",
      price: 200,
      itemCode: 3,
    },
    {
      image: "/images/2.png",
      artist: "july",
      name: "seeya",
      price: 200,
      itemCode: 2,
    },
    {
      image: "/images/1.png",
      artist: "june",
      name: "hoho",
      price: 200,
      itemCode: 1,
    },
  ];

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
        {items?.map((item) => (
          <ItemCard item={item} />
        ))}
      </Box>
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

export default View;
