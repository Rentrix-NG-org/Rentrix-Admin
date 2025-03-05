import { Box } from "@mui/material";
import TableHeader from "@src/shared/components/TableHeader";
import Table from "@src/shared/components/Table";
import { useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router";
import { icons } from "@src/utils/icons";
import Loading from "@src/shared/components/Loading";
import { useUserContext } from "../providers/user.context";

const Admins: React.FC<{ search: string; filter: string[] }> = ({
  search,
  filter,
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);
  const { permissions } = useUserContext();
  const { getAllUsers, updateUser, changeRoles } = UserService();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      const query = permissions.includes("admin") ? "admin=true" : "";
      const response = await getAllUsers(query);

      if (response.success) {
        const formatted = response.data.map((user: any) => {
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            location: user.locations?.map((l) => l.state)?.join(", ") || "None",
            registrationDate: user.registrationDate,
          };
        });
        setRefresh(false);
        setUsers(formatted as any[]);
        setIsLoading(false);
      }
    }
    getUsers();
  }, [refresh, permissions]);
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

  async function handleChangeRoles(id: string, data: any) {
    const response = await changeRoles(id, data);
    if (response.success) {
      setRefresh(true);
    }
  }

  async function updateUserData(id: string, data: any) {
    const response = await updateUser(id, data);
    if (response.success) {
      setRefresh(true);
    }
  }

  function handleTableSelection(
    row: string[],
    selected: { value: string; index: number },
  ) {
    switch (selected.value) {
      case "Supervisor":
        handleChangeRoles(row[0], { role: selected.value.toLowerCase() });
        // updateUserData(row[0], { role: selected.value.toLowerCase() });
        break;
      case "Representative":
        handleChangeRoles(row[0], { role: "representative" });
        // updateUserData(row[0], { role: "representative" });
        break;
      case "Active":
        updateUserData(row[0], { status: selected.value.toLowerCase() });
        break;
    }
  }

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
        title="Admins"
        onViewAll={() => {
          navigate("roles/admins");
        }}
      />
      <Table
        onSelect={handleTableSelection}
        onRowClick={(row) => navigate(`/users/${row[0]}/admin`)}
        showPagination={false}
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
export default Admins;
