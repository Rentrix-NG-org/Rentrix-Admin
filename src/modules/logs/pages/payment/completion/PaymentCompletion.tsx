import { Box } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import { LogService } from "@src/modules/logs/services/log.service";
import { Log } from "@src/modules/logs/types/log.types";
import { addComma } from "@src/modules/property/pages/AddNewListing/components/MainAddListing";
import UserNav from "@src/modules/user/components/UserNav";
import Loading from "@src/shared/components/Loading";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const PaymentCompletion = () => {
  const navigate = useNavigate();
  const { getPaymentCompletionLogs } = LogService();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; adminId: string; timestamp: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchLogs() {
      const response = await getPaymentCompletionLogs();

      if (response.success) {
        console.log(response.data, "data");
        const formatted = response.data.items.map((log) => {
          return Object.values({
            userId: `${log.user?.tenant?.id}, ${log.user?.tenant?.fullName}, ${
              log?.metadata?.listing?.id ? "Tenant" : ""
            }`,
            receiverId: `${log.user?.landlord?.id}, ${
              log.user?.landlord?.fullName
            }, ${log?.metadata?.listing?.id ? "Landlord" : ""}`,
            paymentFor: log.description,
            amount: log.amount?.toString() || "",
            transactionId: log?.id || "",
            propertyId: log.metadata?.listing?.id || "",
            walletBalanceBefore: addComma(parseInt(log?.balanceBefore)) || "",
            walletBalanceAfter: addComma(parseInt(log?.balanceAfter)) || "",
            timestamp: dayjs(Number(log.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
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
      header: "Sender(User ID, Name & Acc Type)",
      label: "userId",
      type: "text",
    },
    {
      header: "Receiver(User ID, Name & Acc Type)",
      label: "receiverId",
      type: "text",
    },
    {
      header: "Payment For",
      label: "paymentFor",
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
      header: "PropertyId ID",
      label: "propertyId",
      type: "text",
    },
    {
      header: "Wallet Balance Before",
      label: "walletBalanceBefore",
      type: "text",
    },
    {
      header: "Wallet Balance After",
      label: "walletBalanceAfter",
      type: "text",
    },
    {
      header: "Timestamp",
      label: "timestamp",
      type: "text",
    },
    // {
    //   header: "DEVICE & IP ADDRESS",
    //   label: "device",
    //   type: "text",
    // },
    // {
    //   header: "STATUS",
    //   label: "status",
    //   type: "custom-text",
    //   colors: {
    //     successful: theme.palette.success.main,
    //     pending: theme.palette.warning.main,
    //     failed: theme.palette.error.main,
    //   },
    //   sx: {
    //     fontWeight: 600,
    //     fontSize: 12,
    //     padding: "6px 16px",
    //     borderRadius: "10px",
    //     letterSpacing: "0.5px",
    //   },
    // },
    {
      header: "ACTIONS",
      label: "actions",
      type: "action",
      component: [
        {
          component: <Box component="img" src={icons.eye} sx={{ width: 18 }} />,
          onClick: (_blank, row) =>
            navigate(row[4], {
              state: {
                tenant: row[0],
                landlord: row[1],
                transactionId: row[4],
                propertyId: row[5],
                amount:
                  addComma(parseInt(row[3].split(".")[0])) +
                  "." +
                  row[3].split(".")[1],
                walletBalanceBefore: row[6],
                walletBalanceAfter: row[7],
                timestamp: row[8],
                device: "",
              },
            }),
          customAction: true
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
        routes={["Logs", "Payment & Transaction Logs", "Payment Completion"]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(row) => {
          console.log(row);
          // const id = logIds.find(
          //   (l) => l.adminId === v[0] && l.timestamp === v[4]
          // );

          if (row) {
            navigate(row[4], {
              state: {
                tenant: row[0],
                landlord: row[1],
                transactionId: row[4],
                propertyId: row[5],
                amount:
                  addComma(parseInt(row[3].split(".")[0])) +
                  "." +
                  row[3].split(".")[1],
                walletBalanceBefore: row[6],
                walletBalanceAfter: row[7],
                timestamp: row[8],
                device: "",
              },
            });
          }
        }}
        columns={column}
        data={logs}
      />
    </Box>
  );
};
export default PaymentCompletion;
