import { Box, Typography, useTheme } from "@mui/material";
import UserNav from "../../components/UserNav";
import Input from "@src/modules/property/pages/AddNewListing/components/Input";
import { useEffect, useState } from "react";
import { UserService } from "../../services/user.service";
import { useNavigate } from "react-router";
import RepCard from "../../components/RepCard";
import { useParams } from "react-router";
import { LocationOnOutlined } from "@mui/icons-material";
import Modal from "@src/shared/components/Modal";

const EditDetails = () => {
  const theme = useTheme();
  const { upgradeToRep, getLocations } = UserService();
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
  const { getUser } = UserService();
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
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
      const response = await getLocations();

      if (response.success) {
        const data = response.data as [
          { city: string | null; country: string | null },
        ];
        setLocations(data.map((d) => d.city || d.country));
      }
    }
    fetchLocations();
  }, []);

  function handleLocationSelect(v: string) {
    setLocation(v);
  }

  async function handleUpgrade() {
    const response = await upgradeToRep(user?.account.email, location);

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

        <Input
          value={location || "Select Location"}
          // selected={permissions.map((p) => p?.split(" ").join("-"))}
          optionsStyles={{
            flexDirection: "row-reverse",
            justifyContent: "flex-end",
            gap: 2,
          }}
          onSelect={(v) => {
            handleLocationSelect(v);
          }}
          label="Location"
          selected={location.toLowerCase().split(" ").join("-")}
          select
          startIcon={<LocationOnOutlined />}
          multichoice
          options={locations}
        />
        <Box
          component="button"
          onClick={() => {
            if (location) {
              setShowModal(true);
            }
          }}
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "100px",
            background: location
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
