import { Box } from "@mui/material";
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

const ProfileUpdates = () => {
  const { getAllLogs } = LogService();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; adminId: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    async function fetchLogs() {
      const response = await getAllLogs("profile-update=true");
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
            valueBefore: log.valueBefore,
            valueAfter: log.valueAfter,
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss",
            ),
            device: log.devices.join(", "),
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
      header: "Updated Fields",
      label: "updatedFields",
      type: "text",
    },
    {
      header: "Before Value",
      label: "beforeValue",
      type: "text",
    },
    {
      header: "After Value",
      label: "afterValue",
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
        routes={["Logs", "User Account Management", "Profile Updates"]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(v) => {
          console.log(v[4], logIds);
          const id = logIds.find(
            (id) => id.adminId === v[0] && id.timestamp === v[4],
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
export default ProfileUpdates;
