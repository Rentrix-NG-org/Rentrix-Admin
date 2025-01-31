import { Box } from "@mui/material";
import Listing from "@src/modules/user/components/Listing";
import PaginationControl from "@src/modules/user/components/PaginationControl";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import { ListingType } from "@src/modules/user/types/user.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ViewListings = () => {
  const [page, setPage] = useState(1);
  const params = useParams();
  const { getUserListings } = UserService();
  const [listings, setListings] = useState<ListingType[]>([]);
  const [paginatedData, setPaginatedData] = useState<ListingType[]>([]);

  useEffect(() => {
    async function fetchListings() {
      const response = await getUserListings(params?.userId || "");
      if (response.success) {
        setListings(response.data);
      }
    }
    fetchListings();
  }, []);

  useEffect(() => {
    const start = (page - 1) * 6;
    const end = start + 6;
    const paginatedResults = listings.slice(start, end);
    setPaginatedData(paginatedResults);
  }, [listings, page]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "42.82px",
        px: "20px",
        gap: "32px",
      }}
    >
      <UserNav
        routes={[
          "User Management",
          "UserDetails",
          "View All Property Listings",
        ]}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {paginatedData.map((listing) => (
          <Listing listing={listing} />
        ))}
      </Box>

      <PaginationControl data={listings} onPage={(page) => setPage(page)} />
    </Box>
  );
};
export default ViewListings;
