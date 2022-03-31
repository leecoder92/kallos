/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import wrapper from "../store/configureStore";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../store/modules";
import { createTheme } from "@mui/material/styles";

// import { createStore } from "redux";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistedReducer } from "store/modules";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [account, setAccount] = useState<string>("");
  const isLogin = useSelector((state: RootState) => state.loginReducer.value);

  //   const store = createStore(persistedReducer);
  //   const persistor = persistStore(store);

  const theme = createTheme({
    typography: {
      fontFamily: "Nanum Bold",
      // fontFamily: ["Gowun Batang"].join(","),
      // button: {
      //   fontWeight: "bold",
      // },
    },
  });

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
    // <PersistGate persistor={persistor} loading={<div>loading...</div>}>
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
    // </PersistGate>
  );
};

// export default MyApp;
export default wrapper.withRedux(MyApp);
