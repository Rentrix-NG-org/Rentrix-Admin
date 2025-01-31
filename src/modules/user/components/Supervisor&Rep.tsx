import { Box } from "@mui/material";
import TableHeader from "@src/shared/components/TableHeader";
import Table from "@src/shared/components/Table";
import { useEffect, useState } from "react";
import Action from "./Action";

const SupervisorAndRep: React.FC<{ search: string; filter: string[] }> = ({
  search,
  filter,
}) => {
  const [searchFilter, setSearchFilter] = useState<string[][]>([]);

  useEffect(() => {
    const arr = data.map((d) => Object.values(d));
    const filtered = arr.filter((d) => {
      return d.some((item) =>
        item.toString().toLowerCase().includes(search.toLowerCase()),
      );
    });
    setSearchFilter(filtered);
  }, [search]);
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
        onSelect={(title, selected) => {}}
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
            header: "REG DATE",
            label: "registrationDate",
            type: "text",
          },
          {
            header: "ACTIONS",
            label: "actions",
            type: "action",
            component: [],
          },
        ]}
        data={searchFilter}
      />
    </Box>
  );
};
export default SupervisorAndRep;
