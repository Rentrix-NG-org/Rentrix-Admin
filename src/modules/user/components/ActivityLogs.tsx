import { Box, Typography, useTheme } from "@mui/material";
import LogTable from "@src/shared/components/LogTable";
import { ActivityType, LogType } from "@src/shared/types/shared.types";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const ActivityLogs: React.FC<{ logs: LogType[] }> = ({ logs }) => {
  const types: Record<ActivityType, string> = {
    "login-event": "Login Event",
    update: "Update",
    download: "Download",
    "payment-made": "Payment Made",
    "document-viewed": "Document Viewed",
  };

  const activityTypes = useMemo(() => types, []);
  const theme = useTheme();
  const params = useParams();
  const navigate = useNavigate();
  const [allLogs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const formatted = (logs as any[]).slice(0, 8).map((log) => {
        return {
          date: dayjs(Number(log.createdAt)).format("DD MMM YYYY"),
          time: dayjs(Number(log.createdAt)).format("HH:mm"),
          actitityType: activityTypes[log.activityType as ActivityType],
          details: log.description,
        };
      });
      setLogs(formatted as unknown as LogType[]);
    }
    fetchLogs();
  }, [params, logs, activityTypes]);

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

      {allLogs.length ? (
        <LogTable columns={columns} data={allLogs} />
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
        onClick={() => navigate("logs")}
        sx={{
          background: theme.palette.secondary.main,
          border: "none",
          padding: "16px",
          color: "white",
          cursor: "pointer",
          display: allLogs.length ? "flex" : "none",
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
