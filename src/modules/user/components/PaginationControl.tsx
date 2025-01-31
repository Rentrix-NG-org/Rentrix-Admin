import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { useState } from "react";

const PaginationControl: React.FC<{
  onPage: (page: number) => void;
  data: any[];
}> = ({ data, onPage }) => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  function handlePage(op: string) {
    if (op === "+" && page * 8 < data.length) {
      setPage(page + 1);
      onPage(page + 1);
    } else if (op === "-") {
      onPage(page === 1 ? 1 : page - 1);

      setPage(page === 1 ? 1 : page - 1);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20.3px",
        mt: "25px",
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
        <Typography sx={{ color: theme.palette.common.white, fontWeight: 600 }}>
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
  );
};
export default PaginationControl;
