import axios from "axios";
import { Log } from "../utils/logger";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export async function fetchNotifications(
  page = 1,
  limit = 10,
  notificationType = ""
) {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        params: {
          page,
          limit,
          notification_type: notificationType || undefined,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    await Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched successfully"
    );

    return response.data;
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      "Failed to fetch notifications"
    );

    throw error;
  }
}