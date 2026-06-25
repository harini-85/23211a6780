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

const priority = {
  Placement: 1,
  Result: 2,
  Event: 3,
};

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

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

  const unreadCount = sortedNotifications.length;

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

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
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
        alignItems="center"
        mb={3}
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

      <Box mb={3}>
        <NotificationFilter
          value={filter}
          onChange={handleFilterChange}
        />
      </Box>

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          py={5}
        >
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">
          Failed to load notifications:
          {" "}
          {error}
        </Alert>
      )}

      {!loading &&
        !error &&
        sortedNotifications.length === 0 && (
          <Alert severity="info">
            No notifications available.
          </Alert>
        )}

      {!loading &&
        !error &&
        sortedNotifications.length > 0 && (
          <Stack spacing={2}>
            {sortedNotifications.map((notification) => (
              <NotificationCard
                key={notification.ID}
                notification={notification}
              />
            ))}
          </Stack>
        )}

      {!loading && totalPages > 1 && (
        <Box
          display="flex"
          justifyContent="center"
          mt={4}
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
