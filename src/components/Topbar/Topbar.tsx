import { Box } from "@mui/material";
import avatar from "@src/assets/images/avatar.jpg";
import bell from "@src/assets/icons/bell.svg";
const Topbar = () => {
  return (
    <Box
      sx={{
        height: "fit-content",
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
          <Box component="img" sx={{ width: 24 }} src={bell} />
          <Box
            component="img"
            sx={{ width: 32, borderRadius: 10 }}
            src={avatar}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Topbar;
