import { Box } from "@mui/material";
import TableHeader from "@src/shared/components/TableHeader";
import { supervisorTableData } from "../data/table";
import Table from "@src/shared/components/TableAlt";

interface TableDataType {
  columnLabel: string;
  value: string[];
  type: "text" | "button" | "select";
  option?: string[];
  actionTitle?: string;
  onAction?: () => void;
}

const SupervisorAndRep = () => {
  const data = [
    {
      userId: "USR001",
      name: "John Doe",
      role: "Supervisor",
      lastActive: "2023-09-01",
      registrationDate: "2023-01-01",
    },
    {
      userId: "USR002",
      name: "Jane Smith",
      role: "Representative",
      lastActive: "2023-09-02",
      registrationDate: "2023-02-01",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TableHeader title="Supervisors & Representatives" />
      <Table
        onSelect={(title, selected) => {
          console.log("ping");
          // console.log(title, selected);
        }}
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
            options: ["One"],
          },
          {
            header: "LAST ACTIVE",
            label: "lastActive",
            type: "text",
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
        ]}
        data={data}
      />
    </Box>
  );
};
export default SupervisorAndRep;
