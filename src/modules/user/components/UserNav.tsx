import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import React from "react";
import { useNavigate } from "react-router";

const UserNav: React.FC<{ routes: string[]; showBack?: boolean }> = ({
  routes,
  showBack = true,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box

        component="button"
        onClick={() => navigate(-1)}
        sx={{
          border: "none",
          cursor: "pointer",
          width: 40,
          height: 40,
          background: theme.palette.grey[200],
          borderRadius: "50%",
          display: showBack ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={icons.arrowback}
          sx={{ width: 20, height: 20 }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {routes.map((route, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 600,
                color:
                  routes.length === index + 1
                    ? theme.palette.secondary.main
                    : theme.palette.common.black,
              }}
            >
              {route}
            </Typography>
            {routes.length > index + 1 ? (
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: theme.palette.common.black,
                }}
              >
                {">"}
              </Typography>
            ) : null}
          </div>
        ))}
      </Box>
    </Box>
  );
};
export default UserNav;
