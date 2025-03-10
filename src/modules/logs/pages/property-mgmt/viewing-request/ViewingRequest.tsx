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

const ViewingRequest = () => {
  const navigate = useNavigate();
  const { getAllLogs } = LogService();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; ownerId: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    async function fetchLogs() {
      const response = await getAllLogs("viewing-requests=true");

      if (response.success) {
        const formatted = (response.data as Log[]).map((log) => {
          return Object.values({
            userId: log.listing?.owner?.id,
            propertyId: log.listing?.id,
            viewingDate: log.description,
            rep: log.user.id,
            staus: log.status,
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss",
            ),
          });
        });

        setLogs(formatted);

        const allIds = (response.data as Log[]).map((log) => {
          return {
            logId: log.id,
            ownerId: log.user.id,
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss",
            ),
          };
        });
        setLogIds(allIds);
      }
    }
    fetchLogs();
  }, []);
  const column: Column[] = [
    {
      header: "USER ID",
      label: "userId",
      type: "text",
    },
    {
      header: "PROPERTY ID",
      label: "propertyId",
      type: "text",
    },
    {
      header: "SCHEDULED VIEWING DATE/TIME",
      label: "viewingDate",
      type: "text",
    },
    {
      header: "RENTRIX REP",
      label: "rep",
      type: "text",
    },
    {
      header: "STATUS",
      label: "status",
      type: "text",
    },
    {
      header: "TIMESTAMPS",
      label: "timestamps",
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
        routes={["Logs", "Property Management Logs", "Viewing Requests"]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(v) => {
          const id = logIds.find(
            (l) => l.ownerId === v[0] && l.timestamp === v[5],
          );

          if (id) {
            navigate(id.logId);
          }
        }}
        columns={column}
        data={logs}
      />
    </Box>
  );
};
export default ViewingRequest;
