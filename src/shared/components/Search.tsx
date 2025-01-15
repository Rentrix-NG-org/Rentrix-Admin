import { Box, useTheme } from "@mui/material";
import searchicon from "@src/assets/icons/search.svg";

const Search: React.FC<{ placeholder?: string }> = ({
  placeholder = "Search item",
}) => {
  const theme = useTheme();
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
          placeholder={placeholder}
          sx={{
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 600,
            background: "none",
            border: "none",
            outline: "none",
            color: theme.palette.grey[500],
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
export default Search;
