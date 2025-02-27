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

const LoginLogout = () => {
  const { getAllLogs } = LogService();
  const theme = useTheme();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; adminId: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    async function fetchLogs() {
      const response = await getAllLogs("login=true");
      if (response.success) {
        if (response.data) {
          (response.data as Log[]).map((log) => {
            setLogIds((prev) => [
              ...prev,
              {
                logId: log.id,
                adminId: log.user.id,
                timestamp: dayjs(Number(log.createdAt)).format(
                  "YYYY-MM-DD HH:mm:ss",
                ),
              },
            ]);
          });
        }

        const formatted = (response.data as Log[]).map((log) => {
          return Object.values({
            userId: log.user.id,
            action: log.action,
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss",
            ),
            device: log.devices.join(", "),
            location: "N\\A",
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
      header: "DETAILS",
      label: "details",
      type: "text",
    },

    {
      header: "TIMESTAMP",
      label: "timestamp",
      type: "text",
    },
    {
      header: "DEVICE & IP ADDRESS",
      label: "device",
      type: "text",
    },
    {
      header: "LOCATION",
      label: "location",
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
        routes={["Logs", "User Authentication Logs", "Login/Logout Events"]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(v) => {
          const id = logIds.find(
            (id) => id.adminId === v[0] && id.timestamp === v[2],
          );

          if (id) {
            navigate(`${id.logId}`);
          }
        }}
        columns={columns}
        data={logs}
      />
    </Box>
  );
};
export default LoginLogout;
