/* eslint-disable */

// style
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
// 기능
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

// 검색바 스타일
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
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  border: "1px solid",
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: "100%",
}));

function Searchbar() {
  // 테스트용 데이터
  const artList = [
    { artist: "jisu", title: "love1" },
    { artist: "daye", title: "love2" },
    { artist: "nayeong", title: "love3" },
    { artist: "geuntae", title: "love4" },
    { artist: "jongjune", title: "love5" },
    { artist: "love", title: "love6" },
  ];
  // 검색결과창 보여주는 기능
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredArtistData, setFilteredArtistData] = useState([]);
  const [filteredTitleData, setFilteredTitleData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleSearchInput = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };
  // 검색 클릭했을 때 결과창 닫고 검색어 초기화
  const handleArtistClick = (event: any) => {
    event.preventDefault();
    setSearchValue("");
    setFilteredArtistData([]);
    setFilteredTitleData([]);
    setIsLoading(true);
  };
  // 검색 필터링
  useEffect(() => {
    const searchFilter = setTimeout(() => {
      // 아티스트 필터링
      const newArtistFilter = artList.filter((art) => {
        return art.artist.toLowerCase().includes(searchValue.toLowerCase());
      });
      // 작품명 필터링
      const newTitleFilter = artList.filter((art) => {
        return art.title.toLowerCase().includes(searchValue.toLowerCase());
      });
      if (searchValue.length < 3) {
        setFilteredArtistData([]);
        setFilteredTitleData([]);
        setIsLoading(true);
      } else if (searchValue.length >= 3) {
        setFilteredArtistData(newArtistFilter);
        setFilteredTitleData(newTitleFilter);
        setIsSearchResult(true);
        setIsLoading(false);
      }
    }, 1000);
    return () => clearTimeout(searchFilter);
  }, [searchValue]);

  // 검색영역 밖 클릭시 닫기
  const searchInputRef = useRef<any>(null);
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setIsSearchResult(false);
      } else {
        setIsSearchResult(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef]);

  return (
    <Search ref={searchInputRef}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search collections and accounts."
        inputProps={{ "aria-label": "search" }}
        fullWidth
        onChange={handleSearchInput}
        value={searchValue}
      />
      {searchValue &&
        (searchValue.length >= 3 && !isLoading ? (
          (filteredArtistData.length != 0 || filteredTitleData.length != 0) && (
            <StyledFilter
              style={{ visibility: isSearchResult ? "visible" : "hidden" }}
            >
              <div>Artist</div>
              <div>=============</div>
              {filteredArtistData.length != 0 ? (
                <ul>
                  {filteredArtistData.slice(0, 3).map((value, key) => {
                    return (
                      <li
                        key={key}
                        onClick={handleArtistClick}
                        style={{ cursor: "pointer" }}
                      >
                        <Link href="/artist">{value.artist}</Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div>No result</div>
              )}
              <div>Art</div>
              <div>=============</div>
              {filteredTitleData.length != 0 ? (
                <ul>
                  {filteredTitleData.slice(0, 3).map((value, key) => {
                    return <li key={key}>{value.title}</li>;
                  })}
                </ul>
              ) : (
                <div>No result</div>
              )}
            </StyledFilter>
          )
        ) : (
          <StyledFilter>Loading...</StyledFilter>
        ))}
    </Search>
  );
}

export default Searchbar;
