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

const PolicyUpdates = () => {
  const theme = useTheme();
  const [logs, setLogs] = useState<string[][]>([]);
  const { getAllLogs } = LogService();

  useEffect(() => {
    async function fetchLogs() {
      const response = await getAllLogs("policy=true");
      if (response.success) {
        const formatted = (response.data as Log[]).map((log) => {
          return Object.values({
            adminId: log.user.id,
            action: log.action,
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:MM:ss",
            ),
            device: log.devices.join(",").trim(),
            status: log.status.charAt(0).toUpperCase() + log.status.slice(1),
          });
        });

        console.log(formatted, "formatted");
        setLogs(formatted);
      }
    }
    fetchLogs();
  }, []);

  const columns: Column[] = [
    {
      header: "ADMIN ID",
      label: "adminId",
      type: "text",
    },
    {
      header: "UPDATED POLICY DETAILS",
      label: "updatedPolicy",
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
export default PolicyUpdates;
