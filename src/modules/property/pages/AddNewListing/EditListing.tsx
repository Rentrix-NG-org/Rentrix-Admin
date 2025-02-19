import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import MainAddListing from "./components/MainAddListing";
import NameAndAddress from "./components/NameAndAddress";
import PropertyMedia from "./components/PropertyMedia";
import PropertyDocument from "./components/PropertyDocument";
import PropertyDetails from "./components/PropertyDetails";
import PropertyFees from "./components/PropertyFees";
import { INewListing } from "./type";
import Breadcrumbs from "@src/shared/components/BreadCrumbs";
import ArrowRight from "./assets/ArrowRight";
import { GetListingsDetails } from "../property.service";

const EditListing = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("main");
  const location = useLocation();
  const { propertyId } = useParams();
  const [editListing, setEditListing] = useState<INewListing>({
    title: "",
    description: "",
    builtMonth: "",
    builtYear: null,
    currentlyLivedIn: false,
    hasManualAddress: false,
    address: "",
    location: {
      country: "",
      city: "",
      nearestLandmark: "",
      streetName: "",
      propertyNumber: 0,
    },
    media: [],
    category: "",
    type: "",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpace: 0,
    rentalPeriod: "",
    fee: {
      rentalPeriod: "",
      platformFee: "",
      legalFee: "",
      serviceFee: "",
      cautionFee: "",
      estateFee: "",
      currency: "NGN",
      otherFees: [],
    },
    furnishedType: "",
    propertyAge: "",
    lotSize: null,
    floorArea: null,
    floorLevel: null,
    servicing: "",
    interiorFeatures: [],
    exteriorFeatures: [],
    buildingAmenities: [],
    kitchenFittings: [],

    interiorFlooring: "",
    exteriorFlooring: "",
    representativeId: "",
    caretakerId: "",
    status: "",
  });
  //   const [listing, setListing] = useState<INewListing>({
  //     title: "",
  //     description: "",
  //     builtMonth: "",
  //     builtYear: null,
  //     currentlyLivedIn: false,
  //     hasManualAddress: false,
  //     address: "",
  //     country: "",
  //     city: "",
  //     nearestLandmark: "",
  //     streetName: "",
  //     propertyNumber: 0,
  //     media: [],
  //     category: "",
  //     type: "",
  //     bedrooms: 0,
  //     bathrooms: 0,
  //     toilets: 0,
  //     parkingSpace: 0,
  //     rentalPeriod: "",
  //     fee: {
  //   rentalPeriod: '',
  //   platformFee: '',
  //   legalFee: '',
  //   serviceFee: '',
  //   cautionFee: '',
  //       estateFee: '',
  //   currency: "NGN",
  //   otherFees: [],
  // },
  //     furnishedType: "",
  //     propertyAge: "",
  //     lotSize: null,
  //     floorArea: null,
  //     floorLevel: null,
  //     servicing: "",
  //     interiorFeatures: [],
  //     exteriorFeatures: [],
  //     buildingAmenities: [],
  //     kitchenFittings: [],

  //     interiorFlooring: "",
  //     exteriorFlooring: "",
  //     representativeId: "",
  //     caretakerId: "",
  //     propertystatus: "",
  //   });
  useEffect(() => {
    async function getListingDetails() {
      const response = await GetListingsDetails(propertyId || "");

      if (response?.status === 200) {
        setEditListing(response.data);
      }
    }

    getListingDetails();
  }, []);
  const handleCurrentPageChange = (page: string) => {
    setCurrentPage(page);
  };

  console.log(editListing);
  const CurrentPage = () => {
    switch (currentPage) {
      case "main":
        return (
          <MainAddListing
            newListing={editListing}
            setNewListing={setEditListing}
            onPageChange={handleCurrentPageChange}
          />
        );
      case "name-and-address":
        return (
          <NameAndAddress
            newListing={editListing}
            setNewListing={setEditListing}
            onPageChange={handleCurrentPageChange}
          />
        );
      case "property-media":
        return (
          <PropertyMedia
            newListing={editListing}
            setNewListing={setEditListing}
            onPageChange={handleCurrentPageChange}
          />
        );
      case "property-document":
        return (
          <PropertyDocument
            newListing={editListing}
            setNewListing={setEditListing}
            onPageChange={handleCurrentPageChange}
          />
        );
      case "property-details":
        return (
          <PropertyDetails
            newListing={editListing}
            setNewListing={setEditListing}
            onPageChange={handleCurrentPageChange}
          />
        );
      case "property-fees":
        return (
          <PropertyFees
            newListing={editListing}
            setNewListing={setEditListing}
            onPageChange={handleCurrentPageChange}
          />
        );
      default:
        return (
          <MainAddListing
            newListing={editListing}
            setNewListing={setEditListing}
            onPageChange={handleCurrentPageChange}
          />
        );
    }
  };
  return (
    <Box px={{ xs: "16px", sm: "24px" }} pr="80px" maxWidth="723px" pb="40px">
      <Box display="flex" alignItems="center" gap="10px" mb="56px">
        <Box
          p="10px"
          bgcolor="#F6F7F8"
          borderRadius="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ transform: "scaleX(-1)", cursor: "pointer" }}
          onClick={() => {
            currentPage === "main"
              ? navigate(-1)
              : handleCurrentPageChange("main");
          }}
        >
          <ArrowRight fill="black" />
        </Box>
        {/* <Typography fontSize={20} fontWeight={600} color={colors.textBody}>
            Back
          </Typography> */}
        <Breadcrumbs
          url={
            currentPage === "main"
              ? location.pathname
              : location.pathname + `/${currentPage}`
          }
        />
      </Box>
      {CurrentPage()}
    </Box>
  );
};

export default EditListing;
