import { Box, useTheme } from "@mui/material";
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

const WalletTransactions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getWalletTransactionLogs } = LogService();
  const [logs, setLogs] = useState<string[][]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; adminId: string; timestamp: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function fetchLogs() {
      const response = await getWalletTransactionLogs();

      if (response.success) {
        console.log(response.data, "data");
        const formatted = (response.data.items).map((log) => {
          return Object.values({
            userId: `${log?.user.account.users[0].id}, ${log?.accountType}`,
            userName: `${log?.user.account.users[0].firstName} ${log?.user.account.users[0].lastName}`,
            transactionType: log?.description,
            amount: log?.amount?.toString() || "",
            transactionId: log?.id || "",
            walletBalanceBefore: addComma(parseInt(log?.balanceBefore)) || "",
            walletBalanceAfter: addComma(parseInt(log?.balanceAfter)) || "",
            timestamp: dayjs(Number(log?.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            status:
              log?.status === "success"
                ? "Successful"
                : log?.status.charAt(0).toUpperCase() + log?.status.slice(1),
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
      header: "User ID & Acc Type",
      label: "userId",
      type: "text",
    },
    {
      header: "User Name",
      label: "userName",
      type: "text",
    },
    {
      header: "Transaction Type",
      label: "transactionType",
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
          onClick: (_blank, row) => navigate(row[4], {
              state: {
                userId: row[0],
                transactionType: row[2],
                amount:
                  addComma(parseInt(row[3].split(".")[0])) +
                  "." +
                  row[3].split(".")[1],
                walletBalanceBefore: row[5],
                walletBalanceAfter: row[6],
                timestamp: row[7],
                device: "",
                status: row[8],
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
        routes={[
          "Logs",
          "Payment & Transaction Logs",
          "Wallet Transactions (Deposit/Withdrawal)",
        ]}
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
                userId: row[0],
                transactionType: row[2],
                amount:
                  addComma(parseInt(row[3].split(".")[0])) +
                  "." +
                  row[3].split(".")[1],
                walletBalanceBefore: row[5],
                walletBalanceAfter: row[6],
                timestamp: row[7],
                device: "",
                status: row[8],
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
export default WalletTransactions;
