import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router";
import Topbar from "@src/components/Topbar/Topbar";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = localStorage.getItem("isAuthenticated");
    if (checkAuth) setIsAuthenticated(JSON.parse(checkAuth));
    else {
      setIsAuthenticated(false)
       if (!isAuthenticated) {
         navigate('/');
       }
    };
  }, []);

 

  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        width: "100dvw",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
          overflowY: "scroll",
        }}
      >
        <Topbar />
        <Outlet />
      </Box>
    </Box>
  );
};
export default AppLayout;
