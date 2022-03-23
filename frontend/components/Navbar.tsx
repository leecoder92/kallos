import React, { FC, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { login, logout } from "../store/modules/login";
import { RootState } from "../store/modules";
import { connect } from "react-redux";

// 로그인, 로그아웃 관련
export interface LoginProps {
  value: boolean;
  setLogin: any;
  setLogout: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    value: state.loginReducer.value,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLogin: () => dispatch(login()),
    setLogout: () => dispatch(logout()),
  };
};

// Navbar 관련
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

const SearchAppBar: FC<LoginProps> = ({ value, setLogin, setLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [account, setAccount] = useState("");
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const getAccount = async () => {
    const myAccount = await window.ethereum.request({ method: "eth_accounts" });
    if (myAccount && myAccount.length > 0) {
      setLogin();
      setIsLogin(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const metaLogin = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
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

  useEffect(() => {
    getAccount();
  }, [isLogin]);

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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search collections and accounts."
              inputProps={{ "aria-label": "search" }}
              fullWidth
            />
          </Search>
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
