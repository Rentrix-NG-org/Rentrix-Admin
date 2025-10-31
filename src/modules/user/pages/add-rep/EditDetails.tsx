import { Box, MenuItem, Typography, useTheme } from "@mui/material";
import UserNav from "../../components/UserNav";
import Input from "@src/modules/property/pages/AddNewListing/components/Input";
import { useEffect, useState } from "react";
import { UserService } from "../../services/user.service";
import { useNavigate } from "react-router";
import RepCard from "../../components/RepCard";
import { useParams } from "react-router";
import { LocationOnOutlined } from "@mui/icons-material";
import Modal from "@src/shared/components/Modal";
import Checked from "@src/modules/property/pages/AddNewListing/assets/Checked";
import EmptyCheckbox from "@src/modules/property/pages/AddNewListing/assets/EmptyCheckbox";

const EditDetails = () => {
  const theme = useTheme();
  const { upgradeToRep } = UserService();
  const [user, setUser] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    account: { email: string };
    phoneNumber: string;
    photoUrl: string;
    dateOfBirth: string;
    location: string;
    status: string;
  }>({
    id: "",
    firstName: "",
    lastName: "",
    account: { email: "" },
    phoneNumber: "",
    photoUrl: "",
    dateOfBirth: "",
    location: "",
    status: "",
  });
  const { getUser, getLgas, getCitites, getStates, getAssignedLocations } =
    UserService();
  // const [location, setLocation] = useState([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLgas, setSelectedLgas] = useState([]);
  const [lgasToView, setLgasToView] = useState([]);
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [states, setStates] = useState<{ name: string }[] | []>([]);
  const [cities, setCiites] = useState<{ name: string; id: string }[] | []>([]);
  const [lgas, setLgas] = useState<{ name: string; id: string }[] | []>([]);

  const getAllStates = async () => {
    const res = await getStates();
    if (res.status === 200) {
      setStates(res.data);
    }
  };
  const getAllCitites = async () => {
    console.log(cityId)
    const res = await getCitites(stateId!);
    if (res.status === 200) {
      setCiites(res.data);
    }
  };
  const getAllLgas = async () => {
    let lgasData: any[] = [];
    for (let i = 0; i < cities.length; i++) {
      const res = await getLgas(cities[i].id);
      if (res.status === 200) {
        lgasData = [...lgasData, ...res.data];
        setLgas(lgasData);
      }
    }
  };
  useEffect(() => {
    getAllStates();
    if (selectedState) getAllCitites();
    if (cities.length > 0) getAllLgas();
  }, [selectedState, cities.length]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser(params?.userId || "");
      if (response.success) {
        setUser(response.data);
      }
    }
    fetchUser();
  }, [params?.userId]);

  useEffect(() => {
    async function fetchLocations() {
      const response = await getAssignedLocations(params?.userId!);

      if (response.data.success) {
        const data = response.data.data.locations as [
          { lga: { name: string | null } }
        ];
        setLocations(data.map((d) => d.lga.name));
      }
    }
    fetchLocations();
  }, []);

  // function handleLocationSelect(v: string) {
  //   setLocation((prev) => [...prev, v]);
  // }

  async function handleUpgrade() {
    const data = {
      email: user?.account.email,
      lgaIds: selectedLgas,
      maxListingsPerMonth: 50,
      commissionRate: 5,
      notes: "string",
    };
    const response = await upgradeToRep(data);

    if (response.success) {
      navigate("/users");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "42.82px",
        px: "20px",
        gap: "25px",
        maxWidth: 656,
      }}
    >
      <UserNav routes={["User Management", "Add New Users", "Rentrix Rep"]} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <RepCard
          id={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.account.email}
          photoUrl={user.photoUrl}
          phoneNumber={user.phoneNumber}
          dateOfBirth={user.dateOfBirth}
          location={
            locations.join(", ").length > 25
              ? locations.join(", ").slice(0, 25) + "..."
              : locations.join(", ")
          }
          status={user.status}
        />

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
            startIcon={<LocationOnOutlined />}
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
            startIcon={<LocationOnOutlined />}
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
            startIcon={<LocationOnOutlined />}
          />
        </Box>
        <Box
          component="button"
          onClick={() => {
            if (selectedLgas.length > 0) {
              setShowModal(true);
            }
          }}
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "100px",
            background:
              selectedLgas.length > 0
                ? theme.palette.secondary.main
                : theme.palette.grey[400],
            // background: theme.palette.grey[400],
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
          Upgrade
        </Box>
        {showModal && (
          <Modal
            onCancel={() => {
              setShowModal(false);
            }}
            onConfirm={() => {
              handleUpgrade();
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 19 }}>
              Are you sure you want to{" "}
              <b
                style={{ color: theme.palette.secondary.main, fontWeight: 500 }}
              >
                Upgrade
              </b>
              &nbsp;this Rentrix Rep
            </Typography>
          </Modal>
        )}
      </Box>
    </Box>
  );
};
export default EditDetails;
