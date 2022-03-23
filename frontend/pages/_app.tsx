import "../styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import wrapper from "../store/configureStore";
import Layout from "../components/Layout";
import { useSelector, Provider } from "react-redux";
import { RootState } from "../store/modules";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [account, setAccount] = useState<string>("");
  const isLogin = useSelector((state: RootState) => state.loginReducer.value);

  const getAccount = async () => {
    if (isLogin) {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          setAccount(accounts[0]);
        } else {
          alert("Install Metamask!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getAccount();
  }, [isLogin]);

  useEffect(() => {
    console.log(account);
  }, [account]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} account={account} />
      </Layout>
    </ThemeProvider>
  );
};

// export default MyApp;
export default wrapper.withRedux(MyApp);
