import { Box, useTheme } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import { LogService } from "@src/modules/logs/services/log.service";
import { Log } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import moment from "moment";
import { useEffect, useState } from "react";

const PasswordRequests = () => {
  const theme = useTheme();
  const [logs, setLogs] = useState<string[][]>([]);
  const { getPasswordRequestsLogs } = LogService();

  useEffect(() => {
    async function fetchLogs() {
      const response = await getPasswordRequestsLogs();
      if (response.success) {
        const formatted = (response.data as Log[]).map((user) => {
          return Object.values({
            userId: user.userId,
            username: user.username,
            timestamp: moment(user.createdAt).format('MMM D, YYYY, h:mm A'),
            deviceType: user.deviceType,
            status: user.status.charAt(0).toUpperCase() + user.status.slice(1),
            email: user.email,
          });
        });

        setLogs(formatted);
      }
    }
    fetchLogs();
  }, []);

  const columns: Column[] = [
    {
      header: "ADMIN ID",
      label: "userId",
      type: "text",
    },
    {
      header: "USERNAME",
      label: "username",
      type: "text",
    },
    {
      header: "TIMESTAMP",
      label: "timestamp",
      type: "text",
    },
    {
      header: "DEVICE TYPE",
      label: "deviceType",
      type: "text",
    },
    {
      header: "STATUS",
      label: "status",
      type: "custom-text",
      colors: {
        successful: theme.palette.success.main,
        pending: theme.palette.warning.main,
        failed: theme.palette.error.main,
      },
      sx: {
        fontWeight: 600,
        fontSize: 12,
        padding: "6px 16px",
        borderRadius: "10px",
        letterSpacing: "0.5px",
      },
    },
    {
        header: "EMAIL",
        label: "email",
        type: "text",
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
        showBack
        routes={[
          "Logs",
          "Administrative Actions Logs",
          "Policy/Terms Updates",
          "View",
        ]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={() => {}}
        columns={columns}
        data={logs}
      />
    </Box>
  );
};
export default PasswordRequests;
