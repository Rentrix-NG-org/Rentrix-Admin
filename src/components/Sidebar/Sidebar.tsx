import { Box, useTheme } from "@mui/material";
import logo from "@src/assets/icons/logo.svg";

const Sidebar = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "249px",
        padding: "32px 12px",
        background: theme.palette.primary.main,
        position: "relative",
        top: 0,
        bottom: 0,
      }}
    >
      <Box sx={{ width: 105 }}>
        <Box component="img" src={logo} sx={{ width: "100%" }} />
      </Box>
    </Box>
  );
};
export default Sidebar;
