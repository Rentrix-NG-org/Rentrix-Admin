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
  const { getUser, getLgas, getCitites, getStates } = UserService();
  // const [location, setLocation] = useState([]);
  // const [locations, setLocations] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLgas, setSelectedLgas] = useState([]);
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
    const res = await getCitites(selectedState);
    if (res.status === 200) {
      setCiites(res.data);
    }
  };
  const getAllLgas = async () => {
    const res = await getLgas(selectedCity);
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

  // useEffect(() => {
  //   async function fetchLocations() {
  //     const response = await getLocations();

  //     if (response.success) {
  //       const data = response.data as [
  //         { city: string | null; country: string | null },
  //       ];
  //       setLocations(data.map((d) => d.city || d.country));
  //     }
  //   }
  //   fetchLocations();
  // }, []);

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
          location={user.location}
          status={user.status}
        />

        <Box display="flex" flexDirection={"column"} gap="20px">
          <Input
            value={selectedState || "Select State"}
            onSelect={(v) => {
              setSelectedState(v);
              setSelectedCity('')
              setSelectedLgas([]);
              setLgasToView([]);
            }}
            placeholder="Enter State"
            select
            selected={selectedState}
            options={states?.map((state) => state.name) ?? []}
            startIcon={<LocationOnOutlined />}
          />
          <Input
            value={selectedCity || "Select City"}
            onSelect={(v) => {
              setSelectedCity(v);
              setSelectedLgas([])
              setLgasToView([])
            }}
            placeholder="Enter City"
            select
            selected={selectedCity}
            options={cities?.map((city) => city.name) ?? []}
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
