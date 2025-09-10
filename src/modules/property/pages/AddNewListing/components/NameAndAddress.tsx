import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { INewListing } from "../type";
import { colors } from "@src/shared/constants/constants";
import Input from "./Input";
import CustomSwitch from "./CustomSwitch";
import CustomButton from "./Button";
import { UserService } from "@src/modules/user/services/user.service";

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
   const { getCitites, getStates, getLgas } =
    UserService();
  const [states, setStates] = useState<{ name: string }[] | []>([]);
  const [cities, setCiites] = useState<{ name: string }[] | []>([]);
  const [lgas, setLgas] = useState<{ name: string; id: string }[] | []>([]);

  const getAllStates = async () => {
    const res = await getStates();
    if (res.status === 200) {
      setStates(res.data);
    }
  };
  const getAllCitites = async () => {
    const res = await getCitites(newListing.state);
    if (res.status === 200) {
      setCiites(res.data);
    }
  };
  const getAllLgas = async () => {
    const res = await getLgas(newListing.city);
    if (res.status === 200) {
      setLgas(res.data);
    }
  };
  useEffect(() => {
    getAllStates();
    if (newListing.state) getAllCitites();
    if (newListing.city) {
      getAllLgas();
    }
  }, [newListing.state, newListing.city]);
  const [enterAddress, setEnterAddress] = useState(true);

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap="12px" mb="24px">
        <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
          Property Name
        </Typography>
        <Input
          placeholder="Property name"
          value={newListing.name}
          onChange={(e) =>
            setNewListing((prev: INewListing) => ({
              ...prev,
              name: e.target.value,
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
              // select
              // options={["USA", "Nigeria"]}
              value={"Nigeria"}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              // onSelect={(e) => {
              //   setNewListing((prev: INewListing) => ({
              //     ...prev,
              //     country: e,
              //   }));
              // }}
            />
            <Input
              placeholder="State"
              select
              options={states?.map((state) => state.name) ?? []}
              value={newListing.state}
              onSelect={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  state: e,
                  city: "",
                  lga: "",
                }))
              }
            />
            <Input
              placeholder="City"
              select
              options={cities?.map((city) => city.name) ?? []}
              value={newListing.city}
              onSelect={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  city: e,
                  lga: "",
                }))
              }
            />
            <Input
              placeholder="LGA"
              select
              options={lgas?.map((lga) => lga.name) ?? []}
              value={newListing.lga}
              onSelect={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  lga: e,
                }))
              }
            />

            <Input
              placeholder="Street Name"
              value={newListing.streetName}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  streetName: e.target.value,
                }))
              }
            />
            <Input
              placeholder="Property Number"
              value={newListing.propertyNumber}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  propertyNumber: e.target.value,
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
        <Typography
          fontSize={18}
          fontWeight={600}
          color={colors.textTitle}
          mb="12px"
        >
          What is the nearest landmark to the property?
        </Typography>
        <Input
          placeholder="Nearest Landmark"
          value={newListing.nearestLandMark}
          onChange={(e) =>
            setNewListing((prev: INewListing) => ({
              ...prev,
              nearestLandMark: e.target.value,
            }))
          }
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography fontSize={16} color={colors.textTitle}>
            I currently live here
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
