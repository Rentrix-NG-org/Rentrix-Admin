import { Box, useTheme } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
// import { LogService } from "@src/modules/logs/services/log.service";
// import { Log } from "@src/modules/logs/types/log.types";
import { addComma } from "@src/modules/property/pages/AddNewListing/components/MainAddListing";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import Filter from "@src/shared/components/Filter";
import Loading from "@src/shared/components/Loading";
import Search from "@src/shared/components/Search";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const WithdrawalRequests = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { getAllLogs } = LogService();
  const { getAllWithdrawalRequest } = UserService();
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const [logIds, setLogIds] = useState<
    { logId: string; adminId: string; timestamp: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchLogs() {
      const response = await getAllWithdrawalRequest(`page=1&limit=10`);

      if (response.success) {
        console.log(response.data, "data");
        const formatted = response.data.requests.map((request: any) => {
          return Object.values({
            userId: `${request.requestedByUserTypeId}, ${request.requestedByUserType}`,
            name: `${request.wallet.account.users[0].firstName} ${request.wallet.account.users[0].lastName}`,
            amount: addComma(Number(request.amount)),
            transactionId: request.id,
            createdAt: dayjs(Number(request.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            device: request?.devices?.join(", ") || "Unknown",
            approvedBy: "unknown",
            status:
              request.status.charAt(0).toUpperCase() + request.status.slice(1),
          });
        });
        console.log(formatted);

        setLogs(formatted);
        setIsLoading(false);

        const allIds = response.data.requests.map((request: any) => {
          return {
            logId: request.id,
            adminId: request.wallet.account.id,
            timestamp: dayjs(Number(request.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          };
        });
        setLogIds(allIds);
      }
    }
    fetchLogs();
  }, []);

  useEffect(() => {
    const arr = logs.map((d) => Object.values(d)) as string[][];
    const filtered = arr.filter((d) => {
      return d.some((item) =>
        item?.toString().toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchFilter(filtered);
  }, [search, logs]);

  useEffect(() => {
    const arr = logs.map((d) => Object.values(d)) as string[][];
    const filtered = arr.filter((d) => {
      return d[7].toLowerCase() === filter[0]?.toLowerCase();
    });
    if (filter.length > 0) setSearchFilter(filtered);
    else setSearchFilter(logs);
  }, [filter, logs]);

  console.log(filter);

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
      header: "Device & IP Address",
      label: "device",
      type: "text",
    },
    {
      header: "Approved By",
      label: "approvedBy",
      type: "text",
    },
    {
      header: "STATUS",
      label: "status",
      type: "custom-text",
      colors: {
        successful: theme.palette.success.main,
        processed: theme.palette.success.main,
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
      <Box
        sx={{ display: "flex", alignItems: "center", gap: "30px", ml: "auto" }}
      >
        <Search placeholder="Search users" setSearch={setSearch} />
        <Filter
          filters={[
            {
              name: "Status",
              options: ["Approved", "Pending", "Processed", "Failed"],
            },
          ]}
          onFilter={(v) => (v[0].length > 0 ? setFilter(v) : setFilter([]))}
        />
      </Box>
      <UserNav
        routes={[
          "Logs",
          "Payment & Transaction Logs",
          "Withdrawal Requests (Approved)",
        ]}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(v) => {
          navigate(v[3]);
        }}
        columns={column}
        data={searchFilter}
      />
    </Box>
  );
};
export default WithdrawalRequests;
