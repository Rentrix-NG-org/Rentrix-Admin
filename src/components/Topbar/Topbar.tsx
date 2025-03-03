import { Box, useTheme } from "@mui/material";
import bell from "@src/assets/icons/bell.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { images } from "@src/utils/images";
import Menu from "@src/shared/components/Menu";
const Topbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ users: any[] | null }>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) setUser(JSON.parse(getUser));
    else setUser(null);
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/";
    } catch (e) {}
  };
  return (
    <Box
      sx={{
        height: "fit-content",
        position: "sticky",
        top: 0,
        zIndex: 99999,
        background: theme.palette.common.white,
        padding: "20px 80px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box></Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            onClick={() => logout()}
            component="img"
            sx={{ width: 24 }}
            src={bell}
          />
          <Box
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            component="img"
            sx={{ width: 32, borderRadius: 10, cursor: "pointer" }}
            src={
              user?.users[0]?.photoUrl
                ? user?.users[0]?.photoUrl
                : images.avatar
            }
          />
        </Box>
      </Box>
      {menuOpen && (
        <Menu
          title="Account"
          options={[
            {
              value: "Profile",
              onClick: () => {
                navigate("/profile");
              },
            },
            {
              value: "Log Out",
              onClick: () => {
                logout();
              },
            },
          ]}
          onCancel={() => {
            setMenuOpen(false);
          }}
        />
      )}
    </Box>
  );
};

export default Topbar;
