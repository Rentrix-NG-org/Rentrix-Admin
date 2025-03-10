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

const ListingCreation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getAllLogs } = LogService();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; ownerId: string; timestamp: string }[]
  >([]);

  useEffect(() => {
    async function fetchLogs() {
      const response = await getAllLogs("listing-creation=true");

      if (response.success) {
        console.log(response.data, "data");
        const formatted = (response.data as Log[]).map((log) => {
          return Object.values({
            userId: log.listing?.owner?.id,
            listingId: log.listing?.id,
            location: log.listing?.location?.state,
            price: log.listing?.fee?.fee,
            description: log.listing?.description,
            approvalStatus: log.status,
            details: log.description,
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss",
            ),
          });
        });

        setLogs(formatted);

        const allIds = (response.data as Log[]).map((log) => {
          return {
            logId: log.id,
            ownerId: log.listing?.owner.id,
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
      header: "Property ID",
      label: "propertyId",
      type: "text",
    },
    {
      header: "LOCATION",
      label: "location",
      type: "text",
    },
    {
      header: "PRICE",
      label: "price",
      type: "text",
    },
    {
      header: "DESCRIPTION",
      label: "description",
      type: "text",
    },
    {
      header: "APPROVAL STATUS",
      label: "approvalStatus",
      type: "custom-text",
      colors: {
        successful: theme.palette.success.main,
        pending: theme.palette.warning.main,
        failed: theme.palette.error.main,
      },
    },
    {
      header: "DETAILS",
      label: "details",
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
        routes={["Logs", "Property Management Logs", "Payment Initiation"]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(v) => {
          console.log(v);
          const id = logIds.find(
            (l) => l.ownerId === v[0] && l.timestamp === v[7],
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
export default ListingCreation;
