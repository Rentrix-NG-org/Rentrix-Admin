import { Box } from "@mui/material";
import Profile from "../../components/Profile";
import PropertyListed from "../../components/PropertyListed";
import TransactionHistory from "../../components/TransactionHistory";
import ActivityLogs from "../../components/ActivityLogs";
import { UserService } from "../../services/user.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ListingType, TransactionType, User } from "../../types/user.types";
import UserNav from "../../components/UserNav";

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
      <UserNav routes={["User Management", "User Details"]} />
      <Profile user={user} />
      <PropertyListed listings={user.listings as ListingType[]} />
      <TransactionHistory
        transactions={user.transactions?.slice(0, 4) as TransactionType[]}
      />
      <ActivityLogs />
    </Box>
  );
};

export default UserDetails;
