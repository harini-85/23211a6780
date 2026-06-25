import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

export function NotificationCard({
  notification,
  onClick,
  isRead,
}) {
  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        cursor: "pointer",
        opacity: isRead ? 0.6 : 1,
        transition: "0.2s",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Chip
            label={notification.Type}
            color={
              notification.Type === "Placement"
                ? "success"
                : notification.Type === "Result"
                ? "primary"
                : "warning"
            }
            size="small"
          />

          <Typography variant="caption">
            {notification.Timestamp}
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          fontWeight={isRead ? 400 : 700}
        >
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}