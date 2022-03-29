/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import wrapper from "../store/configureStore";
import Layout from "../components/Layout";
import { useSelector, Provider } from "react-redux";
import { RootState } from "../store/modules";
import { MoralisProvider } from "react-moralis";

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
    } else {
      setAccount("");
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
      <Head>
        <title>KALLOS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} account={account} />
      </Layout>
    </ThemeProvider>
  );
};

// export default MyApp;
export default wrapper.withRedux(MyApp);
