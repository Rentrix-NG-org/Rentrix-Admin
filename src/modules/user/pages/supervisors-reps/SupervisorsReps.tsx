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
import Loading from "@src/shared/components/Loading";
import { useUserContext } from "../../providers/user.context";

const { getAllUsers, changeRoles } = UserService();

const SupervisorsReps = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[][]>([]);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { permissions } = useUserContext();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    async function fetchUsers() {
      let query = "";
      if (permissions.includes("representative")) {
        query += "representative=true";
      }
      if (permissions.includes("supervisor")) {
        if (query) {
          query += "&supervisor=true";
        } else {
          query = "supervisor=true";
        }
      }
      const response = await getAllUsers(query);
      if (response.success) {
        const formatted = (response.data.users as any[]).map((user) => {
          return Object.values({
            userId: user.id,
            name: user.name || "",
            role: user.role,
            lastActive: user.registrationDate || "",
            location: user.locations?.[0]?.state || "No state",
          });
        });
        setRefresh(false);
        setFilter(formatted);
        setUsers(formatted);
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, [refresh, permissions]);

  useEffect(() => {
    const searchedUsers = users.filter((user) => {
      const isFound = user.some((field) =>
        field.toString().toLowerCase().includes(search.toLowerCase()),
      );
      return isFound;
    });
    setFilter(searchedUsers);
  }, [search, users]);

  useEffect(() => {}, [filter, users]);

  const columns: Column[] = [
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
      options: ["Supervisor", "Representative"],
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

  function handleTableSelection(
    row: string[],
    selected: { value: string; index: number },
  ) {
    switch (selected.value) {
      case "Supervisor":
        handleChangeRoles(row[0], { role: selected.value.toLowerCase() });
        break;
      case "Representative":
        handleChangeRoles(row[0], { role: "representative" });
        break;
    }
  }

  async function handleChangeRoles(id: string, data: any) {
    const response = await changeRoles(id, data);
    if (response.success) {
      setRefresh(true);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <Box
      sx={{
        px: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <UserNav routes={["User Management", "View All"]} />
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
          Supervisors &amp; Rentrix Reps
        </Typography>
      </Box>

      <Table
        onSelect={handleTableSelection}
        onRowClick={(v) => {
          navigate(`/users/${v[0]}/rentrix-rep`);
        }}
        columns={columns}
        limit={users.length}
        data={filter}
      />
    </Box>
  );
};
export default SupervisorsReps;
