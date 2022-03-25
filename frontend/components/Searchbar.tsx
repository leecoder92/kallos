// style
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
// 기능
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid",
  borderColor: "black",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "60%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const StyledFilter = styled("div")(({ theme }) => ({
  color: "inherit",
  position: "absolute",
  zIndex: "1",
  backgroundColor: "white",
  border: "1px solid",
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: "100%",
}));

const Searchbar = () => {
  // 테스트용 데이터
  const artList = [
    { artist: "jisu", title: "love1" },
    { artist: "daye", title: "love2" },
    { artist: "nayeong", title: "love3" },
    { artist: "geuntae", title: "love4" },
    { artist: "jongjune", title: "love5" },
    { artist: "love", title: "love6" },
  ];
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredArtistData, setFilteredArtistData] = useState([]);
  const [filteredTitleData, setFilteredTitleData] = useState([]);
  const handleSearchInput = (event) => {
    event.preventDefault();
    const eValue = event.target.value;
    setSearchValue(eValue);
    // 아티스트 필터링
    const newArtistFilter = artList.filter((art) => {
      return art.artist.toLowerCase().includes(eValue.toLowerCase());
    });
    // 작품명 필터링
    const newTitleFilter = artList.filter((art) => {
      return art.title.toLowerCase().includes(eValue.toLowerCase());
    });
    if (eValue === "") {
      setFilteredArtistData([]);
      setFilteredTitleData([]);
    } else if (eValue.length >= 3) {
      setFilteredArtistData(newArtistFilter);
      setFilteredTitleData(newTitleFilter);
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search collections and accounts."
        inputProps={{ "aria-label": "search" }}
        fullWidth
        onChange={handleSearchInput}
      />
      {searchValue &&
        (searchValue.length >= 3
          ? (filteredArtistData.length != 0 ||
              filteredTitleData.length != 0) && (
              <StyledFilter>
                <div>Artist</div>
                <div>=============</div>
                {filteredArtistData.length != 0 ? (
                  <div>
                    {filteredArtistData.slice(0, 3).map((value, key) => {
                      return <p key={key}>{value.artist}</p>;
                    })}
                  </div>
                ) : (
                  <div>No result</div>
                )}
                <div>Art</div>
                <div>=============</div>
                {filteredTitleData.length != 0 ? (
                  <div>
                    {filteredTitleData.slice(0, 3).map((value, key) => {
                      return <p key={key}>{value.title}</p>;
                    })}
                  </div>
                ) : (
                  <div>No result</div>
                )}
              </StyledFilter>
            )
          : null)}
    </Search>
  );
};

export default Searchbar;
