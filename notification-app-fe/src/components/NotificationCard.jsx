import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

export function NotificationCard({ notification }) {
  return (
    <Card variant="outlined">
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

        <Typography variant="body1">
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}