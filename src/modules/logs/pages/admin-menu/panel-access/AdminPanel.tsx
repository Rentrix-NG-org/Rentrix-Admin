import { Box } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import { LogService } from "@src/modules/logs/services/log.service";
import { Admin } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AdminPanel = () => {
  const { getAllLogs } = LogService();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[][]>([]);
  const [adminIds, setAdminIds] = useState<string[]>([]);
  useEffect(() => {
    async function fetchLogs() {
      const response = await getAllLogs("panel-access=true");
      if (response.success) {
        const formatted = (response.data as Admin[]).map((log) => {
          return Object.values({
            adminId: log.user.id,
            action: log.accessModules.flat().length
              ? log.accessModules.join(", ")
              : "No Access",
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss",
            ),
            device: "0.0.0.0",
          });
        });
        setLogs(formatted);
        const allIds = (response.data as Admin[]).map((admin) => {
          return admin.user.id;
        });
        setAdminIds(allIds);
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
          "Admin Panel Access",
          "View",
        ]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(v: string[]) => {
          const id = adminIds.find((l) => l === v[0]);

          if (id) {
            navigate(id);
          }
        }}
        columns={columns}
        data={logs}
      />
    </Box>
  );
};
export default AdminPanel;
