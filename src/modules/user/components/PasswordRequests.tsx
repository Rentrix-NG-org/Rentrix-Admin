import { Box } from "@mui/material";
import TableHeader from "@src/shared/components/TableHeader";
import Table from "@src/shared/components/Table";
import { useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router";
import { icons } from "@src/utils/icons";

const PasswordRequests: React.FC<{ search: string; filter: string[] }> = ({
  search,
  filter,
}) => {
  const [users, setUsers] = useState<unknown[]>([]);
  const { getAllUsers, handlePasswordRequest } = UserService();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);

  useEffect(() => {
    async function getUsers() {
      const response = await getAllUsers("password-request=true");

      if (response.success) {
        const formatted = response.data.map((user: any) => {
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            status: user.status,
            location: user.locations?.map((l) => l.state)?.join(", ") || "None",
            registrationDate: user.registrationDate,
          };
        });
        setRefresh(false);
        setUsers(formatted as unknown[]);
      }
    }
    getUsers();
  }, [refresh]);
  useEffect(() => {
    const arr = users.map((d) => Object.values(d)) as string[][];
    const filtered = arr.filter((d) => {
      return d.some((item) =>
        item.toString().toLowerCase().includes(search.toLowerCase()),
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
            item.toString().toLowerCase().includes(filterItem.toLowerCase()),
          ),
        )
      );
    });
    setSearchFilter(filtered);
  }, [filter, users]);

  async function handleUpdatePasswordRequest(
    userId: string,
    approved: boolean,
  ) {
    const response = await handlePasswordRequest({ userId, approved });
    if (response.success) {
      const filtered = users.filter((u: any) => u.id !== userId);
      const formatted = filtered.map((u) => Object.values(u)) as string[][];
      setUsers(filtered);
      setSearchFilter(formatted);
      setRefresh(true);
    }
  }

  function handleTableSelection(
    row: string[],
    selected: { value: string; index: number },
  ) {
    switch (selected.value) {
      case "Authenticate":
        handleUpdatePasswordRequest(row[0], true);
        break;
      default:
        handleUpdatePasswordRequest(row[0], false);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TableHeader
        title="Password Reset Requests"
        onViewAll={() => {
          navigate("roles/supervisors-reps");
        }}
      />
      <Table
        onSelect={handleTableSelection}
        onRowClick={(row) => navigate(`/users/${row[0]}/admin`)}
        columns={[
          {
            header: "USER ID",
            label: "userId",
            type: "text",
          },
          {
            header: "NAME",
            label: "name",
            type: "text",
          },
          {
            header: "ROLE",
            label: "role",
            type: "select",
            options: [],
          },
          {
            header: "STATUS",
            label: "status",
            type: "select",
            options: ["Authenticate", "Deny"],
          },
          {
            header: "LAST ACTIVE",
            label: "lastActive",
            type: "text",
          },
          {
            header: "LOCATION",
            label: "location",
            type: "text",
          },
          {
            header: "ACTIONS",
            label: "actions",
            type: "action",
            component: [
              {
                component: (
                  <Box component="img" src={icons.eye} sx={{ width: 18 }} />
                ),
                onClick: () => {},
              },
              {
                component: (
                  <Box component="img" src={icons.edit} sx={{ width: 18 }} />
                ),
                onClick: () => {},
              },
              {
                component: (
                  <Box component="img" src={icons.bin} sx={{ width: 18 }} />
                ),
                onClick: () => {},
              },
            ],
          },
        ]}
        data={searchFilter}
      />
    </Box>
  );
};
export default PasswordRequests;
