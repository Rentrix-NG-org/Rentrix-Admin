import { Box, Typography, useTheme } from "@mui/material";
import LogTable from "@src/shared/components/LogTable";

const ActivityLogs = () => {
  const theme = useTheme();
  const columns = [
    { header: "Date", label: "date" },
    { header: "Time", label: "time" },
    { header: "Activity Type", label: "activityType" },
    { header: "Details", label: "details" },
  ];

  const data = [
    {
      date: "2023-12-01",
      time: "10:30",
      activityType: "Login",
      details: "User logged in successfully",
    },
    {
      date: "2023-12-01",
      time: "11:15",
      activityType: "Update",
      details: "Profile information updated",
    },
    {
      date: "2023-12-01",
      time: "14:45",
      activityType: "Download",
      details: "Downloaded report file",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "14px",
          color: theme.palette.common.black,
          mb: "16px",
        }}
      >
        Activity Logs
      </Typography>

      <LogTable columns={columns} data={data} />
      <Box
        component="button"
        sx={{
          background: theme.palette.grey[500],
          border: "none",
          padding: "16px",
          color: "white",
          cursor: "pointer",
          display: "flex",
          mt: "10px",
          width: "178px",
          borderRadius: "100px",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          // gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        >
          View all
        </Typography>
      </Box>
    </Box>
  );
};

export default ActivityLogs;
