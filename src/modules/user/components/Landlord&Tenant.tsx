import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, useTheme } from "@mui/material";
import TableHeader from "@src/shared/components/TableHeader";
import Table from "@src/shared/components/Table";
import { useEffect, useState } from "react";
import Modal from "@src/shared/components/Modal";
import { UserService } from "../services/user.service";
import { icons } from "@src/utils/icons";
import { useNavigate } from "react-router";
import { Column } from "@src/shared/types/shared.types";
import { useUserContext } from "../providers/user.context";
import Loading from "@src/shared/components/Loading";

const { getAllUsers, updateUser, deleteUserById } = UserService();

const LandlordAndTenant: React.FC<{ search: string; filter: string[] }> = ({
  search,
  filter,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState({ email: "", userId: "", state: false });
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string | React.ReactNode;
    onConfirm: () => void;
  } | null>(null);
  const theme = useTheme();
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const { permissions } = useUserContext();
  const [totals, setTotals] = useState({
    landlord: 0,
    tenant: 0,
    totalUsers: 0
  }); const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
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
      const response = await getAllUsers(`${query}`);

      if (response.success) {
        setRefresh(false);
        setTotals(response.data.total);
        const formatted = response.data.users.map((user: any) => {
          return {
            id: user.id,
            name: user.name,
            role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
            status: user.status,
            registrationDate: user.registrationDate,
            email: user.email,
          };
        });
        // console.log(formatted, "is formatted");
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


  const handleDeleteUser = async (userId: string) => {
    try {
      setDeleteLoading(true);
      console.log("Deleting user with userId:", userId);
      if (!userId) {
        console.error("userId is required to delete a user.");
        return;
      }
      const response = await deleteUserById(userId);
      if (response.success) {
        setRefresh(true);
        setOpen({ email: "", userId: "", state: false });
        console.log("User deleted successfully");
      } else {
        console.error("Failed to delete user:", response.message);
      }
    }
    catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteLoading(false);
    }
  }

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
      type: "text",
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
      header: "EMAIL",
      label: "email",
      type: "text",
    },
    {
      header: "ACTIONS",
      label: "actions",
      type: "action",
      component: [
        {
          component: <Box component="img" src={icons.eye} sx={{ width: 18 }} />,
          onClick: () => { },
        },
        {
          component: (
            <Box component="img" src={icons.edit} sx={{ width: 18 }} />
          ),
          onClick: () => { },
        },
        {
          component: <Box component="img" src={icons.bin} sx={{ width: 18 }} />,
          onClick: (userId) => {
            const selectedUser = users?.find(u => u.id === userId);
            const userEmail = selectedUser?.email;
            // console.log("Selected user email:", userEmail);
            setOpen({ email: userEmail, userId: userId, state: true });
          },
        },
      ],
    },
  ];

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
      // case "Landlord":
      // case "Tenant":
      //   updateUserData(row[0], { role: selected.value.toLowerCase() });
      //   break;
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

      <Dialog
        open={open.state}
        onClose={() => {
          setOpen({ email: "", userId: "", state: false });
          setConfirmationInput("");
        }}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
      >
        <DialogTitle id="delete-confirmation-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-confirmation-description">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography>
                To confirm deletion, please type{" "}
                <Typography
                  component="span"
                  sx={{ color: theme.palette.error.main, fontWeight: 600 }}
                >
                  delete {open.email}
                </Typography>{" "}
                below:
              </Typography>
              <TextField
                fullWidth
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                placeholder={`delete ${open.email}`}
                size="small"
                autoFocus
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen({ email: "", userId: "", state: false });
              setConfirmationInput("");
            }}
            color="primary"
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteUser(open.userId)}
            color="error"
            variant="contained"
            disabled={deleteLoading || confirmationInput !== `delete ${open.email}`}
            startIcon={deleteLoading && <CircularProgress size={18} color="inherit" />}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <TableHeader
        title={`Landlord & Tenants (
          ${totals.landlord} landlord${totals.landlord !== 1 ? 's' : ''}; 
          ${totals.tenant} tenant${totals.tenant !== 1 ? 's' : ''};
          ${totals.totalUsers} total users
        )`}
        onViewAll={() => {
          navigate("roles/landlords-tenants");
        }}
      />
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
        onRowClick={(row) => navigate(`/users/${row[0]}`)}
        columns={columns}
        data={searchFilter}
        showPagination={false}
      />
    </Box>
  );
};

export default LandlordAndTenant;
