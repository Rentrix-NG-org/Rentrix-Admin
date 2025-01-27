import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import Profile from "./Profile";
import PropertyListed from "./PropertyListed";
import TransactionHistory from "./TransactionHistory";
import ActivityLogs from "./ActivityLogs";

const UserDetails = () => {
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
      <Header />
      <Profile />
      <PropertyListed />
      <TransactionHistory />
      <ActivityLogs />
    </Box>
  );
};

const Header = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box
        component="button"
        sx={{
          border: "none",
          cursor: "pointer",
          width: 40,
          height: 40,
          background: theme.palette.grey[200],
          borderRadius: "50%",
          display: "flex",
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
      <Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.palette.common.black,
          }}
        >
          User Management &gt;{" "}
          <span style={{ color: theme.palette.secondary.main }}>
            User Details
          </span>{" "}
        </Typography>
      </Box>
    </Box>
  );
};
export default UserDetails;
