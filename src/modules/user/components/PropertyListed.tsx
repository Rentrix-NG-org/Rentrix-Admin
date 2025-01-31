import { Box, Typography, useTheme } from "@mui/material";
import Listing from "./Listing";
import { ListingType } from "../types/user.types";
import { useNavigate } from "react-router";

const PropertyListed: React.FC<{ listings: Partial<ListingType>[] }> = ({
  listings,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
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
        {listings?.length ? (
          listings.slice(0, 3).map((listing) => <Listing listing={listing} />)
        ) : (
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 14,
              color: theme.palette.grey[600],
            }}
          >
            No Property Listed
          </Typography>
        )}
      </Box>
      <Box
        onClick={() => navigate("listings")}
        component="button"
        sx={{
          background: theme.palette.grey[500],
          border: "none",
          padding: "16px",
          color: "white",
          cursor: "pointer",
          mt: "20.04px",
          display: listings?.length ? "flex" : "none",
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
