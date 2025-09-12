import { Box, Typography } from "@mui/material";
import { INewListing } from "../type";
import { useNavigate, useParams } from "react-router";
import ChevronArrowDown from "../assets/ChevronArrowDown";
import CheckCirclePending from "../assets/CheckCirclePending";
import CircleSuccess from "../assets/CircleSuccess";
import { colors } from "@src/shared/constants/constants";
import Input from "./Input";
import CustomButton from "./Button";
import { EditListingDetails } from "../../property.service";
import { useEffect, useState } from "react";

const MainAddListing = ({
  onPageChange,
  newListing,
  setNewListing,
}: {
  onPageChange: (x: string) => void;
  newListing: INewListing;
  setNewListing: (x: any) => void;
}) => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  // const { user, loading, setLoading, setStatusCode, setMessage } = useAuth();
  const [haveRentrixRep, setHaveRentrixRep] = useState("No");
  // const [rentrixRepId, setRentrixRepId] = useState("");
  // const [caretakerId, setCaretakerId] = useState("");
  // const [propertyStatus, setPropertyStatus] = useState("Rented");
  // const [tenantOnRentrix, setTenantOnRentrix] = useState(false);
  // const [tenantId, setTenantId] = useState("");

  const handleSaveListing = async () => {
    const response = await EditListingDetails(propertyId || "", newListing);

    if (response?.status === 200) {
      navigate(`/property-management/${propertyId}/view`);
    }
  };

  // const reset = () => {
  //   setNewListing(newListing);
  // };

  const isNameAndAddress =
    newListing.name &&
    newListing.description &&
    newListing.country &&
    newListing.city &&
    newListing.localGovernmentArea &&
    newListing.nearestLandMark &&
    newListing.streetName &&
    newListing.propertyNumber;

  const isPropertyMedia = newListing.media.find(
    (x) => x.purpose === "PROPERTY_SHOWCASE"
  );
  const isPropertyDocuments = newListing.media.find(
    (x) => x.purpose === "PROPERTY_DOCUMENT"
  );
  const isPropertyDetails =
    newListing.type &&
    newListing.category &&
    newListing.propertyAge &&
    newListing.rentalPeriod &&
    newListing.furnishedType &&
    newListing.servicing &&
    newListing.interiorFlooring &&
    newListing.exteriorFlooring &&
    (newListing.bedrooms || newListing.parkingSpace) &&
    newListing.bathrooms &&
    newListing.toilets &&
    newListing.fee &&
    newListing.floorLevel;

  const isPropertyFees =
    newListing.estateFee ||
    newListing.legalFee ||
    newListing.serviceFee ||
    newListing.cautionFee;

  const subNavs = [
    {
      title: "Name and Address",
      isCompleted: isNameAndAddress,
      onClick: () => onPageChange("name-and-address"),
    },
    {
      title: "Property Media",
      isCompleted: isPropertyMedia,
      onClick: () => onPageChange("property-media"),
      // onClick: isNameAndAddress
      //   ? () => onPageChange("property-media")
      //   : () => {
      //       setLoading(true);
      //       try {
      //         setMessage("Incomplete name and address field");
      //         setStatusCode(500);
      //         setLoading(false);
      //       } catch (e) {}
      //     },
    },
    {
      title: "Property Documents",
      isCompleted: isPropertyDocuments,
      onClick: () => onPageChange("property-document"),
    },
    {
      title: "Property Details",
      isCompleted: isPropertyDetails,
      onClick: () => onPageChange("property-details"),
      // onClick: isPropertyMedia
      //   ? () => onPageChange("property-details")
      //   : () => {
      //       setLoading(true);
      //       try {
      //         setMessage("Incomplete property media field");
      //         setStatusCode(500);
      //         setLoading(false);
      //       } catch (e) {}
      //     },
    },
    {
      title: "Property Fees",
      isCompleted: isPropertyFees,
      onClick: () => onPageChange("property-fees"),
      // onClick: isPropertyDetails
      //   ? () => onPageChange("property-fees")
      //   : () => {
      //       setLoading(true);
      //       try {
      //         setMessage("Incomplete property details field");
      //         setStatusCode(500);
      //         setLoading(false);
      //       } catch (e) {}
      //     },
    },
  ];

  useEffect(() => {
    if (newListing.representativeId) {
      setHaveRentrixRep("Yes");
    }
  }, [newListing.representativeId]);

  return (
    <Box>
      <Box mb="23px">
        <Typography
          fontSize={18}
          fontWeight={600}
          color={colors.textTitle}
          mb="24px"
        >
          Property Details
        </Typography>
        <Box display="flex" flexDirection="column" gap="24px">
          {subNavs.map((subNav) => (
            <Box
              py="14px"
              px="12px"
              borderRadius="8px"
              border={`1px solid ${colors.borderNeutral}`}
              bgcolor={colors.offWhite}
              display="flex"
              gap="12px"
              alignItems="center"
              onClick={() => subNav.onClick()}
              sx={{ cursor: "pointer" }}
            >
              {subNav.isCompleted ? <CircleSuccess /> : <CheckCirclePending />}
              <Typography fontSize={16} color={colors.textTitle} flex={1}>
                {subNav.title}
              </Typography>
              <Box sx={{ transform: "rotate(270deg)" }}>
                <ChevronArrowDown />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Box display="flex" flexDirection="column" gap="12px" mb="24px">
          <Typography
            fontSize={18}
            fontWeight={600}
            color={colors.textTitle}
            mb="24px"
          >
            Status Availability
          </Typography>
          <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
            Select status
          </Typography>
          <Input
            select
            options={["Rented", "Listed", "Under-Review"]}
            placeholder="Property status"
            value={newListing.propertystatus}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                status: e.toLowerCase(),
              }));
            }}
          />
        </Box>
        <Box>
          <Box display="flex" flexDirection="column" gap="12px" mb="24px">
            <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
              Do you have a preferred Rentrix Rep?
            </Typography>
            <Input
              select
              options={["Yes", "No"]}
              value={haveRentrixRep}
              onSelect={setHaveRentrixRep}
            />
            {haveRentrixRep === "Yes" ? (
              <Input
                placeholder="Rentrix Rep ID"
                endIcon={<CheckCirclePending />}
                value={newListing.representativeId}
                onChange={(e) => {
                  setNewListing((prev: INewListing) => ({
                    ...prev,
                    representativeId: e.target.value,
                  }));
                }}
              />
            ) : (
              <Box p="12px" borderRadius="8px" bgcolor="#C2CCD8">
                <Typography
                  fontSize={16}
                  fontWeight={400}
                  color={colors.textBody}
                  mb="7px"
                >
                  Assign Rentrix Rep.
                </Typography>
                <Box display="flex" alignItems="center" gap="12px">
                  <Input
                    placeholder="Rentrix Rep ID"
                    inputContainerStyles={{ bgcolor: colors.light }}
                    inputStyles={{ background: colors.light }}
                    value={newListing.representativeId}
                    onChange={(e) => {
                      setNewListing((prev: INewListing) => ({
                        ...prev,
                        representativeId: e.target.value,
                      }));
                    }}
                  />
                  <CustomButton
                    variant="outlined"
                    buttonStyles={{
                      width: "120px",
                      height: "32px",
                      borderRadius: "100px",
                      border: `1px solid ${colors.primary}`,
                      fontSize: 14,
                      color: colors.textBody,
                    }}
                  >
                    Assign
                  </CustomButton>
                </Box>
              </Box>
            )}
          </Box>
          {/* <Box display="flex" flexDirection="column" gap="12px" mb="24px">
            <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
              Do you want to add a caretaker to this property?
            </Typography>
            <Input
              select
              options={["Yes", "No"]}
              value={haveCaretaker}
              onSelect={sethaveCaretaker}
            />
            <Input
              placeholder="Caretaker ID"
              endIcon={<CheckCirclePending />}
              value={newListing.caretakerId}
              onChange={(e) => {
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  caretakerId: e.target.value,
                }));
              }}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="12px" mb="24px">
            <Typography
              fontSize={18}
              fontWeight={600}
              color={colors.textTitle}
              // mb="12px"
            >
              Do you consent to your caretaker being a super admin?
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography fontSize={16} color={colors.textTitle}>
                My caretaker is a super admin
              </Typography>
              <CustomSwitch value={isSuperAdmin} onChange={setIsSuperAdmin} />
            </Box>
          </Box> */}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="12px">
        <CustomButton
          variant="contained"
          buttonStyles={{
            bgcolor: colors.secondary,
            height: "48px",
            color: colors.light,
          }}
        >
          Cancel
        </CustomButton>
        <CustomButton
          variant="contained"
          buttonStyles={{
            bgcolor: colors.primary,
            height: "48px",
            color: colors.light,
          }}
          onClick={handleSaveListing}
        >
          Save
        </CustomButton>
      </Box>
    </Box>
  );
};

export default MainAddListing;

export const addComma = (value: string | number) => {
  const num =
    typeof value === "number"
      ? value
      : parseInt(value.replace(/\D/g, "") || "0");
  return num.toLocaleString();
};
