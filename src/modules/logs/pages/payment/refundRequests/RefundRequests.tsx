import { Box, useTheme } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import { LogService } from "@src/modules/logs/services/log.service";
import { Log } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
import Loading from "@src/shared/components/Loading";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RefundRequests = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getRefundRequestLogs } = LogService();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; adminId: string; timestamp: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchLogs() {
      const response = await getRefundRequestLogs();

      if (response.success) {
        console.log(response.data.items, "data");
        const formatted = (response.data.items as Log[]).map((log) => {
          return Object.values({
            userId: log.user.account.users[0].id,
            reason: log.user.id,
            amount: log.amount?.toString() || "",
            transactionId: log?.id || "",
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss"
            ),

            processingDetails: "",
            status:
              log.status === "success"
                ? "Successful"
                : log.status.charAt(0).toUpperCase() + log.status.slice(1),
          });
        });

        setLogs(formatted);

        setIsLoading(false);
      }
    }
    fetchLogs();
  }, []);
  const column: Column[] = [
    {
      header: "User ID",
      label: "userId",
      type: "text",
    },
    {
      header: "Reason",
      label: "reason",
      type: "text",
    },
    {
      header: "Amount",
      label: "amount",
      type: "text",
    },
    {
      header: "Transaction ID",
      label: "transactionId",
      type: "text",
    },
    {
      header: "Timestamp",
      label: "timestamp",
      type: "text",
    },
    {
      header: "Processing Details",
      label: "processingDetails",
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
          component: <Box component="img" src={icons.bin} sx={{ width: 18 }} />,
          onClick: () => {},
        },
      ],
    },
  ];

  if (isLoading) return <Loading />;
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
        routes={[
          "Logs",
          "Payment & Transaction Logs",
          "Refund Requests (Manual entry)",
        ]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(v) => {
          console.log(v);
          const id = logIds.find(
            (l) => l.adminId === v[0] && l.timestamp === v[4]
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
export default RefundRequests;
