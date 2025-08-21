import { Box } from "@mui/material";
import UserHeader from "../components/UserHeader";
import LandlordAndTenant from "../components/Landlord&Tenant";
import SupervisorAndRep from "../components/Supervisor&Rep";
import { useState } from "react";
import Admins from "../components/Admins";
import PasswordRequests from "../components/PasswordRequests";
import { useUserContext } from "../providers/user.context";
import Loading from "@src/shared/components/Loading";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const { permissions } = useUserContext();

  if (!permissions) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ typography: "h6", color: "error.main" }}>
          Failed to retrieve user permissions
        </Box>
      </Box>
    );
  }
  if (permissions.length === 0) return <Loading />;
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

      {permissions.some((p) => ["landlord", "tenant"].includes(p)) && (
        <LandlordAndTenant search={search} filter={filter} />
      )}
      {permissions.some((p) =>
        ["supervisor", "representative"].includes(p),
      ) && <SupervisorAndRep search={search} filter={filter} />}
      {permissions.some((p) => ["admin"].includes(p)) && (
        <Admins search={search} filter={filter} />
      )}
      {permissions.some((p) => ["admin"].includes(p)) && (
        <PasswordRequests search={search} filter={filter} />
      )}
    </Box>
  );
};
export default UserManagement;
