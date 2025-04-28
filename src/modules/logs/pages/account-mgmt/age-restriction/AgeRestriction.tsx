import { Box, useTheme } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import { LogService } from "@src/modules/logs/services/log.service";
import { Log } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AgeRestriction = () => {
  const theme = useTheme();
  const { getAllLogs } = LogService();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; userId: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    async function fetchLogs() {
      const response = await getAllLogs("age-restriction=true");
      if (response.success) {
        if (response.data) {
          (response.data as Log[]).map((log) => {
            setLogIds((prev) => [
              ...prev,
              {
                logId: log.id,
                userId: log.user.id,
                timestamp: dayjs(Number(log.createdAt)).format(
                  "YYYY-MM-DD HH:mm:ss",
                ),
              },
            ]);
          });
        }

        const now = dayjs();
        const formatted = (response.data as Log[]).map((log) => {
          return Object.values({
            userId: log.user.id,
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss",
            ),
            countdown:
              dayjs.unix(log.targetDate).diff(now, "days").toString() +
              " days left",
            status: log.status,
          });
        });
        setLogs(formatted);
      }
    }
    fetchLogs();
  }, []);

  const columns: Column[] = [
    {
      header: "USER ID",
      label: "userId",
      type: "text",
    },
    {
      header: "TIMESTAMP",
      label: "timestamp",
      type: "text",
    },
    {
      header: "Countdown",
      label: "countdown",
      type: "text",
    },
    {
      header: "STATUS",
      label: "status",
      type: "custom-text",
      colors: {
        verified: theme.palette.success.main,
        pending: theme.palette.warning.main,
        unverified: theme.palette.error.main,
      },
      sx: {
        padding: "6px 16px",
      },
    },
    {
      header: "ACTIONS",
      label: "actions",
      type: "action",
      component: [
        {
          component: <Box component="img" src={icons.eye} sx={{ width: 18 }} />,
          onClick: () => {},
        },
        {
          component: (
            <Box component="img" src={icons.edit} sx={{ width: 18 }} />
          ),
          onClick: () => {},
        },
        {
          component: <Box component="img" src={icons.bin} sx={{ width: 18 }} />,
          onClick: () => {},
        },
      ],
    },
  ];
  return (
    <Box
      sx={{
        margin: "19px",
        display: "flex",
        flexDirection: "column",
        gap: "31px",
      }}
    >
      <LogHeader />
      <UserNav
        showBack={false}
        routes={["Logs", "User Account Management", "Age Restriction Alert"]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(v) => {
          const id = logIds.find(
            (id) => id.userId === v[0] && id.timestamp === v[1],
          );

          if (id) {
            // navigate(`${id.logId}`);
          }
        }}
        columns={columns}
        data={logs}
      />
    </Box>
  );
};
export default AgeRestriction;
