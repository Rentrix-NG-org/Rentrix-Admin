import { Box, Typography, useTheme } from "@mui/material";
import LogTable from "@src/shared/components/LogTable";
import { LogService } from "@src/shared/services/log.service";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

type ActivityType =
  | "login-event"
  | "update"
  | "download"
  | "payment-made"
  | "document-viewed";

interface LogType {
  createdAt: string;
  description: string;
  date: string;
  time: string;
  details: string;
  activityType: ActivityType;
}

const ActivityLogs = () => {
  const theme = useTheme();
  const { getLogs } = LogService();
  const params = useParams();
  const [logs, setLogs] = useState<LogType[]>([]);

  const activityTypes: Record<ActivityType, string> = {
    "login-event": "Login Event",
    update: "Update",
    download: "Download",
    "payment-made": "Payment Made",
    "document-viewed": "Document Viewed",
  };

  useEffect(() => {
    async function fetchLogs() {
      const response = await getLogs(params?.userId || "");

      if (response.success) {
        const formatted = (response.data as any[]).map((log) => {
          return {
            date: dayjs(Number(log.createdAt)).format("DD MMM YYYY"),
            time: dayjs(Number(log.createdAt)).format("HH:mm"),
            details: log.description,
            actitityType: activityTypes[log.activityType as ActivityType],
          };
        });
        console.log(formatted, "is formatted");
        setLogs(formatted as unknown as LogType[]);
      }
    }
    fetchLogs();
  }, [params]);

  const columns = [
    { header: "Date", label: "date" },
    { header: "Time", label: "time" },
    { header: "Activity Type", label: "activityType" },
    { header: "Details", label: "details" },
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

      {logs.length ? (
        <LogTable columns={columns} data={logs} />
      ) : (
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 14,
            color: theme.palette.grey[600],
          }}
        >
          No Activity Logs
        </Typography>
      )}
      <Box
        component="button"
        sx={{
          background: theme.palette.grey[500],
          border: "none",
          padding: "16px",
          color: "white",
          cursor: "pointer",
          display: logs.length ? "flex" : "none",
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
