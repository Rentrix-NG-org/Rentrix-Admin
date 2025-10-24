import { Box, useTheme } from "@mui/material";
import TableHeader from "@src/shared/components/TableHeader";
import Table from "@src/shared/components/Table";
import { useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { icons } from "@src/utils/icons";
import { useNavigate } from "react-router";
import { Column } from "@src/shared/types/shared.types";
import { useUserContext } from "../providers/user.context";
import Loading from "@src/shared/components/Loading";
import dayjs from "dayjs";
import { addComma } from "@src/modules/property/pages/AddNewListing/components/MainAddListing";

const { getAllWithdrawalRequest } = UserService();

const WithdrawalRequest: React.FC<{ search: string; filter: string[] }> = ({
  search,
  filter,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const { permissions } = useUserContext();
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    async function getRequests() {
      setIsLoading(true);
      const response = await getAllWithdrawalRequest(
        `page=1&limit=10`
      );

      if (response.success) {
        setRefresh(false);
        console.log(response.data.requests);
        const formatted = response.data.requests.map((request: any) => {
          return {
            userId: `${request.requestedByUserTypeId}, ${request.requestedByUserType}`,
            name: `${request.wallet.account.users[0].firstName} ${request.wallet.account.users[0].lastName}`,
            amount: addComma(Number(request.amount)),
            transactionId: request.id,
            createdAt: dayjs(Number(request.createdAt)).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            device: request.device || "Unknown",
            status:
              request.status.charAt(0).toUpperCase() + request.status.slice(1),
          };
        });
        setUsers(formatted as any[]);
      }
      setIsLoading(false);
    }
    getRequests();
  }, [refresh, permissions]);

  useEffect(() => {
    const arr = users.map((d) => Object.values(d)) as string[][];
    const filtered = arr.filter((d) => {
      return d.some((item) =>
        item?.toString().toLowerCase().includes(search.toLowerCase())
      );
    });
    setSearchFilter(filtered);
  }, [search, users]);

  useEffect(() => {
    const arr = users.map((d) => Object.values(d)) as string[][];
    const filtered = arr.filter((d) => {
      return (
        filter.length === 0 ||
        filter.every((filterItem) =>
          d.some((item) =>
            item?.toString().toLowerCase().includes(filterItem.toLowerCase())
          )
        )
      );
    });
    setSearchFilter(filtered);
  }, [filter, users]);

  const columns: Column[] = [
    {
      header: "User ID & Acc Type",
      label: "userId",
      type: "text",
    },
    {
      header: "User Name",
      label: "name",
      type: "text",
    },
    {
      header: "AMOUNT",
      label: "amount",
      type: "text",
    },
    {
      header: "TRANSACTION ID",
      label: "transactionId",
      type: "text",
    },
    {
      header: "Timestamp ",
      label: "timestamp",
      type: "text",
    },
    {
      header: "Device & IP Address",
      label: "device",
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
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TableHeader
        title="Withdrawal Requests"
        onViewAll={() => {
          navigate("withdrawal-requests");
        }}
      />

      <Table
        onSelect={() => {}}
        onRowClick={(row) => navigate(`withdrawal-request/${row[3]}`)}
        columns={columns}
        data={searchFilter}
        showPagination={false}
      />
    </Box>
  );
};

export default WithdrawalRequest;
