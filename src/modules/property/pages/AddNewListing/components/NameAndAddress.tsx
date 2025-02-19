import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { INewListing } from "../type";
import { colors } from "@src/shared/constants/constants";
import Input from "./Input";
import CustomSwitch from "./CustomSwitch";
import CustomButton from "./Button";
import { DateInput } from "./DateInput";

const NameAndAddress = ({
  onPageChange,
  newListing,
  setNewListing,
}: {
  onPageChange: (x: string) => void;
  newListing: INewListing;
  setNewListing: (prev: any) => void;
}) => {
  // const [propertyName, setPropertyName] = useState("");
  // const [propertyDescription, setPropertyDescription] = useState("");
  // const [propertyLocation, setPropertyLocation] = useState("");
  // const [liveHere, setLiveHere] = useState(false);
  const [enterAddress, setEnterAddress] = useState(true);

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap="12px" mb="24px">
        <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
          Property Name
        </Typography>
        <Input
          placeholder="Property name"
          value={newListing.title}
          onChange={(e) =>
            setNewListing((prev: INewListing) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </Box>
      <Box display="flex" flexDirection="column" gap="12px" mb="24px">
        <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
          Property Description
        </Typography>
        <Input
          placeholder="Property description"
          value={newListing.description}
          onChange={(e) =>
            setNewListing((prev: INewListing) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </Box>
      <Box display="flex" flexDirection="column" gap="12px" mb="24px">
        <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
          Where is your property located?
        </Typography>
        {enterAddress ? (
          <Box display="flex" flexDirection="column" gap="12px">
            <Input
              placeholder="Country"
              select
              options={["USA", "Nigeria"]}
              value={newListing.location.country}
              onSelect={(e) => {
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  location: { ...prev.location, country: e.target.value },
                }));
              }}
            />
            <Input
              placeholder="State"
              select
              options={["New York", "Lagos"]}
              value={"Lagos"}
              onSelect={() => {}}
            />
            <Input
              placeholder="City"
              value={newListing.location.city}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  location: { ...prev.location, city: e.target.value },
                }))
              }
            />
            <Input
              placeholder="Nearest Landmark"
              value={newListing.location.nearestLandmark}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    nearestLandmark: e.target.value,
                  },
                }))
              }
            />
            <Input
              placeholder="Street Name"
              value={newListing.location.streetName}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  location: { ...prev.location, streetName: e.target.value },
                }))
              }
            />
            <Input
              placeholder="Property Number"
              type="number"
              value={String(newListing.location.propertyNumber)}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    propertyNumber: e.target.value,
                  },
                }))
              }
            />
          </Box>
        ) : (
          <Input
            placeholder="Property location"
            select
            options={["Lagos", "Abuja"]}
            value={newListing.address}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({ ...prev, address: e }));
            }}
          />
        )}
        <Typography
          fontSize={16}
          fontWeight={600}
          color={colors.textSubtitle}
          onClick={() => setEnterAddress(!enterAddress)}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {enterAddress ? "Choose from map" : "Enter address manually"}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="12px" mb="48px">
        <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
          When was this property built?
        </Typography>
        <Box display="flex" alignItems="center" gap="12px">
          <DateInput
            label="Month"
            type="month"
            onChange={(e) =>
              setNewListing((prev: INewListing) => ({
                ...prev,
                builtMonth: (
                  e?.target as HTMLInputElement
                )?.value.toLowerCase(),
              }))
            }
          />
          <DateInput
            label="Year"
            type="year"
            onChange={(e) =>
              setNewListing((prev: INewListing) => ({
                ...prev,
                builtYear: Number((e?.target as HTMLInputElement)?.value),
              }))
            }
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize={16} color={colors.textTitle}>
            Tenant is a user on Rentrix
          </Typography>
          <CustomSwitch
            value={newListing.currentlyLivedIn}
            onChange={() => {
              // setLiveHere(e)
              setNewListing((prev: INewListing) => ({
                ...prev,
                currentlyLivedIn: !newListing.currentlyLivedIn,
              }));
            }}
            // onChange={setLiveHere}
          />
        </Box>
      </Box>
      <CustomButton
        variant="contained"
        buttonStyles={{ bgcolor: colors.primary, color: colors.light }}
        onClick={() => onPageChange("main")}
      >
        Save
      </CustomButton>
    </Box>
  );
};

export default NameAndAddress;
