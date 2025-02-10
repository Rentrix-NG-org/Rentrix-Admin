import { Box, useTheme } from "@mui/material";
import UserNav from "@src/modules/user/components/UserNav";
import { useNavigate } from "react-router";

const AdminActionMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const categories = [
    { name: "User Role Assignment/Changes", route: "user-role-assignment" },
    { name: "Policy/Terms Updates", route: "policy-terms" },
    { name: "Admin Panel Access", route: "panel-access" },
    { name: "Adding of Admins", route: "adding-admins" },
  ];

  return (
    <Box
      sx={{
        margin: "19px",
        display: "flex",
        flexDirection: "column",
        gap: "31px",
      }}
    >
      <UserNav
        routes={[
          "Logs",
          "Administrative Actions Logs",
          "User Role Assignment/Changes",
        ]}
      />

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
  );
};
export default AdminActionMenu;
