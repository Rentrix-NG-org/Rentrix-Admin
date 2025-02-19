import { Box } from "@mui/material";
import Filter from "@src/shared/components/Filter";
import Search from "@src/shared/components/Search";

const PropertyManagementHeader = ({
  setSearch,
  setFilter,
}: {
  search: string;
  setSearch: (value: string) => void;
  setFilter: (value: string[]) => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        py: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <Filter onFilter={setFilter} filterStyle={{ width: "150px" }} />
        <Filter
          placeholder="Price"
          onFilter={setFilter}
          filterStyle={{ width: "150px" }}
        />
        <Filter
          placeholder="Bed/Bath"
          onFilter={setFilter}
          filterStyle={{ width: "150px" }}
        />
        <Filter
          placeholder="Property Type"
          onFilter={setFilter}
          filterStyle={{ width: "150px" }}
        />
        <Search placeholder="Search Properties" setSearch={setSearch} />
      </Box>
    </Box>
  );
};

export default PropertyManagementHeader;
