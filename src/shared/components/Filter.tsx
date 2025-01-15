import { Box, Typography, useTheme } from "@mui/material";

const Filter: React.FC<{ placeholder?: string }> = ({
  placeholder = "Filter",
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.grey[300]}`,
        padding: "16px",
        borderRadius: 10,
        width: 73,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ color: theme.palette.grey[400], fontWeight: 500 }}>
        {placeholder}
      </Typography>
    </Box>
  );
};
export default Filter;
