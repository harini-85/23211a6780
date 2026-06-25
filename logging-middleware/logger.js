// logger.js

import axios from "axios";

// Read the token from your Vite .env file
const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

// Base URL
const BASE_URL = "http://4.224.186.213/evaluation-service/logs";

/**
 * Sends logs to the AffordMed Logging API
 *
 * @param {string} stack - frontend | backend
 * @param {string} level - debug | info | warn | error | fatal
 * @param {string} packageName - component | api | page | hook | state | auth | config | middleware | utils
 * @param {string} message - Log message
 */
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