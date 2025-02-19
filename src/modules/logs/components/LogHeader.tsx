import { Box } from "@mui/material";
import Filter from "@src/shared/components/Filter";
import Search from "@src/shared/components/Search";

const LogHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "16px",
      }}
    >
      <Filter
        filters={[{ name: "One", options: ["Two", "Three"] }]}
        onFilter={() => {}}
      />
      <Search placeholder="Search logs" setSearch={() => {}} />
    </Box>
  );
};
export default LogHeader;
