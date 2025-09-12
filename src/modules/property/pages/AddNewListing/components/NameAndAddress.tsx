import { Autocomplete, Box, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { INewListing } from "../type";
import { colors, padding, radius, text } from "@src/shared/constants/constants";
import Input from "./Input";
import CustomSwitch from "./CustomSwitch";
import CustomButton from "./Button";
import { UserService } from "@src/modules/user/services/user.service";
import ChevronArrowDown from "../assets/ChevronArrowDown";

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
  const { getCitites, getStates, getLgas, getKeyAreas } = UserService();
  const [states, setStates] = useState<{ name: string; id: string }[] | []>([]);
  const [cities, setCiites] = useState<{ name: string; id: string }[] | []>([]);
  const [lgas, setLgas] = useState<{ name: string; id: string }[] | []>([]);
  const [keyAreas, setKeyAreas] = useState<{ name: string }[] | []>([]);

  const getAllStates = async () => {
    const res = await getStates();
    if (res.status === 200) {
      setStates(res.data);
    }
  };
  const getAllCitites = async () => {
    const res = await getCitites(newListing.stateId);
    if (res.status === 200) {
      setCiites(res.data);
    }
  };
  const getAllLgas = async () => {
    const res = await getLgas(newListing.cityId);
    if (res.status === 200) {
      setLgas(res.data);
    }
  };

  const getAllKeyAreas = async () => {
    const res = await getKeyAreas(newListing.localGovernmentArea);
    if (res.status === 200) {
      setKeyAreas(res.data);
    }
  };
  useEffect(() => {
    getAllStates();
    if (newListing.state) getAllCitites();
    if (newListing.city) {
      getAllLgas();
    }
    if (newListing.localGovernmentArea) {
      getAllKeyAreas();
    }
  }, [newListing.state, newListing.city, newListing.localGovernmentArea]);
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
              customRender={states?.map((state) => (
                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      state: state.name,
                      stateId: state.id,
                      city: "",
                      localGovernmentArea: "",
                    }));
                  }}
                >
                  {state.name}
                </MenuItem>
              ))}
            />
            <Input
              placeholder="City"
              select
              options={cities?.map((city) => city.name) ?? []}
              value={newListing.city}
              customRender={cities?.map((city) => (
                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      city: city.name,
                      cityId: city.id,
                      localGovernmentArea: "",
                    }));
                  }}
                >
                  {city.name}
                </MenuItem>
              ))}
            />
            <Input
              placeholder="local Government Area"
              select
              options={lgas?.map((lga) => lga.name) ?? []}
              value={newListing?.lga || ""}
              customRender={lgas?.map((lga) => (
                <MenuItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      localGovernmentArea: lga.id,
                      lga: lga.name,
                    }));
                  }}
                >
                  {lga.name}
                </MenuItem>
              ))}
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
            <Box display="flex" flexDirection="column" gap="12px">
              <Typography
                fontSize={18}
                fontWeight={600}
                color={colors.textTitle}
              >
                Select key area
              </Typography>
              <Autocomplete
                options={keyAreas?.map((area) => area.name)}
                value={newListing.keyArea || ""}
                freeSolo
                onChange={(_blank, newValue) => {
                  setNewListing((prev: INewListing) => ({
                    ...prev,
                    keyArea: newValue || "",
                  }));
                }}
                onInputChange={(_blank, inputValue, reason) => {
                  if (reason === "input") {
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      keyArea: inputValue,
                    }));
                  }
                }}
                renderInput={(params) => (
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Box
                      ref={params.InputProps.ref}
                      // component="div"
                      px={padding.mobile}
                      height="56px"
                      // py={{ xs: "14px", sm: "18px" }}
                      borderRadius={radius.mini}
                      bgcolor={colors.offWhite}
                      display="flex"
                      alignItems="center"
                      gap={{ xs: "12px", sm: "8px" }}
                      position="relative"
                      border={
                        params.InputProps.ref
                          ? `1px solid ${colors.secondary}`
                          : "none"
                      }
                    >
                      <input
                        type="text"
                        {...params.inputProps}
                        placeholder="Select an option"
                        style={{
                          // flex: 1,
                          width: "100%",
                          background: colors.offWhite,
                          border: "none",
                          fontSize: text.small,
                          color: colors.textTitle,
                          outline: "none",
                          height: "100%",
                        }}
                      />
                      {/* Dropdown arrow (optional) */}
                      <Box sx={{ cursor: "pointer" }}>
                        <Box
                          display={{ xs: "none", sm: "flex" }}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <ChevronArrowDown />
                        </Box>
                        <Box
                          display={{ xs: "flex", sm: "none" }}
                          alignItems={"center"}
                          justifyContent={"center"}
                        >
                          <ChevronArrowDown width="16px" height="16px" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              />
            </Box>
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
