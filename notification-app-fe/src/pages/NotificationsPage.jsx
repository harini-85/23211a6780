import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";
import { Log } from "../utils/logger";

// Priority Order
const priority = {
  Placement: 1,
  Result: 2,
  Event: 3,
};

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [readNotifications, setReadNotifications] = useState([]);

  const {
    notifications,
    totalPages,
    loading,
    error,
  } = useNotifications(
    page,
    10,
    filter === "All" ? "" : filter
  );

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (priority[a.Type] !== priority[b.Type]) {
      return priority[a.Type] - priority[b.Type];
    }

    return (
      new Date(b.Timestamp).getTime() -
      new Date(a.Timestamp).getTime()
    );
  });

  const unreadCount = sortedNotifications.filter(
    (notification) => !readNotifications.includes(notification.ID)
  ).length;

  const handleFilterChange = async (newFilter) => {
    if (!newFilter) return;

    setFilter(newFilter);
    setPage(1);

    await Log(
      "frontend",
      "info",
      "component",
      `Filter changed to ${newFilter}`
    );
  };

  const handlePageChange = async (_, newPage) => {
    setPage(newPage);

    await Log(
      "frontend",
      "info",
      "component",
      `Moved to page ${newPage}`
    );
  };

  const handleNotificationClick = async (id) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications((prev) => [...prev, id]);

      await Log(
        "frontend",
        "info",
        "component",
        `Notification marked as read`
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 720,
        mx: "auto",
        px: 2,
        py: 4,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", mb: 3 }}
      >
        <Badge
          badgeContent={unreadCount}
          color="primary"
          max={99}
        >
          <NotificationsIcon fontSize="large" />
        </Badge>

        <Typography variant="h4" fontWeight="bold">
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ mb: 3 }}>
        <NotificationFilter
          value={filter}
          onChange={handleFilterChange}
        />
      </Box>

      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", py: 5 }}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">
          Failed to load notifications: {error}
        </Alert>
      )}

      {!loading &&
        !error &&
        sortedNotifications.length === 0 && (
          <Alert severity="info">
            No notifications available.
          </Alert>
        )}

=      {!loading &&
        !error &&
        sortedNotifications.length > 0 && (
          <Stack spacing={2}>
            {sortedNotifications.map((notification) => (
              <NotificationCard
                key={notification.ID}
                notification={notification}
                isRead={readNotifications.includes(notification.ID)}
                onClick={() =>
                  handleNotificationClick(notification.ID)
                }
              />
            ))}
          </Stack>
        )}

      {!loading && totalPages > 1 && (
        <Box
          sx={{ display: "flex", justifyContent: "center", mt: 4 }}
        >
          <Pagination
            page={page}
            count={totalPages}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
