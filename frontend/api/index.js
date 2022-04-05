import axios from "axios";

import { BACKEND_URL } from "../config/index";

const apiInstance = () => {
  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-type": "application/json",
    },
  });

  return instance;
};

export { apiInstance };
