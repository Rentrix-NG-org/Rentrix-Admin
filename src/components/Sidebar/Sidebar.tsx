import { Box, Typography, useTheme } from "@mui/material";
import logo from "@src/assets/icons/logo.svg";

import { ModuleRegistry } from "@src/core/registry";
import { useState } from "react";
import { useNavigate } from "react-router";
import users from "@src/assets/icons/users.svg";
import logs from "@src/assets/icons/logs.svg";
import home from "@src/assets/icons/home.svg";

const Sidebar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("User Management");
  const navigate = useNavigate();
  const routes = ModuleRegistry.getRoutes();

  const icons = {
    "User Management": users,
    "Property Management": home,
    Logs: logs,
  };

  const sidebarRoutes = routes.filter((route) => {
    const split = route.path?.split("/");
    return split && split.length === 2;
  });

  return (
    <Box
      sx={{
        width: "280px",
        padding: "32px 12px",
        background: theme.palette.primary.main,
        position: "relative",
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        gap: "82px",
      }}
    >
      <Box sx={{ width: 105 }}>
        <Box component="img" src={logo} sx={{ width: "100%" }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {sidebarRoutes.map(({ title, path }) => (
          <Box
            component="button"
            onClick={() => {
              setSelected(title || "");
              navigate(path || "");
            }}
            sx={{
              padding: "10px",
              width: "100%",
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: "none",
              background:
                selected === title ? theme.palette.secondary.main : "none",
              borderRadius: "4px",
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={icons[title as keyof typeof icons]}
              sx={{
                width: 24,
                opacity: selected === title ? 1 : 0.8,
              }}
            />
            <Typography
              sx={{
                color:
                  selected === title
                    ? theme.palette.common.white
                    : theme.palette.secondary.light,
                transition: "all 100ms ease",

                mt: 0.3,
                fontWeight: selected === title ? 600 : 500,
                fontSize: 16,
              }}
            >
              {title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Sidebar;
