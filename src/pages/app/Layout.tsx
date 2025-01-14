import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router";
import Topbar from "@src/components/Topbar/Topbar";

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100dvh", width: "100dvw" }}>
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <Topbar />
        <Outlet />
      </Box>
    </Box>
  );
};
export default AppLayout;
