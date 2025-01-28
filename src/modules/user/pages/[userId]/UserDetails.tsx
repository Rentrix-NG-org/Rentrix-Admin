import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import Profile from "../../components/Profile";
import PropertyListed from "../../components/PropertyListed";
import TransactionHistory from "../../components/TransactionHistory";
import ActivityLogs from "../../components/ActivityLogs";
import { UserService } from "../../services/user.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ListingType, TransactionType, User } from "../../types/user.types";

const UserDetails = () => {
  const { getUser } = UserService();
  const [user, setUser] = useState<Partial<User>>({});
  const params = useParams();
  console.log(params);

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser(params.userId || "0");
      console.log(response);
      if (response.success) {
        console.log(response.data);
        setUser(response.data);
      }
    }
    fetchUser();
  }, [params]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "42.82px",
        px: "20px",
        gap: "25px",
      }}
    >
      <Header />
      <Profile user={user} />
      <PropertyListed listings={user.listings as ListingType[]} />
      <TransactionHistory
        transactions={user.transactions?.slice(0, 4) as TransactionType[]}
      />
      <ActivityLogs />
    </Box>
  );
};

const Header = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Box
        component="button"
        sx={{
          border: "none",
          cursor: "pointer",
          width: 40,
          height: 40,
          background: theme.palette.grey[200],
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={icons.arrowback}
          sx={{ width: 20, height: 20 }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.palette.common.black,
          }}
        >
          User Management &gt;{" "}
          <span style={{ color: theme.palette.secondary.main }}>
            User Details
          </span>{" "}
        </Typography>
      </Box>
    </Box>
  );
};
export default UserDetails;
