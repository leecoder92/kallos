import { useEffect, useState, FC } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Divider,
  Chip,
  Tooltip,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

const Community: FC = () => {
  return (
    <div className="viewContainer">
      <Typography variant="h1" align="center">
        캘리그라피 커뮤니티
      </Typography>
      <style jsx>
        {`
          .viewContainer {
            padding: 150px 200px;
          }
        `}
      </style>
    </div>
  );
};

export default Community;
