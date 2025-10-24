import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Search from "@src/shared/components/Search";
import Filter from "@src/shared/components/Filter";
import Table from "@src/shared/components/Table";
import { Column } from "@src/shared/types/shared.types";
import { icons } from "@src/utils/icons";
import { UserService } from "../../services/user.service";
import UserNav from "../../components/UserNav";
// import { useUserContext } from "../../providers/user.context";
import { addComma } from "@src/modules/property/pages/AddNewListing/components/MainAddListing";
import dayjs from "dayjs";

const WithdrawalRequest = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[][]>([]);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState<string[][]>([]);
  // const { permissions } = useUserContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const { getAllWithdrawalRequest } = UserService();
  // const [user, setUser] = useState<{ users: any[] | null }>(null);
  // const adminId = user?.users[0]?.id;

  useEffect(() => {
    // const getUser = localStorage.getItem("user");
    // if (getUser) setUser(JSON.parse(getUser));
    // else setUser(null);

    async function fetchUsers() {
      const response = await getAllWithdrawalRequest(
        "page=1&limit=10"
      );
      if (response.success) {
        const formatted = (response.data.requests as any[]).map((request) => {
          return Object.values({
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
          });
        });
        setRefresh(false);

        setFilter(formatted);
        setUsers(formatted);
      }
    }
    fetchUsers();
  }, [refresh]);

  useEffect(() => {
    const searchedUsers = users.filter((user) => {
      const isFound = user.some((field) =>
        field.toString().toLowerCase().includes(search.toLowerCase())
      );
      return isFound;
    });
    setFilter(searchedUsers);
  }, [search, users]);

  useEffect(() => {}, [filter, users]);

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

  async function handleFilter(filter: string[]) {
    if (!filter.every((v) => Boolean(v))) {
      setFilter(users);
    } else {
      const roleUsers = users.filter((user) => {
        return filter.includes(user[2]);
      });
      setFilter(roleUsers);
    }
  }

  return (
    <Box
      sx={{
        px: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <UserNav routes={["Withdrawal Request", "View All"]} />
      <Box
        sx={{ display: "flex", alignItems: "center", gap: "30px", ml: "auto" }}
      >
        <Search placeholder="Search users" setSearch={setSearch} />
        <Filter
          filters={[{ name: "Role", options: ["Supervisor", "Rentrix Rep"] }]}
          onFilter={(v) => {
            if (v[0] === "Rentrix Rep") {
              handleFilter(["representative"]);
            } else {
              handleFilter(v);
            }
          }}
        />
      </Box>

      <Box>
        <Typography
          sx={{
            color: theme.palette.common.black,
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "-0.4px",
          }}
        >
          Withdrawal Requests
        </Typography>
      </Box>

      <Table
        onSelect={() => {}}
        onRowClick={(row) => navigate(`/users/withdrawal-request/${row[3]}`)}
        columns={columns}
        limit={users.length}
        data={filter}
      />
    </Box>
  );
};
export default WithdrawalRequest;
