import { Box } from "@mui/material";
import UserHeader from "../components/UserHeader";
import LandlordAndTenant from "../components/Landlord&Tenant";
import SupervisorAndRep from "../components/Supervisor&Rep";
import { useState } from "react";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  return (
    <Box
      sx={{
        px: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "46px",
      }}
    >
      <UserHeader search="" setSearch={setSearch} />
      <LandlordAndTenant search={search} />
      <SupervisorAndRep search={search} />
    </Box>
  );
};
export default UserManagement;
