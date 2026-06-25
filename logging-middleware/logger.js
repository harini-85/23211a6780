// logger.js

import axios from "axios";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const BASE_URL = "http://4.224.186.213/evaluation-service/logs";


export async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Logger Error:", error.response?.data || error.message);
    return null;
  }
}