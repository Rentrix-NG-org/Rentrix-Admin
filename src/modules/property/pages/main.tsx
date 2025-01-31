import { Box } from "@mui/material";
import PropertyManagementHeader from "../components/PropertyManagementHeader";
import { useState } from "react";
import PropertyTable from "../components/PropertyTable";

const PropertyManagement = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string[]>([]);
  return (
    <Box
      sx={{
        px: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "46px",
      }}
    >
      <PropertyManagementHeader
        search=""
        setSearch={setSearch}
        setFilter={setFilter}
      />
      <PropertyTable search={search} filter={filter} />
    </Box>
  );
};
export default PropertyManagement;
