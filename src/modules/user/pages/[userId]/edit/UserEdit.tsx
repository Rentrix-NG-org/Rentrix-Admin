import { Box } from "@mui/material";
import UserNav from "@src/modules/user/components/UserNav";

const UserEdit = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "42.82px",
        px: "20px",
        gap: "25px",
      }}
    >
      <UserNav
        routes={["User Management", "User Details", "Edit User Details"]}
      />
    </Box>
  );
};
export default UserEdit;
