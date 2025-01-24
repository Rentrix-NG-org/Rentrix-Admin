import { Box, Typography, useTheme } from "@mui/material";
import TableHeader from "@src/shared/components/TableHeader";
import Table from "@src/shared/components/Table";
import { useEffect, useState } from "react";
import Modal from "@src/shared/components/Modal";

const LandlordAndTenant: React.FC<{ search: string; filter: string[] }> = ({
  search,
  filter,
}) => {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string | React.ReactNode;
    onConfirm: () => void;
  } | null>(null);
  const theme = useTheme();
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);

  useEffect(() => {
    const arr = data.map((d) => Object.values(d));
    const filtered = arr.filter((d) => {
      return d.some((item) =>
        item.toString().toLowerCase().includes(search.toLowerCase()),
      );
    });
    console.log(filtered);
    setSearchFilter(filtered);
  }, [search]);
  const columns: {
    header: string;
    label: string;
    type: "select" | "action" | "text";
    options?: string[];
  }[] = [
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
      options: ["Tenant", "Landlord"],
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
    },
  ];
  const data = [
    {
      userId: "00AB204",
      name: "John Doe",
      role: "Landlord",
      status: "Active",
      registrationDate: "2023-01-15",
    },
    {
      userId: "00AB205",
      name: "Jane Smith",
      role: "Tenant",
      status: "Active",
      registrationDate: "2023-02-20",
    },
    {
      userId: "00AB206",
      name: "Bob Wilson",
      role: "Landlord",
      status: "Suspended",
      registrationDate: "2023-03-10",
    },
    {
      userId: "00AB207",
      name: "Sarah Brown",
      role: "Tenant",
      status: "Active",
      registrationDate: "2023-04-05",
    },
  ];

  function handleTableSelection(
    row: string[],
    selected: { value: string; index: number },
  ) {
    switch (selected.value) {
      case "Suspended":
        console.log("Wait!!");
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
            console.log("confirmed");
          },
        });
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
      <TableHeader title="Landlord & Tenants" />
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
        columns={columns}
        data={searchFilter}
      />
    </Box>
  );
};
export default LandlordAndTenant;
