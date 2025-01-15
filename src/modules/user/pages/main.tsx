import { Box } from "@mui/material";
import UserHeader from "../components/UserHeader";
import LandlordAndTenant from "../components/Landlord&Tenant";
import SupervisorAndRep from "../components/Supervisor&Rep";

const UserManagement = () => {
  return (
    <Box
      sx={{
        px: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "46px",
      }}
    >
      <UserHeader />
      <LandlordAndTenant />
      <SupervisorAndRep />
    </Box>
  );
};
export default UserManagement;
