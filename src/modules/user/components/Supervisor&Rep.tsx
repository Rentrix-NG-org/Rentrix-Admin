import { Box } from "@mui/material";
import Table from "@src/shared/components/Table";
import TableHeader from "@src/shared/components/TableHeader";
import { supervisorTableData } from "../data/table";

interface TableDataType {
  columnLabel: string;
  value: string[];
  type: "text" | "button" | "select";
  option?: string[];
  actionTitle?: string;
  onAction?: () => void;
}

const SupervisorAndRep = () => {
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
        columns={[
          {
            header: "USER ID",
            label: "userId",
          },
          {
            header: "NAME",
            label: "name",
          },
          {
            header: "ROLE",
            label: "role",
          },
          {
            header: "LAST ACTIVE",
            label: "lastActive",
          },
          {
            header: "REG DATE",
            label: "registrationDate",
          },
          {
            header: "ACTIONS",
            label: "actions",
          },
        ]}
        data={supervisorTableData as TableDataType[]}
      />
    </Box>
  );
};
export default SupervisorAndRep;
