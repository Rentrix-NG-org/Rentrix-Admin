import { ChevronLeftRounded } from "@mui/icons-material";
import { Box, SxProps, Typography, useTheme } from "@mui/material";

interface MenuProps {
  title: string;
  onCancel: VoidFunction;
  options: { value: string; onClick: VoidFunction }[];
  sx?: SxProps;
}

const Menu: React.FC<MenuProps> = ({ title, options, onCancel, sx }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        right: 40,
        border: `1px solid ${theme.palette.grey[300]}`,
        background: theme.palette.background.paper,
        top: 60,
        width: "169px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "6px 20px",
          height: 35,
          alignSelf: "stretch",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Typography>{title}</Typography>
        <Box
          onClick={onCancel}
          component="button"
          sx={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <ChevronLeftRounded
            sx={{
              transform: "rotate(90deg)",
              width: 32,
              height: 32,
              color: theme.palette.secondary.main,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingX: "20px",
          paddingBottom: "16px",
          alignItems: "flex-start",
        }}
      >
        {options.map(({ value, onClick }) => (
          <Box
            onClick={onClick}
            component="button"
            sx={{ background: "none", border: "none", padding: 0 }}
          >
            <Typography sx={{ fontSize: 14 }}>{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Menu;
