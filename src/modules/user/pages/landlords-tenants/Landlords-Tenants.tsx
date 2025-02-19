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

const LandlordsTenants = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[][]>([]);
  const [users, setUsers] = useState<string[][]>([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const { getAllUsers } = UserService();

  useEffect(() => {
    async function fetchUsers() {
      const response = await getAllUsers("landlord=true&tenant=true");
      if (response.success) {
        console.log(response.data, "data");
        const formatted = (response.data as any[]).map((user) => {
          return Object.values({
            userId: user.id,
            name: user.name || "",
            role: user.role,
            lastActive: user.lastActive || "",
            location: user.locations?.[0]?.state || "No state",
          });
        });
        setFilter(formatted);
        setUsers(formatted);
      }
    }
    fetchUsers();
  }, []);

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
      options: ["Landlord", "Tenant"],
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
    console.log(filter);
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
      <UserNav routes={["User Management", "View All"]} />

      <Box
        sx={{ display: "flex", alignItems: "center", gap: "30px", ml: "auto" }}
      >
        <Search placeholder="Search users" setSearch={setSearch} />
        <Filter
          filters={[{ name: "Role", options: ["Landlord", "Tenant"] }]}
          onFilter={(v) => {
            const lowercased = v.map((d) => d.toLowerCase());
            handleFilter(lowercased);
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
          Landlord &amp; Tenants
        </Typography>
      </Box>

      <Table
        onSelect={() => {}}
        onRowClick={(v) => {
          navigate(`/users/${v[0]}`);
        }}
        columns={columns}
        data={filter}
      />
    </Box>
  );
};
export default LandlordsTenants;
