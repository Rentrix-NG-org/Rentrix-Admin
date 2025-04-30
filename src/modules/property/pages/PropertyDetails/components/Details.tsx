import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import naira from "../assets/naira.svg";
import bookmark from "../assets/bookmark.svg";
import menu from "../assets/menu.svg";
import location from "../assets/location.svg";
import apartment from "../assets/apartment.svg";
import right from "../assets/chevron-right.svg";
import { IListing, PropertyType, User } from "@src/modules/property/types";
import { UserService } from "@src/modules/user/services/user.service";
import { useNavigate } from "react-router";
import { icons } from "@src/utils/icons";

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
    applications: [],
    furnishedType: "",
    servicing: "",
    propertyAge: "",
    lotSize: 0,
    floorArea: 0,
    builtYear: 0,
    builtMonth: "",
    status: "under-offer" as const,
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
    } as User,
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
  const { getUserRep, changeRepresentative } = UserService();
  const navigate = useNavigate();
  const [showInspection, setShowInspectiion] = useState(false);
  const [repId, setRepId] = useState("");
  const [repDetails, setRepDetails] = useState<User>();
  const [isRepLoading, setIsRepLoading] = useState(false);
  const [applicants, setApplicants] = useState([
    // {
    //   fullName: "Jerome Bell",
    //   photoUrl: "",
    //   id: "12345",
    //   inspectionDate: "Thursday 7th May",
    //   inspectionTime: "07:00 - 07:20 AM",
    // },
  ]);
  const [imageLoadingStatus, setImageLoadingStatus] = useState<
    "notset" | "success" | "error" | "pending"
  >("notset");
  const [isChangeRepModalOpen, setIsChangeRepModalOpen] = useState(false);
  const informations = [
    {
      title: "Landlord Information",
      values: {
        avatar: listing?.owner?.photoUrl,
        fullName: listing?.owner?.firstName + " " + listing?.owner?.lastName,
        email: listing?.owner?.account?.email,
        userId: listing?.owner?.id,
      },
      action: null,
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
      action: null,
    },
    {
      title: "Rentrix Rep's Information",
      values: {
        avatar: listing.representative.photoUrl,
        fullName:
          listing.representative.firstName +
          " " +
          listing.representative.lastName,
        email: listing.representative.account.email,
        userId: listing.representative.id,
      },
      action: {
        title: "Change Rentrix Rep",
        onClick: () => {
          setIsChangeRepModalOpen(!isChangeRepModalOpen);
        },
      },
    },
  ];

  useEffect(() => {
    console.log(listing.applications, "cool");
    const formatted = listing.applications.map((application) => {
      const applicant = application.applicant;
      return {
        id: applicant.id,
        photoUrl: applicant.photoUrl,
        fullName: `${applicant.firstName} ${applicant.lastName}`,
      };
    });
    setApplicants(formatted as any[]);
  }, [listing.applications]);

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

  async function handleFetchRepDetails(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (isNaN(Number(value)) || value.includes("e")) return;
    setRepId(value);
    if (value.trim().length === 9) {
      e.target.disabled = true;
      try {
        setIsRepLoading(true);
        const response = await getUserRep(value);
        if (response.success) {
          setIsRepLoading(false);

          e.target.disabled = false;
          setRepDetails(response.data);
        } else {
          setIsRepLoading(false);

          setIsRepLoading(false);
          e.target.disabled = false;
          alert(response.message || "Could not get rentrix rep");
        }
      } catch (error) {
        setIsRepLoading(false);
        setRepDetails(null);
        e.target.disabled = false;
        alert(
          error.response.data.message ||
            "An error occurred while fetching the rep details",
        );
      }
    } else {
      setRepDetails(null);
    }
  }

  async function handleChangeRep() {
    const response = await changeRepresentative(repId, listing.id);
    if (response.success) {
      setRepDetails(response.data);
      navigate(0);
    } else {
      alert(response.message || "Could not change representative");
    }
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
        ({ title, values: { avatar, fullName, email, userId }, action }) => (
          <Box>
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
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                gap: "8px",
                background: "#e6f6f6",
                border: "2px solid #c7ebeb",
                borderRadius: "12px",
                padding: "12px",
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: 0,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
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
              {action && (
                <div style={{ position: "relative" }}>
                  <Box
                    component="button"
                    onClick={action.onClick}
                    sx={{
                      padding: "16px",
                      height: "36px",
                      background: "none",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      border: "1px solid #9fa6b2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 100,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#9fa6b2",
                        fontWeight: 600,
                      }}
                    >
                      {action.title}
                    </Typography>
                  </Box>
                  {isChangeRepModalOpen && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        top: 56,
                        left: -12,
                        background: "#c2ccd8",
                        padding: "12px",
                        width: "100%",
                        borderRadius: "8px",
                        gap: "12px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#48505e",
                          fontSize: 19,
                          fontWeight: 400,
                        }}
                      >
                        Change Rentrix Rep
                      </Typography>
                      <Box
                        component="input"
                        type="number"
                        value={repId}
                        onChange={handleFetchRepDetails}
                        placeholder="Rentrix Rep ID"
                        sx={{
                          padding: "12px",
                          outline: "none",
                          background: "#f6f7f8",
                          border: "none",
                          color: "#828b9b",
                          borderRadius: "8px",
                          "&::placeholder": {
                            color: "#9fa6b2",
                          },
                        }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {repDetails && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <Box
                              sx={{
                                width: "50px",

                                height: "50px",
                                background: "white",
                                borderRadius: "50%",
                                overflow: "hidden",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={
                                  repDetails.photoUrl ||
                                  "https://ui-avatars.com/api/?name=Cal+Newton&background=random"
                                }
                                style={{
                                  objectFit: "contain",
                                }}
                                alt=""
                              />
                            </Box>

                            <Box>
                              <Typography
                                sx={{ color: "#48505e", fontWeight: 600 }}
                              >
                                {repDetails.firstName} {repDetails.lastName}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#828b9b",
                                }}
                              >
                                {repDetails.id}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        <Button
                          disabled={isRepLoading}
                          onClick={handleChangeRep}
                          sx={{
                            textTransform: "unset",
                            borderRadius: 100,
                            width: "120px",
                            ml: "auto",
                            border: "1px solid #00a3a3",
                            fontWeight: 600,
                          }}
                        >
                          {isRepLoading ? "Loading..." : "Proceed"}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </div>
              )}
            </Box>
          </Box>
        ),
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Typography sx={{ color: "#2e333c", fontWeight: 600 }}>
          Property Applicants
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {applicants.map((applicant) => (
            <Applicant {...applicant} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const Applicant = ({
  fullName,
  photoUrl,
  id,
  inspectionDate,
  inspectionTime,
}) => {
  return (
    <Box
      sx={{
        background: "#f0f1f3",
        display: "flex",
        gap: "12px",
        padding: "16px",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          background: "#00a3a3",
          borderRadius: "50%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 24,
          fontWeight: 700,
          color: "white",
        }}
      >
        {photoUrl ? (
          <Avatar src={photoUrl} sx={{ width: "100%", height: "100%" }} />
        ) : fullName ? (
          fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
        ) : (
          ""
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography
          sx={{ fontSize: "19px", color: "#48505e", fontWeight: 600 }}
        >
          {fullName}
        </Typography>
        <Typography sx={{ fontSize: "16px", color: "#48505e" }}>
          {id}
        </Typography>
      </Box>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            color: "#828b9b",
            textAlign: "right",
          }}
        >
          {inspectionDate}
        </Typography>
        <Typography
          sx={{
            color: "#2e333c",
            fontWeight: 600,
            fontSize: "19px",
            display: "flex",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={icons.clock}
            alt=""
            sx={{
              width: "20px",
              height: "20px",
            }}
          />
          <span>{inspectionTime}</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Details;
