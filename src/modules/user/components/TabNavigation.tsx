import { Box, Button } from "@mui/material";

const TabNavigation = ({
  tabs,
  setTabSelected,
  tabSelected,
}: {
  tabs: string[];
  setTabSelected: (tab: string) => void;
  tabSelected: string;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid #ccc",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {tabs.map((tab, index) => (
        <Button
          sx={{
            textTransform: "none",
            borderBottom: tab === tabSelected ? "1px solid #002b5b" : "none",
            color: "#828b9b",
            fontSize: "16px",
            borderRadius: 0,
            flex: 1,
            px: "12px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={() => setTabSelected(tab)}
          key={index}
        >
          {tab}
        </Button>
      ))}
    </Box>
  );
};
export default TabNavigation;
