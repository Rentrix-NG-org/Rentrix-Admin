import { Avatar, Box, Button, Typography } from "@mui/material";
import {
  ExteriorFeaturesLabel,
  FlooringTypesLabel,
  IListing,
  InteriorFeaturesLabel,
  KitchenFittingsLabel,
  PropertyType,
} from "@src/modules/property/types";
import bath from "../assets/bath.svg";
import bed from "../assets/bed.svg";
import car from "../assets/car.svg";
import house from "../assets/house.svg";
import sofa from "../assets/sofa.svg";
import toilet from "../assets/toilet.svg";
import wifi from "../assets/wifi.svg";
import map from "../assets/map.png";
import location from "../assets/location.svg";
import right from "../assets/chevron-right.svg";
import React, { useEffect, useState } from "react";
import { ConstructAddress, formatNumber } from "./Details";

const Features = ({
  listing = {
    id: "",
    createdAt: "",
    updatedAt: "",
    title: "",
    description: "",
    label: "",
    currentlyLivedIn: false,
    availabilityStatus: "",
    category: "",
    type: "",
    propertyType: PropertyType.Apartment,
    amenities: [""],
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpace: 0,
    interiorFeatures: [],
    exteriorFeatures: [],
    kitchenFittings: [],
    interiorFlooring: "",
    exteriorFlooring: "",
    furnishedType: "",
    servicing: "",
    propertyAge: "",
    lotSize: 0,
    floorArea: 0,
    builtYear: 0,
    builtMonth: "",
    floorLevel: 0,
    isDraft: false,
    fee: {
      fee: "",
      legalFee: "",
      serviceFee: "",
      cautionFee: "",
      estateFee: "",
      otherFees: [],
      rentalPeriod: "",
      priceCurrency: "",
    },
    location: {
      id: "",
      address: "",
      nearestLandmark: "",
      streetName: "",
      propertyNumber: 0,
      city: {
        name: "",
        country: {
          name: "",
        },
      },
    },
    owner: {
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      photoUrl: null,
      dateOfBirth: "",
      type: "",
      account: {
        id: "",
        email: "",
      },
    },
    media: [],
  },
}: {
  listing?: IListing;
}) => {
  const [imageLoadingStatus, setImageLoadingStatus] = useState<
    "notset" | "success" | "error" | "pending"
  >("notset");

  useEffect(() => {
    if (listing) {
      const img = new Image();
      img.src = listing?.owner?.photoUrl || "";

      img.onload = () => {
        setImageLoadingStatus("success");
      };

      img.onerror = () => {
        setImageLoadingStatus("error");
      };
    }
  }, []);
  const features = [
    { icon: sofa, name: listing?.furnishedType },
    {
      icon: bed,
      name: `${listing?.bedrooms} Bedroom${listing?.bedrooms > 1 ? "s" : ""}`,
    },
    {
      icon: toilet,
      name: `${listing?.toilets} Toilet${listing?.toilets > 1 ? "s" : ""}`,
    },
    { icon: bath, name: `0 Bath` },
    {
      icon: car,
      name: `${listing?.parkingSpace} Car${
        listing?.parkingSpace > 1 ? "s" : ""
      }`,
    },
    { icon: wifi, name: "WiFi" },
    { icon: house, name: `Built ${listing?.builtYear}` },
  ];

  const listingSize = [
    { title: "Lot Size", value: `${listing?.lotSize} Sq ft` },
    { title: "Floor Area", value: `${listing?.floorArea} Sq ft` },
    {
      title: "Floor Level",
      value: `${listing?.floorLevel}${
        listing?.floorLevel === 1
          ? "st"
          : listing?.floorLevel === 2
          ? "nd"
          : listing?.floorLevel === 3
          ? "rd"
          : "th"
      }`,
    },
    { title: "Built", value: `${listing?.builtYear}` },
  ];

  const fees = [
    {
      title: "Platform Fee",
      value: `${formatNumber(Number(listing?.fee?.serviceFee))}`,
    },
    {
      title: "Legal Fee",
      value: `${formatNumber(Number(listing?.fee?.legalFee))}`,
    },
    {
      title: "Service Fee",
      value: `${formatNumber(Number(listing?.fee?.serviceFee))}`,
    },
    {
      title: "Caution",
      value: `${formatNumber(Number(listing?.fee?.cautionFee))}`,
    },
    {
      title: "Estate",
      value: `${formatNumber(Number(listing?.fee?.estateFee))}`,
    },
  ];

  const interior = [
    ...listing?.interiorFeatures.map((l) => ({
      name: InteriorFeaturesLabel[l],
    })),
  ];

  const exterior = [
    ...listing?.exteriorFeatures.map((l) => ({
      name: ExteriorFeaturesLabel[l],
    })),
  ];

  const kitchenFittings = [
    ...listing?.kitchenFittings.map((kf) => ({
      name: KitchenFittingsLabel[kf],
    })),
  ];
  return (
    <Box
      pl="40px"
      //   maxWidth="730px"
      sx={{
        display: "flex",
        // flex: "0.65",
        flexDirection: "column",
        gap: "12px",
        // padding: "8px 19px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: { xs: 0, sm: "12px" },
          background: { xs: "transparent", sm: "#f5fbfb" },
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "140%",
            letterSpacing: "-0.36px",
          }}
        >
          Property Features
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {features?.map((feature) => (
            <FeatureBox
              icon={true}
              top={feature?.icon}
              bottom={feature?.name}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {listingSize?.map((size) => (
            <FeatureBox top={size?.title} bottom={size?.value} />
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
            }}
          >
            Fees Attached
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {fees?.map((fee) => (
              <FeatureBox top={fee?.title} bottom={fee?.value} />
            ))}
            {listing?.fee?.otherFees?.map((fee) => (
              <FeatureBox top={`${fee?.fee}`} bottom={fee?.name} />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            color: "#828b9b",
          }}
        >
          <Typography
            sx={{
              marginTop: "8px",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
            }}
          >
            Interior Features
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              maxWidth: "400px",
            }}
          >
            {interior?.map((interior) => (
              <Pill name={interior?.name} />
            ))}
          </Box>
        </Box>

        {/* Exterior Features */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            color: "#828b9b",
            marginTop: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
            }}
          >
            Exterior Features
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              maxWidth: "400px",
            }}
          >
            {exterior?.map((exterior) => (
              <Pill name={exterior?.name} />
            ))}
          </Box>
        </Box>

        {/* Kitchen Fittings */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            color: "#828b9b",
            marginTop: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
            }}
          >
            Kitchen Fittings
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              maxWidth: "400px",
            }}
          >
            {kitchenFittings?.map((fitting) => (
              <Pill name={fitting?.name} />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginTop: "8px",
          }}
        >
          <Typography sx={{ fontSize: "16px", color: "#828b9b" }}>
            Interior Flooring:{" "}
            <Box component="span" sx={{ color: "#2e333c" }}>
              {FlooringTypesLabel[listing?.interiorFlooring]}
            </Box>
          </Typography>

          <Typography sx={{ fontSize: "16px", color: "#828b9b" }}>
            Exterior Flooring:{" "}
            <Box component="span" sx={{ color: "#2e333c" }}>
              {FlooringTypesLabel[listing?.exteriorFlooring]}
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* Location Section */}
      <Box
        sx={{ display: "flex", flexDirection: "column", background: "white" }}
      >
        <Typography variant="h6">Location</Typography>
        <Typography sx={{ color: "#828b9b" }}>9.0778, 8.6775</Typography>
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "15px",
            maxWidth: "652px",
          }}
        >
          <img
            src={map}
            alt="map"
            style={{ width: "100%", transform: "scale(1.1)" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <img src={location} alt="" />
          <Typography>{ConstructAddress(listing)}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "0 8px",
        }}
      >
        <Typography sx={{ color: "#828b9b" }}>Landmark</Typography>
        <Landmark listing={listing as IListing} />
      </Box>

      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "140%",
            letterSpacing: "-0.32px",
          }}
        >
          Landlord Information
        </Typography>

        <Button
          sx={{
            display: "flex",
            alignItems: "center",
            border: "2px solid #c7ebeb",
            background: "#e6f6f6",
            padding: "12px",
            borderRadius: "12px",
            gap: "4px",
            textTransform: "none",
          }}
        >
          {imageLoadingStatus !== "error" ? (
            <Avatar
              src={listing?.owner?.photoUrl || ""}
              sx={{ width: 48, height: 48 }}
            />
          ) : (
            <Avatar
              sx={{
                background: "#00a3a3",
                width: 48,
                height: 48,
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              {listing?.owner?.firstName?.charAt(0)}
              {listing?.owner?.lastName?.charAt(0)}
            </Avatar>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "#828b9b",
              gap: "4px",
              alignItems: "flex-start",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "140%",
                letterSpacing: "-0.32px",
              }}
            >
              {listing?.owner?.firstName} {listing?.owner?.lastName}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "140%",
                letterSpacing: "-0.28px",
              }}
            >
              {listing?.owner?.account?.email}
            </Typography>
          </Box>
          <img
            style={{ marginLeft: "auto", transform: "scale(1.2)" }}
            src={right}
            alt=""
          />
        </Button>
      </Box>
    </Box>
  );
};

