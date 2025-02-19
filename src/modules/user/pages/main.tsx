import { Box } from "@mui/material";
import UserHeader from "../components/UserHeader";
import LandlordAndTenant from "../components/Landlord&Tenant";
import SupervisorAndRep from "../components/Supervisor&Rep";
import { useState } from "react";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  return (
    <Box
      sx={{
        px: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "46px",
      }}
    >
      <UserHeader
        title="User Management"
        filters={[
          {
            name: "Role",
            options: ["Landlord", "Tenant"],
          },
        ]}
        search=""
        setSearch={setSearch}
        setFilter={setFilter}
      />
      <LandlordAndTenant search={search} filter={filter} />
      <SupervisorAndRep search={search} filter={filter} />
    </Box>
  );
};
export default UserManagement;
