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
    name: "",
    description: "",
    builtMonth: "may",
    builtYear: "",
    currentlyLivedIn: false,
    hasManualAddress: false,
    address: "",
    country: "Nigeria",
    city: "",
    lga: "",
    nearestLandMark: "",
    streetName: "",
    propertyNumber: "",
    media: [],
    category: "residential",
    state: "",
    type: "",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpace: 0,
    rentalPeriod: "",
    fee: 0,
    furnishedType: "",
    propertyAge: "",
    lotSize: undefined,
    floorArea: undefined,
    floorLevel: "",
    servicing: "",
    interiorFeatures: [],
    exteriorFeatures: [],
    buildingAmenities: [],
    facilities: [],
    kitchenFittings: [],
    wifiAccess: "",

    interiorFlooring: "",
    exteriorFlooring: "",
    platformFee: 0,
    legalFee: 0,
    serviceFee: 0,
    cautionFee: 0,
    estateFee: 0,
    otherFees: [],
    representativeId: "",
    caretakerId: "",
    propertystatus: "",
    tenant: "",
    tenants: [],
    currency: "NGN",
    dueDayOfPeriod: 14,
    isProrated: true,
    tenantOtherFeesTotal: 0,
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
        const mediaItems = response.data.media || [];
        // const documents = mediaItems.filter(
        //   (item) => item.purpose === "PROPERTY_DOCUMENT"
        // );
        const otherMedia = mediaItems.map((x) => ({ ...x, name: x.title }));
        setEditListing({
          ...response.data,
          name: response.data.title || "",
          description: response.data.description || "",
          builtMonth: response.data.builtMonth || "",
          builtYear: response.data.builtYear || "",
          currentlyLivedIn: response.data.currentlyLivedIn || false,

          // Address
          hasManualAddress: true,
          state: response.data.location?.state || "",
          country: response.data.location?.country || "",
          city: response.data.location?.city?.name || "",
          nearestLandmark: response.data.location?.nearestLandmark || "",
          streetName: response.data.location?.streetName || "",
          propertyNumber: response.data.location?.propertyNumber || "",

          // Property Details
          category: response.data.category || "residential",
          type: response.data.type || "",
          bedrooms: response.data.bedrooms || 0,
          bathrooms: response.data.bathrooms || 0,
          toilets: response.data.toilets || 0,
          parkingSpace: response.data.parkingSpace || 0,
          rentalPeriod: response.data.fee.rentalPeriod || "monthly",
          fee: parseFloat(response.data.fee.fee) || 0,
          furnishedType: response.data.furnishedType || "",
          propertyAge: response.data.propertyAge || "",
          lotSize: response.data.lotSize || 0,
          floorArea: response.data.floorArea || 0,
          floorLevel: response.data.floorLevel || "N/A",
          servicing: response.data.servicing || "",
          interiorFeatures: response.data.interiorFeatures || [],
          exteriorFeatures: response.data.exteriorFeatures || [],
          buildingAmenities: response.data.amenities || [],
          kitchenFittings: response.data.kitchenFittings || [],
          facilities: response.data.facilities || [],
          interiorFlooring: response.data.interiorFlooring || "",
          exteriorFlooring: response.data.exteriorFlooring || "",
          wifiAccess: response.data.wifiAccess || "",

          // Fees
          platformFee: 0,
          legalFee: parseFloat(response.data.fee.legalFee) || 0,
          serviceFee: parseFloat(response.data.fee.serviceFee) || 0,
          cautionFee: parseFloat(response.data.fee.cautionFee) || 0,
          estateFee: parseFloat(response.data.fee.estateFee) || 0,
          otherFees: response.data.fee.otherFees || [],

          // Media
          media: otherMedia,
          // document: documents,

          // Additional Info
          representativeId: response.data.representative.id || "",
          caretakerId: response.data.representativeId || "",
          propertystatus: response.data.availabilityStatus || "AVAILABLE",
          propertyState: response.data.propertyState,
          isDraft: response.data.isDraft || false,
          currency: response.data.fee.priceCurrency || "NGN",
          tenants: response.data.tenants,
          tenant: response.data.tenant,

          // Lease information
          dueDayOfPeriod: response.data.dueDayOfPeriod || 14,
          isProrated:
            response.data.isProrated !== undefined
              ? response.data.isProrated
              : true,
          tenantOtherFeesTotal: response.data.tenantOtherFeesTotal || 0,
        });
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
