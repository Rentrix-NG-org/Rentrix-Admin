import { Box, Button, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Details from "./components/Details";
import Features from "./components/Features";
import Breadcrumbs from "@src/shared/components/BreadCrumbs";
import { useLocation, useNavigate, useParams } from "react-router";
import { ApproveListing, GetListingsDetails } from "../property.service";
import { IListing } from "../../types";
import { PropertyDocuments } from "./components/Documents";

const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const params = useParams();
  const { propertyId } = params;
  const [listing, setListing] = useState<IListing>();
  const [approveStatus, setApproveStatus] = useState<
    "pending" | "approved" | "rejected" | null
  >(null);
  useEffect(() => {
    async function getListingDetails() {
      const response = await GetListingsDetails(propertyId || "");

      if (response?.status === 200) {
        console.log(response.data);
        setListing(response.data);
      }
    }

    getListingDetails();
  }, []);

  async function handleApprove() {
    setApproveStatus("pending");
    const response = await ApproveListing(propertyId);
    if (response.success) {
      setApproveStatus("approved");
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } else {
      setApproveStatus("rejected");
    }
  }
  return (
    <Box display="flex" flexDirection="column" gap="28px" pl="24px" pr="80px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Breadcrumbs url={location.pathname} />
        <Box display="flex" alignItems="center" gap="28px">
          <Button
            onClick={() => navigate("edit")}
            sx={{
              background: "#002B5B",
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
              textTransform: "none",
              width: "120px",
              height: "40px",
            }}
          >
            Edit
          </Button>
          <Button
            onClick={listing && listing.status !== "AVAILABLE" && handleApprove}
            sx={{
              background:
                listing?.status === "AVAILABLE" || approveStatus === "pending"
                  ? theme.palette.grey[400]
                  : approveStatus === "approved"
                    ? theme.palette.success.main
                    : theme.palette.secondary.main,
              color: "#fff",
              border: "none",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
              textTransform: "none",
              width: "120px",
              height: "40px",
              cursor:
                listing?.status === "AVAILABLE" ? "not-allowed" : "pointer",
            }}
          >
            {approveStatus === "pending"
              ? "Approving..."
              : (listing && listing.status === "AVAILABLE") ||
                  approveStatus === "approved"
                ? "Approved!"
                : "Approve"}
          </Button>
        </Box>
      </Box>
      <Hero listing={listing as IListing} />
      <Grid container spacing="19px">
        <Grid item xs={12} sm={6} md={4}>
          <Details listing={listing as IListing} />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Features listing={listing as IListing} />
        </Grid>
      </Grid>
      <PropertyDocuments documents={["", "", "", ""]} />
    </Box>
  );
};

export default PropertyDetails;
