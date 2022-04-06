import { NextPage } from "next";
import { Typography } from "@mui/material";

const Footer: NextPage = () => {
  return (
    <footer
      style={{
        backgroundColor: "#F9E6E1",
        textAlign: "center",
        marginTop: "auto",
        height: "auto",
        width: "100%",
        padding: "8px 8px 8px 8px",
      }}
    >
      <Typography>Copyright ⓒ2022 Bbolrak. All rights reserved.</Typography>

      <Typography>Contact: bbolrak@ssafy.com</Typography>
    </footer>
  );
};

export default Footer;
