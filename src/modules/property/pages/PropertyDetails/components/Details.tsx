import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import naira from "../assets/naira.svg";
import bookmark from "../assets/bookmark.svg";
import menu from "../assets/menu.svg";
import location from "../assets/location.svg";
import apartment from "../assets/apartment.svg";
import right from "../assets/chevron-right.svg";
import { IListing, PropertyType } from "@src/modules/property/types";

export const formatNumber = (num: number): string => {
  if (num < 100000) {
    return num.toLocaleString();
  }

  if (num < 1000000) {
    const thousands = (num / 1000).toFixed(2);
    return `${thousands}K`;
  }

  const millions = Math.floor(num / 1000000);
  return `${millions.toLocaleString()}M`;
};

export const ConstructAddress = (listing: IListing) => {
  if (!listing || !listing?.location) return "";
  if (listing.location.address) {
    return listing.location.address;
  }

  const { propertyNumber, streetName, nearestLandmark, city } =
    listing.location;
  let address = "";

  if (propertyNumber) {
    address += `${propertyNumber} `;
  }

  if (streetName) {
    address += `${streetName}`;
  }

  if (nearestLandmark) {
    address += ` near ${nearestLandmark}`;
  }

  if (city) {
    address += `, ${city.name}`;

    if (city.country) {
      address += `, ${city.country.name}.`;
    }
  }

  return address.trim();
};

const Details = ({
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
    status: "under-offer",
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
    representative: {
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
    tenants: [],
    media: [],
  },
}: {
  listing?: IListing;
}) => {
  const [showInspection, setShowInspectiion] = useState(false);
  const [imageLoadingStatus, setImageLoadingStatus] = useState<
    "notset" | "success" | "error" | "pending"
  >("notset");
  console.log(listing, "list");
  const informations = [
    {
      title: "Landlord Information",
      values: {
        avatar: listing?.owner?.photoUrl,
        fullName: listing?.owner?.firstName + " " + listing?.owner?.lastName,
        email: listing?.owner?.account?.email,
        userId: listing?.owner?.id,
      },
    },
    {
      title: "Tenant Information",
      values: {
        avatar:
          listing.tenants && listing.tenants[0]
            ? listing.tenants[0].photoUrl
            : undefined,
        fullName:
          listing.tenants && listing.tenants[0]
            ? listing.tenants[0].firstName + " " + listing.tenants[0].lastName
            : "",
        email:
          listing.tenants && listing.tenants[0] && listing.tenants[0].account
            ? listing.tenants[0].account.email
            : "",
        userId:
          listing.tenants && listing.tenants[0] ? listing.tenants[0].id : "",
      },
    },
    {
      title: "Rentrix Rep Information",
      values: {
        avatar: listing.representative.photoUrl,
        fullName:
          listing.representative.firstName +
          " " +
          listing.representative.lastName,
        email: listing.representative.account.email,
        userId: listing.representative.id,
      },
    },
  ];

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

  function handleBookInspection() {
    setShowInspectiion(!showInspection);
  }

  return (
    <Box
      width="100%"
      // minWidth={{xs: '100px', sm: '303px'}}
      sx={{
        marginBottom: "auto",
        padding: { xs: 0, sm: "8px 19px" },
        paddingBottom: "100px",
        display: "flex",
        flexDirection: "column",
        gap: "34px",
        background: { xs: "transparent", sm: "#f5fbfb" },
        // flex: 0.35,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={naira} alt="naira symbol" />
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "28px",
            }}
          >
            {formatNumber(Number(listing?.fee?.fee ?? 0))}{" "}
            <Typography
              component="span"
              sx={{
                color: "#9fa6b2",
                fontSize: "14px",
              }}
            >
              /year
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button sx={{ all: "unset", cursor: "pointer" }}>
            <img src={bookmark} alt="bookmark" style={{ width: "20px" }} />
          </Button>
          <Button sx={{ all: "unset", cursor: "pointer" }}>
            <img src={menu} alt="menu" style={{ width: "20px" }} />
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Typography
          sx={{
            color: "#2e333c",
            fontSize: "19px",
            fontWeight: 600,
            lineHeight: "140%",
            letterSpacing: "-0.38px",
          }}
        >
          {listing?.title}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "#828b9b",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        >
          <img src={location} alt="location" />
          {ConstructAddress(listing as IListing)}
        </Typography>
      </Box>

      <Box
        sx={{
          padding: "12px 0",
          border: "1px solid #dadde2",
          borderLeft: "none",
          borderRight: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "100%",
            letterSpacing: "-0.28px",
            color: "#48505e",
          }}
        >
          <img src={apartment} alt="" />
          <Typography>
            {listing &&
              listing?.propertyType?.charAt(0).toUpperCase() +
                listing?.propertyType?.slice(1)}
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#828b9b",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        >
          ID:{" "}
          <Box component="b" sx={{ color: "#48505e" }}>
            {listing?.id}
          </Box>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
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
          Property Description
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "140%",
            letterSpacing: "-0.32px",
          }}
        >
          {listing?.description}
        </Typography>

        <Button
          onClick={handleBookInspection}
          sx={{
            background: "#dadde2",
            color: "#48505e",
            border: "none",
            marginTop: "16px",
            padding: "16px",
            borderRadius: "100px",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "140%",
            letterSpacing: "-0.28px",
            textTransform: "none",
          }}
        >
          Book Inspection
        </Button>

        {/* {showInspection && (
          <InspectionModal handleShowInspection={handleBookInspection} />
        )} */}
      </Box>

      {informations.map(
        ({ title, values: { avatar, fullName, email, userId } }) => (
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
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
              {title}
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
                <Avatar src={avatar || ""} sx={{ width: 48, height: 48 }} />
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
                  color: "#828b9b",
                  gap: "4px",
                  alignItems: "flex-start",
                  width: "100%",
                  paddingX: "8px",
                  paddingRight: "12px",
                }}
              >
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
                    {fullName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "140%",
                      letterSpacing: "-0.28px",
                    }}
                  >
                    {email}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    ml: "auto",
                  }}
                >
                  {userId}
                </Typography>
              </Box>
              <img
                style={{ marginLeft: "auto", transform: "scale(1.2)" }}
                src={right}
                alt=""
              />
            </Button>
          </Box>
        ),
      )}
    </Box>
  );
};

export default Details;
