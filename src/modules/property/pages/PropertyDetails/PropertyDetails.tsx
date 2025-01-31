import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Hero from './components/Hero';
import Details from './components/Details';
import Features from './components/Features';
import Breadcrumbs from '@src/shared/components/BreadCrumbs';
import { useLocation, useNavigate, useParams } from 'react-router';
import { GetListingsDetails } from '../property.service';
import { IListing } from '../../types';

const PropertyDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { propertyId } = useParams()
  const [listing, setListing] = useState<IListing>()
  useEffect(() => {
    async function getListingDetails() {
      const response = await GetListingsDetails(propertyId || '');

      if (response?.status === 200) {
        setListing(response.data);
      }
    }

    getListingDetails();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="28px"
      pl="24px"
      pr="80px"
      //   marginTop="115px"
      //   maxWidth="1512px"
      //   mx="auto"
    >
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
            sx={{
              background: "#00A3A3",
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
            Approve
          </Button>
        </Box>
      </Box>
      {/* <SubNav /> */}
      <Hero listing={listing as IListing} />
      <Grid
        container
        spacing="19px"
        // padding={{ xs: "0 16px", sm: "0 20px", md: "0 73px" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Details listing={listing as IListing} />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Features listing={listing as IListing} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PropertyDetails
