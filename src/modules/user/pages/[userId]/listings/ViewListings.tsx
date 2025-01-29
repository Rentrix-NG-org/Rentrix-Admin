import { Box, Typography, useTheme } from "@mui/material";
import Listing from "@src/modules/user/components/Listing";
import UserNav from "@src/modules/user/components/UserNav";
import { UserService } from "@src/modules/user/services/user.service";
import { ListingType } from "@src/modules/user/types/user.types";
import { icons } from "@src/utils/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ViewListings = () => {
  const theme = useTheme();
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

  function handlePage(op: string) {
    if (op === "+" && page * 6 < listings.length) {
      setPage(page + 1);
    } else if (op === "-") {
      setPage(page === 1 ? 1 : page - 1);
    }
  }

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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20.3px",
          mt: "46.97px",
        }}
      >
        <Box
          onClick={() => handlePage("-")}
          sx={{ border: "none", background: "none", width: 33.6 }}
          component="button"
        >
          <Box component="img" src={icons.arrowleft} sx={{}} />
        </Box>
        <Box
          sx={{
            width: 32,
            height: 32,
            background: theme.palette.primary.main,
            display: "flex",
            justifyContent: "center",
            borderRadius: "50%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: theme.palette.common.white, fontWeight: 600 }}
          >
            {page}
          </Typography>
        </Box>
        <Box
          onClick={() => handlePage("+")}
          sx={{ border: "none", background: "none", width: 33.6 }}
          component="button"
        >
          <Box component="img" src={icons.arrowright} sx={{}} />
        </Box>
      </Box>
    </Box>
  );
};
export default ViewListings;