const FeatureBox = ({
  top,
  bottom,
  icon = false,
}: {
  top: string;
  bottom: string;
  icon?: boolean;
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #91d7d7",
        borderRight: "none",
        minWidth: "80px",
        height: "60px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
        justifyContent: "center",
        "&:last-child": {
          borderRight: "1px solid #91d7d7",
        },
      }}
    >
      {icon ? (
        <Box component="img" src={top} alt="" sx={{ width: "12px" }} />
      ) : (
        <Typography
          sx={{
            color: "#828b9b",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        >
          {top}
        </Typography>
      )}
      <Typography
        sx={{
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "100%",
          letterSpacing: "-0.28px",
        }}
      >
        {bottom}
      </Typography>
    </Box>
  );
};

const Pill = ({ name }: { name: string }) => {
  return (
    <Box
      sx={{
        background: "#f0f1f3",
        border: "1px solid #dadde2",
        width: "fit-content",
        padding: "2px 16px",
        borderRadius: "100px",
      }}
    >
      <Typography color="#2e333c">{name}</Typography>
    </Box>
  );
};
const Landmark = ({ listing }: { listing: IListing }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f6f7f8",
        borderRadius: "12px",
        maxWidth: "400px",
        gap: "4px",
        padding: "8px",
      }}
    >
      <Typography
        sx={{
          color: "#2E333C",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "140%",
          letterSpacing: "-0.28px",
        }}
      >
        {listing?.location?.nearestLandmark}
      </Typography>

      <Typography
        sx={{
          color: "#828b9b",
          fontSize: "12px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "120%",
          letterSpacing: "-0.24px",
        }}
      >
        Road
      </Typography>

      <Typography
        sx={{
          marginTop: "8px",
          color: "#2E333C",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "120%",
          letterSpacing: "-0.32px",
        }}
      >
        0 m
      </Typography>
    </Box>
  );
};

export default Features;
