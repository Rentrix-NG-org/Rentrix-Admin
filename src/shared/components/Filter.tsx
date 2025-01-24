import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";

const Filter: React.FC<{ placeholder?: string }> = ({
  placeholder = "Filter",
}) => {
  const theme = useTheme();
  return (
    <Box
      component="button"
      sx={{
        border: `1px solid ${theme.palette.grey[300]}`,
        padding: "6px 16px",
        background: theme.palette.grey[100],
        borderRadius: 10,
        cursor: "pointer",
        width: 99,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Box component="img" src={icons.settings} sx={{ width: 16 }} />
      <Typography sx={{ color: theme.palette.common.black, fontWeight: 600 }}>
        {placeholder}
      </Typography>
    </Box>
  );
};
export default Filter;
