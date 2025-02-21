import { Box, Typography, useTheme } from "@mui/material";
import LogHeader from "../components/LogHeader";
import { useNavigate } from "react-router";

const Logs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const categories = [
    { name: "Administrative Actions Logs", route: "admin-action" },
    { name: "User Authentication Logs", route: "/logs/user-auth" },
    {
      name: "User Account Management Logs",
      route: "/logs/user-account",
    },
    {
      name: "Payment and Transaction Logs",
      route: "/logs/payment",
    },
    {
      name: "Communication and Interaction Logs",
      route: "/logs/communication-interaction",
    },
    { name: "System and Security Logs", route: "/logs/system-security" },
    {
      name: "AI and Machine Learning Logs",
      route: "/logs/ai-machine-learning",
    },
    {
      name: "Escrow and Dispute Resolution Logs",
      route: "/logs/escrow-dispute-resolution",
    },
    { name: "Property Management Logs", route: "/logs/property-management" },
    { name: "System Maintenance Logs", route: "/logs/system-maintenance" },
  ];
  return (
    <Box sx={{ margin: "19px" }}>
      <LogHeader />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <Typography
          sx={{
            color: theme.palette.common.black,
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
          }}
        >
          All Logs
        </Typography>

        <Box
          sx={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: "20px", lg: "40px", xl: "49px" },
          }}
        >
          {categories.map((category) => (
            <Box
              component="button"
              onClick={() => navigate(category.route)}
              sx={{
                border: `1px solid ${theme.palette.grey[300]}`,
                padding: "28px 43px",
                width: "224px",
                display: "flex",
                alignItems: "center",
                borderRadius: 0.8,
                cursor: "pointer",
                justifyContent: "center",
                height: "71px",
                background: "none",
                whiteSpace: "nowrap",
                color: theme.palette.common.black,
                "&:hover": {
                  background: theme.palette.secondary.main,
                  color: theme.palette.common.white,
                },
              }}
            >
              {category.name}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default Logs;
