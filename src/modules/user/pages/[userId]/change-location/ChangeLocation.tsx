import { LockOutlined } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";
import Input from "@src/modules/property/pages/AddNewListing/components/Input";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const ChangeLocation = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const { getLocations, updateLocations } = UserService();
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    async function fetchLocation() {
      const response = await getLocations();
      if (response.success) {
        const all_locations = (
          response.data as { city: string; country: string }[]
        ).map((d) => d.city || d.country);
        setLocations(all_locations as string[]);
      }
    }
    fetchLocation();
  }, []);

  async function handleUpdateLocation() {
    if (!selected) {
      alert("Please select a location to continue");
    } else {
      const response = await updateLocations(params?.userId || "", selected);

      if (response.success) {
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
        <Input
          value={selected || "Select Location"}
          onSelect={(v) => {
            setSelected(v);
          }}
          placeholder="Enter Location"
          select
          multichoice
          selected={selected.toLowerCase().split(" ").join("-")}
          options={locations}
          startIcon={<LockOutlined sx={{ color: theme.palette.grey[500] }} />}
        />

        <Box
          component="button"
          onClick={handleUpdateLocation}
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "100px",
            background: selected
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
