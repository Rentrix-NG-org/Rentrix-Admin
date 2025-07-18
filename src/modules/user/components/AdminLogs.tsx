import { Box, Typography, useTheme } from "@mui/material";
import Table from "@src/shared/components/Table";
import { useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router";
import { icons } from "@src/utils/icons";
import Loading from "@src/shared/components/Loading";
import { useUserContext } from "../providers/user.context";
import Modal from "@src/shared/components/Modal";
import moment from "moment";

const { getTypeUsers, updateUser, changeRoles, deleteUser } = UserService();

const AdminsLogs: React.FC<{ search: string; filter: string[] }> = ({
  search,
  filter,
}) => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    role: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);
  const { permissions } = useUserContext();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    async function getUsers() {
      try {
        const isAdmin = permissions.includes("admin")
        const response = isAdmin ? await getTypeUsers("/admin/logs/admin/logs") : { success: false, data: [], message: '' }

        if (response.success) {
          const formatted = response.data.data?.map((user: any) => {
            return {
              id: user.id,
              name: user.username,
              role: user.role || "N/A",
              lastActive: moment(user.lastSeen).format('MMM D, YYYY, h:mm A'),
              location: user.location || "N/A",
              assignedLocation: user.assignedLocation?.join(", ") || "None",
            };
          });
          setRefresh(false);
          setUsers(formatted as any[]);
        }
      }
      catch (e) { }
      finally { 
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

  async function handleDeleteUser() {
    const response = await deleteUser(selectedUser.id);
    if (response.success) {
      setShowDeleteModal(false);
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
            type: "text",
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
            header: "ASSIGNED LOCATION",
            label: "assignedLocation",
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
                onClick: () => { },
              },
              {
                component: (
                  <Box component="img" src={icons.edit} sx={{ width: 18 }} />
                ),
                onClick: () => { },
              },
              {
                component: (
                  <Box component="img" src={icons.bin} sx={{ width: 18 }} />
                ),
                onClick: (v) => {
                  const user = users.find((u) => u.id === v);
                  setSelectedUser(user);
                  setShowDeleteModal(true);
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
            setShowDeleteModal(false);
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
export default AdminsLogs;
