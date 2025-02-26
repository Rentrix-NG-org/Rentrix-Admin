import { Box, useTheme } from "@mui/material";
import UserNav from "../../components/UserNav";
import Input from "@src/modules/property/pages/AddNewListing/components/Input";
import { MailOutline } from "@mui/icons-material";
import { useState } from "react";
import { UserService } from "../../services/user.service";
import { useNavigate } from "react-router";

const AddRentrixRep = () => {
  const theme = useTheme();
  const { upgradeToRep } = UserService();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const navigate = useNavigate();

  async function handleUpgrade() {
    const response = await upgradeToRep(email);

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
        <Input
          value={email}
          onChange={(e) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            setValidEmail(emailRegex.test(e.target.value));
            setEmail(e.target.value);
          }}
          placeholder="Enter email address"
          startIcon={<MailOutline sx={{ color: theme.palette.grey[500] }} />}
        />

        <Box
          component="button"
          onClick={() => {
            if (!validEmail) return;
            handleUpgrade();
          }}
          sx={{
            display: "flex",
            width: "100%",
            borderRadius: "100px",
            background: validEmail
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
          Upgrade
        </Box>
      </Box>
    </Box>
  );
};
export default AddRentrixRep;
