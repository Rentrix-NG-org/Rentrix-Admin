import { Box, Typography, useTheme } from "@mui/material";
import Listing from "./Listing";

const PropertyListed = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15.59px" }}>
      <Typography
        sx={{
          color: theme.palette.common.black,
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        Property Listed
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "repeat(4, 1fr)",
          },
          gap: "24px",
        }}
      >
        {Array(5)
          .fill(null)
          .map(() => (
            <Listing />
          ))}
      </Box>
      <Box
        component="button"
        sx={{
          background: theme.palette.grey[500],
          border: "none",
          padding: "16px",
          color: "white",
          cursor: "pointer",
          mt: "20.04px",
          display: "flex",
          width: "178px",
          borderRadius: "100px",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        >
          View all
        </Typography>
      </Box>
    </Box>
  );
};
export default PropertyListed;
