/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Link from "next/link";
// redux
import { login, logout } from "../store/modules/login";
import { RootState } from "../store/modules";
import { connect } from "react-redux";
import { getArtistsByKeyword, getItemsByKeyword } from "@/store/modules/navbar";
// searchbar
import Searchbar from "./Searchbar";

// 로그인, 로그아웃 관련
export interface LoginProps {
  value: boolean;
  setLogin: any;
  setLogout: any;
}

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [isLogin, setIsLogin] = useState<boolean>(value);
  const getIsLogin = async () => {
    if (value) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const getAccount = async () => {
    const myAccount = await window.ethereum.request({ method: "eth_accounts" });
    if (myAccount && myAccount.length > 0) {
      setLogin();
      setIsLogin(true);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    getIsLogin();
  }, [isLogin]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const metaLogin = async () => {
    try {
      if (window.ethereum) {
        setLogin();
        setIsLogin(true);
      } else {
        alert("Metamask를 설치하세요~");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const metaLogout = async () => {
    setLogout();
    setIsLogin(false);
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" enableColorOnDark>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" passHref>
              <Button sx={{ color: "black" }}>
                {/* 로고로 대체할 예정 */}
                <Typography variant="h6" noWrap>
                  KALLOS
                </Typography>
              </Button>
            </Link>
          </Box>
          <Searchbar />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/view" passHref>
              <Button sx={{ color: "black" }}>EXPLORE</Button>
            </Link>
            <Link href="/create" passHref>
              <Button sx={{ color: "black" }}>CREATE</Button>
            </Link>

            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {isLogin ? (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link href="/mypage" passHref>
                    <MenuItem onClick={handleClose}>Mypage</MenuItem>
                  </Link>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      metaLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={(event) => {
                      event.preventDefault();
                      handleClose();
                      metaLogin();
                    }}
                  >
                    Login
                  </MenuItem>
                </Menu>
              )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppBar);
