import { Box } from "@mui/material";
import UserHeader from "../components/UserHeader";
import LandlordAndTenant from "../components/Landlord&Tenant";
import SupervisorAndRep from "../components/Supervisor&Rep";
import { useState } from "react";
import Admins from "../components/Admins";
import PasswordRequests from "../components/PasswordRequests";

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
      <Admins search={search} filter={filter} />
      <PasswordRequests search={search} filter={filter} />
    </Box>
  );
};
export default UserManagement;
