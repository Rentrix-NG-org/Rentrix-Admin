import { Box, Typography, useTheme } from "@mui/material";
import TableHeader from "@src/shared/components/TableHeader";
import Table from "@src/shared/components/Table";
import { useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router";
import { icons } from "@src/utils/icons";
import { useUserContext } from "../providers/user.context";
import Loading from "@src/shared/components/Loading";
import Modal from "@src/shared/components/Modal";

const { getAllUsers, updateUser, changeRoles, deleteUser } = UserService();

const SupervisorAndRep: React.FC<{ search: string; filter: string[] }> = ({
  search,
  filter,
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    role: "",
  });
  const [showDeleteModal, setSHowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totals, setTotals] = useState({ supervisor: 0, representative: 0 });
  const { permissions } = useUserContext();
  const theme = useTheme();

  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);

  useEffect(() => {
    async function getUsers() {
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
        setTotals(response.data.total);
        const formatted = response.data.users.map((user: any) => {
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            registrationDate: user.registrationDate,
            location: user.locations?.map((l) => l.state)?.join(", ") || "None",
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
        break;
      case "Representative":
        handleChangeRoles(row[0], { role: "representative" });
        break;
      case "Active":
        updateUserData(row[0], { status: selected.value.toLowerCase() });
        break;
    }
  }

  async function handleDeleteUser() {
    const response = await deleteUser(selectedUser.id);
    if (response.success) {
      setSHowDeleteModal(false);

      setRefresh(true);
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
        title={`Supervisors & Representatives (${totals.supervisor} supervisors; ${totals.representative} representatives)`}
        onViewAll={() => {
          navigate("roles/supervisors-reps");
        }}
      />
      <Table
        onSelect={handleTableSelection}
        onRowClick={(row) => navigate(`/users/${row[0]}/rentrix-rep`)}
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
                onClick: (v) => {
                  const user = users.find((u) => u.id === v);
                  console.log(user);
                  setSelectedUser(user);
                  setSHowDeleteModal(true);
                },
              },
            ],
          },
        ]}
        data={searchFilter}
      />
      {showDeleteModal && (
        <Modal
          onCancel={() => {
            setSHowDeleteModal(false);
          }}
          onConfirm={handleDeleteUser}
        >
          Are you sure you want to delete &nbsp;
          <Typography
            sx={{
              fontWeight: 600,
              color: theme.palette.secondary.main,
            }}
          >
            {" "}
            {selectedUser.name}
          </Typography>
          &nbsp;from&nbsp;
          <Typography
            sx={{
              fontWeight: 600,
              color: theme.palette.secondary.main,
            }}
          >
            {selectedUser.role.charAt(0).toUpperCase() +
              selectedUser.role.slice(1)}
          </Typography>
          ?
        </Modal>
      )}
    </Box>
  );
};
export default SupervisorAndRep;
