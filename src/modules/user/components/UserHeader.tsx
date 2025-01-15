import { Box, Typography, useTheme } from "@mui/material";
import Filter from "@src/shared/components/Filter";
import Search from "@src/shared/components/Search";

const UserHeader = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.palette.common.black,
          }}
        >
          User Management
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <Box
          component="button"
          sx={{
            display: "flex",
            width: "178px",
            height: "40px",
            cursor: "pointer",
            padding: "16px",
            borderRadius: 30,
            border: "none",
            background: theme.palette.grey[500],
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: theme.palette.common.white,
            }}
          >
            {" "}
            Add new users
          </Typography>
        </Box>
        <Search placeholder="Search Users" />
        <Filter />
      </Box>
    </Box>
  );
};
export default UserHeader;
