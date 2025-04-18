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
import { useUserContext } from "../../providers/user.context";
import Loading from "@src/shared/components/Loading";
import Modal from "@src/shared/components/Modal";

const { getAllUsers, updateUser } = UserService();

const LandlordsTenants = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[][]>([]);
  const [users, setUsers] = useState<string[][]>([]);
  const [refresh, setRefresh] = useState(false);

  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string | React.ReactNode;
    onConfirm: () => void;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const { permissions } = useUserContext();

  useEffect(() => {
    async function fetchUsers() {
      setRefresh(true);
      let query = "";
      if (permissions.includes("landlord")) {
        query += "landlord=true";
      }
      if (permissions.includes("tenant")) {
        if (query) {
          query += "&tenant=true";
        } else {
          query = "tenant=true";
        }
      }
      const response = await getAllUsers(query);
      if (response.success) {
        const formatted = (response.data.users as any[]).map((user) => {
          return Object.values({
            userId: user.id,
            name: user.name || "",
            role: user.role,
            status: user.status || "",
            registrationDate: user.registrationDate || "",
          });
        });
        setFilter(formatted);
        setUsers(formatted);
        setIsLoading(false);
        setRefresh(false);
      }
    }
    fetchUsers();
  }, [permissions, refresh]);

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
      header: "STATUS",
      label: "status",
      type: "select",
      options: ["Active", "Suspended"],
    },
    {
      header: "REG DATE",
      label: "registrationDate",
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
      case "Suspended":
        setModal({
          isOpen: true,
          title: "Suspend",
          message: (
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Typography>Are you sure you want to</Typography>
              <Typography
                sx={{ color: theme.palette.secondary.main, fontWeight: 600 }}
              >
                Suspend
              </Typography>
              <Typography>{row[1]}?</Typography>
            </Box>
          ),
          onConfirm: () => {
            updateUserData(row[0], { status: selected.value.toLowerCase() });
            setModal(null);
          },
        });
        break;
      case "Landlord":
      case "Tenant":
        updateUserData(row[0], { role: selected.value.toLowerCase() });
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

      {modal?.isOpen && (
        <Modal
          onCancel={() => {
            setModal(null);
          }}
          onConfirm={modal.onConfirm}
        >
          <Typography>{modal.message} </Typography>
        </Modal>
      )}

      <Table
        onSelect={handleTableSelection}
        onRowClick={(v) => {
          navigate(`/users/${v[0]}`);
        }}
        limit={users.length}
        columns={columns}
        data={filter}
      />
    </Box>
  );
};
export default LandlordsTenants;
