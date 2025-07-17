import { Box } from "@mui/material";
import LogHeader from "@src/modules/logs/components/LogHeader";
import AdminsLogs from "@src/modules/user/components/AdminLogs";
import UserNav from "@src/modules/user/components/UserNav";

const search = "";
const Filter = [];

const AdminLogins = () => {


  return (
        <Box
          sx={{
            margin: "19px",
            display: "flex",
            flexDirection: "column",
            gap: "31px",
          }}
        >
          <LogHeader />
          <UserNav
            showBack={true}
            routes={["Logs", "User Authentication Logs", "Admin logins"]}
          />
        <AdminsLogs search={search} filter={Filter} />
        </Box>
  );
};
export default AdminLogins;
