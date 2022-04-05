/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  styled,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
// redux
import { login, logout } from "../store/modules/login";
import { RootState } from "../store/modules";
import { connect } from "react-redux";
import { getArtistsByKeyword, getItemsByKeyword } from "@/store/modules/navbar";
// searchbar
import Searchbar from "./Searchbar";
import { isUserEthereumAddressInBloom } from "web3-utils";
//axios
import axios from "axios";

// 로그인, 로그아웃 관련
export interface LoginProps {
  value: boolean;
  setLogin: any;
  setLogout: any;
}

const ColorAppbar = styled(AppBar)({
  backgroundColor: "#2C3C51",
  color: "in",
});

const mapStateToProps = (state: RootState) => {
  return {
    value: state.loginReducer.value,
    artists: state.navBarReducer.artists,
    items: state.navBarReducer.items,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLogin: () => dispatch(login()),
    setLogout: () => dispatch(logout()),
    // setArtists: (keyword) => dispatch(getArtistsByKeyword(keyword)),
    // setItems: (keyword) => dispatch(getItemsByKeyword(keyword)),
  };
};

// Navbar
const SearchAppBar: FC<LoginProps> = ({ value, setLogin, setLogout }) => {
  // 반응형 작업
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // 로그인 관련
  const router = useRouter();
  const [account, setAccount] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(value);
  const getIsLogin = async () => {
    if (value) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const getAccount = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const myAccount = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (myAccount && myAccount.length > 0) {
          setLogin();
          setIsLogin(true);
          setAccount(myAccount[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    console.log(account);
  }, [account]);

  useEffect(() => {
    getIsLogin();
  }, [isLogin]);
  // 첫 방문시 정보입력 모달창
  const [firstVisit, setFirstVisit] = useState<boolean>(false);
  const [artistName, setArtistName] = useState<string>("");
  const handleChangeArtistName = (event: any) => {
    event.preventDefault();
    setArtistNameError(false);
    setArtistName(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const metaLogin = async () => {
    try {
      if (typeof window.ethereum !== "undefined" && !isLogin) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        axios({
          method: "get",
          url: `https://j6c107.p.ssafy.io:8443/api/user/login/${accounts[0]}`,
        })
          .then((res) => {
            if (res.data.message === "FirstVisit") {
              setOpen(true);
            } else {
              console.log(res.data);
              setLogin();
              setIsLogin(true);
              alert(`반갑습니다. ${res.data.name}님!`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Metamask를 설치하세요~");
      }
    } catch (error) {
      console.error(error);
      alert("로그인을 다시 시도해주세요.");
    }
  };

  // 에러처리
  const [artistNameError, setArtistNameError] = useState(false);
  // 등록하기
  const onRegister = () => {
    if (artistName.length < 3) {
      alert("작가명을 세 글자 이상 입력해주세요.");
    } else {
      axios({
        method: "post",
        url: `https://j6c107.p.ssafy.io:8443/api/user/register`,
        data: {
          address: account,
          name: artistName,
        },
      })
        .then((res) => {
          console.log(res.data);
          handleClose();
          alert("등록되었습니다.");
        })
        .catch((err) => {
          console.error(err);
          setArtistNameError(true);
          alert(err.response.data.message);
        });
    }
  };

  // 로그아웃
  const metaLogout = async () => {
    setLogout();
    setIsLogin(false);
    setAccount("");
    alert("로그아웃되었습니다. 메인페이지로 이동합니다.");
    router.push("/");
  };

  return (
    <Box>
      <ColorAppbar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#2C3C51",
          }}
        >
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link href="/" passHref>
              <Button sx={{ color: "white" }}>
                <Typography variant="h6" noWrap>
                  KALLOS
                </Typography>
              </Button>
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link href="/explore" passHref>
                <MenuItem onClick={handleCloseNavMenu}>갤러리</MenuItem>
              </Link>
              {isLogin ? (
                <div>
                  <Link href="/create" passHref>
                    <MenuItem onClick={handleCloseNavMenu}>작품등록</MenuItem>
                  </Link>
                  <Link href="/mypage" passHref>
                    <MenuItem onClick={handleCloseNavMenu}>마이페이지</MenuItem>
                  </Link>
                  <MenuItem
                    onClick={() => {
                      metaLogout();
                      handleCloseNavMenu();
                    }}
                  >
                    로그아웃
                  </MenuItem>
                </div>
              ) : (
                <MenuItem
                  onClick={() => {
                    metaLogin();
                    handleCloseNavMenu();
                  }}
                >
                  로그인
                </MenuItem>
              )}
            </Menu>
            <Link href="/" passHref>
              <Button sx={{ color: "white" }}>
                <Typography variant="h6" noWrap>
                  KALLOS
                </Typography>
              </Button>
            </Link>
          </Box>
          <Searchbar />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link href="/explore" passHref>
              <Button
                sx={{ color: "white", fontSize: "17px", fontWeight: "bold" }}
              >
                갤러리
              </Button>
            </Link>

            {isLogin ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link href="/create" passHref>
                  <Button
                    sx={{
                      color: "white",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    작품등록
                  </Button>
                </Link>
                <Link href="/mypage" passHref>
                  <Button
                    sx={{
                      color: "white",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    마이페이지
                  </Button>
                </Link>
                <Button
                  sx={{ color: "white", fontSize: "17px", fontWeight: "bold" }}
                  onClick={metaLogout}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button
                sx={{ color: "white", fontSize: "17px", fontWeight: "bold" }}
                onClick={metaLogin}
              >
                로그인
              </Button>
            )}
          </Box>
        </Toolbar>
      </ColorAppbar>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>회원정보 등록</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "black" }}>
              저희 서비스의 작가가 되시려면, 첫 방문시 등록을 하셔야 합니다.
              <br />
              작가명을 입력해 주십시오. 추후에 마이페이지에서 정보를 수정하실 수
              있습니다.
            </DialogContentText>
            <TextField
              error={artistNameError}
              autoFocus
              margin="dense"
              id="name"
              label="작가명을 입력해주세요."
              type="text"
              fullWidth
              variant="standard"
              value={artistName}
              onChange={handleChangeArtistName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={onRegister}>등록</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppBar);
