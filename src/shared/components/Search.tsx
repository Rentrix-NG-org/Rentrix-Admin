import { Box, useTheme } from "@mui/material";
import searchicon from "@src/assets/icons/search.svg";
import { useState } from "react";

const Search: React.FC<{
  placeholder?: string;
  setSearch: (value: string) => void;
}> = ({ placeholder = "Search item", setSearch }) => {
  const theme = useTheme();
  const [focus, setFocus] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        width: "374px",
        height: "48px",
        padding: "8px 20px",
        alignItems: "center",
        gap: "12px",
        background: theme.palette.grey[200],
        borderRadius: "20px",
        border: "1px solid transparent",
        borderColor: focus ? theme.palette.secondary.main : "none",
      }}
    >
      <Box
        sx={{
          borderRight: `1px solid ${theme.palette.grey[300]}`,
          px: "12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box component="img" src={searchicon} sx={{ width: 20 }}></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 0.2,
        }}
      >
        <Box
          component="input"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={placeholder}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          sx={{
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            background: "none",
            border: "none",
            outline: "none",
            color: "#222522",
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
export default Search;
