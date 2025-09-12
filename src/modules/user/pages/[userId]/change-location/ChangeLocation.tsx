import { LockOutlined } from "@mui/icons-material";
import { Box, MenuItem, useTheme } from "@mui/material";
import Checked from "@src/modules/property/pages/AddNewListing/assets/Checked";
import EmptyCheckbox from "@src/modules/property/pages/AddNewListing/assets/EmptyCheckbox";
import Input from "@src/modules/property/pages/AddNewListing/components/Input";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const ChangeLocation = () => {
  // const [locations, setLocations] = useState<string[]>([]);
  const { updateLocations, getCitites, getStates, getLgas, getLocations } =
    UserService();
  const { userId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLgas, setSelectedLgas] = useState([]);
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [lgasToView, setLgasToView] = useState([]);
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
    const res = await getCitites(stateId!);
    if (res.status === 200) {
      setCiites(res.data);
    }
  };
  const getAllLgas = async () => {
    const res = await getLgas(cityId!);
    if (res.status === 200) {
      setLgas(res.data);
    }
  };
  useEffect(() => {
    getAllStates();
    if (selectedState) getAllCitites();
    if (selectedCity) {
      getAllLgas();
    }
  }, [selectedState, selectedCity]);

  useEffect(() => {
    async function fetchLocation() {
      const response = await getLocations();
      if (response.success) {
        const all_locations = (
          response.data as { city: string; country: string }[]
        ).map((d) => d.city || d.country);
        // setLocations(all_locations as string[]);
      }
    }
    fetchLocation();
  }, []);

  async function handleUpdateLocation() {
    if (selectedLgas.length === 0) {
      alert("Please select a location to continue");
    } else {
      // const user = JSON.parse(localStorage.getItem("user") ?? "");
      const response = await updateLocations(userId || "", selectedLgas);

      if (!response.data?.errors) {
        navigate(-1);
      }
    }
  }
  return (
    <Box
      sx={{
        px: "20px",
        py: "42.82px",
        display: "flex",
        flexDirection: "column",
        gap: "32.5px",
        width: 800,
      }}
    >
      <UserNav
        routes={["User Management", "User Details", "Change Location"]}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "64px",
        }}
      >
        <Box display="flex" flexDirection={"column"} gap="20px">
          <Input
            value={selectedState || "Select State"}
            placeholder="Enter State"
            select
            selected={selectedState}
            options={states?.map((state) => state.name) ?? []}
            customRender={states?.map((state) => (
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => {
                  setSelectedState(state.name);
                  setStateId(state.id);
                  setSelectedCity("");
                  setSelectedLgas([]);
                  setLgasToView([]);
                }}
              >
                {state.name}
              </MenuItem>
            ))}
            startIcon={<LockOutlined sx={{ color: theme.palette.grey[500] }} />}
          />
          <Input
            value={selectedCity || "Select City"}
            placeholder="Enter City"
            select
            selected={selectedCity}
            options={cities?.map((city) => city.name) ?? []}
            customRender={cities?.map((city) => (
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => {
                  setSelectedCity(city.name);
                  setCityId(city.id);
                  setSelectedLgas([]);
                  setLgasToView([]);
                }}
              >
                {city.name}
              </MenuItem>
            ))}
            startIcon={<LockOutlined sx={{ color: theme.palette.grey[500] }} />}
          />
          <Input
            value={lgasToView?.join(", ") || "Select Location"}
            placeholder="Enter Location"
            select
            multichoice
            selected={selectedLgas?.map((x) => x)}
            options={lgas?.map((lga) => lga.name) ?? []}
            customRender={lgas?.map((lga) => (
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => {
                  setSelectedLgas((prev: any) =>
                    prev.includes(lga.id)
                      ? prev.filter((x) => x !== lga.id)
                      : [...prev, lga.id]
                  );
                  setLgasToView((prev: any) =>
                    prev.includes(lga.name)
                      ? prev.filter((x) => x !== lga.name)
                      : [...prev, lga.name]
                  );
                }}
              >
                {lga.name}
                {selectedLgas?.includes(lga.id) ? (
                  <Checked />
                ) : (
                  <EmptyCheckbox width="20px" height="20px" />
                )}
              </MenuItem>
            ))}
            startIcon={<LockOutlined sx={{ color: theme.palette.grey[500] }} />}
          />
        </Box>
        <Box
          component="button"
          onClick={handleUpdateLocation}
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "100px",
            background:
              selectedLgas.length > 0
                ? theme.palette.secondary.main
                : theme.palette.grey[400],
            height: "60px",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            alignSelf: "stretch",
            color: theme.palette.common.white,
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Save
        </Box>
      </Box>
    </Box>
  );
};
export default ChangeLocation;
