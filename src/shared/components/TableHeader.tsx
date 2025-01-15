import { Box, Typography, useTheme } from "@mui/material";

const TableHeader: React.FC<{ title: string }> = ({ title = "Title" }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            letterSpacing: "-0.4px",
            color: theme.palette.common.black,
          }}
        >
          {title}
        </Typography>
        <Box
          component="button"
          sx={{
            background: theme.palette.grey[100],
            border: "none",
            display: "flex",
            width: "178px",
            height: "40px",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: 100,
          }}
        >
          <Typography
            sx={{ fontWeight: 600, color: theme.palette.common.black }}
          >
            View All
          </Typography>
        </Box>
      </Box>
      <Box></Box>
    </Box>
  );
};
export default TableHeader;
