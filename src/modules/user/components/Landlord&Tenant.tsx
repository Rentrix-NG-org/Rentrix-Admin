import { Box } from "@mui/material";
import Table from "@src/shared/components/Table";
import TableHeader from "@src/shared/components/TableHeader";
import { landlordData } from "../data/table";

const LandlordAndTenant = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TableHeader title="Landlord & Tenants" />
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
            header: "STATUS",
            label: "status",
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
        data={landlordData}
      />
    </Box>
  );
};
export default LandlordAndTenant;
