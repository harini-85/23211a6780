import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";
import { Log } from "../utils/logger";

export function useNotifications(
  page = 1,
  limit = 10,
  notificationType = ""
) {
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);

        const data = await fetchNotifications(
          page,
          limit,
          notificationType
        );

        setNotifications(data.notifications || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);

        await Log(
          "frontend",
          "info",
          "hook",
          "Notifications loaded"
        );
      } catch (err) {
        setError(err.message);

        await Log(
          "frontend",
          "error",
          "hook",
          "Failed to load notifications"
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [page, limit, notificationType]);

  return {
    notifications,
    total,
    totalPages,
    loading,
    error,
  };
}