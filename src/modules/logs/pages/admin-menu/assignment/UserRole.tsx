import { Php } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import { LogService } from "@src/modules/logs/services/log.service";
import { Log } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserRole = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getAllLogs } = LogService();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<{ logId: string; adminId: string }[]>(
    [],
  );

  useEffect(() => {
    async function fetchLogs() {
      const response = await getAllLogs("user-role=true");

      if (response.success) {
        console.log(response.data, "dddaa");

        const formatted = (response.data as Log[]).map((log) => {
          return Object.values({
            adminId: log.user.id,
            userIdAffected: log.affectedUser.id,
            action: log.action,
            timestamp: log.createdAt,
            device: log.devices[0],
            status: log.status.charAt(0).toUpperCase() + log.status.slice(1),
          });
        });
        console.log(formatted, "asioed");

        setLogs(formatted);

        const allIds = (response.data as Log[]).map((log) => {
          return {
            logId: log.id,
            adminId: log.user.id,
          };
        });
        setLogIds(allIds);
      }
    }
    fetchLogs();
  }, []);
  const column: Column[] = [
    {
      header: "ADMIN ID",
      label: "adminId",
      type: "text",
    },
    {
      header: "USER ID AFFECTED",
      label: "userIdAffected",
      type: "text",
    },
    {
      header: "ROLE ASSIGNED/CHANGED",
      label: "roleAssigned",
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
          "User Role Assignment/Changes",
          "View",
        ]}
      />

      <Table
        onSelect={(v) => {}}
        onRowClick={(v) => {
          const id = logIds.find((l) => l.adminId === v[0]);

          if (id) {
            navigate(id.logId);
          }
          console.log(v, "is row");
        }}
        columns={column}
        data={logs}
      />
    </Box>
  );
};
export default UserRole;
