import { Box, Typography, useTheme } from "@mui/material";
import Filter from "@src/shared/components/Filter";
import Search from "@src/shared/components/Search";
import { Filters } from "@src/shared/types/shared.types";
import { useState } from "react";
import { useNavigate } from "react-router";
import Menu from "./Menu";
import { ChevronLeftRounded } from "@mui/icons-material";

const UserHeader: React.FC<{
  title: string;
  search: string;
  filters: Filters[];
  setSearch: (value: string) => void;
  setFilter: (value: string[]) => void;
}> = ({ title, filters, setSearch, setFilter }) => {
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.palette.common.black,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <Box
          component="button"
          onClick={() => setShowMenu(!showMenu)}
          sx={{
            display: "flex",
            width: "250px",
            height: "40px",
            cursor: "pointer",
            padding: "16px",
            borderRadius: 30,
            border: "none",
            background: theme.palette.secondary.main,
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            position: "relative",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: theme.palette.common.white,
            }}
          >
            Add new users
          </Typography>
          <ChevronLeftRounded
            sx={{
              transform: showMenu ? "rotate(90deg)" : "rotate(-90deg)",
              color: theme.palette.common.white,
            }}
          />
          {showMenu && (
            <Menu
              title="Role"
              options={["Admin", "Rentrix Rep"]}
              onClose={() => {
                setShowMenu(false);
              }}
              onSelect={(v) => {
                if (v === "Rentrix Rep") {
                  navigate("add-rep");
                } else {
                  navigate(`create?usertype=${v.toLowerCase()}`);
                }
              }}
              sx={{
                top: 50,
              }}
            />
          )}
        </Box>
        <Search placeholder="Search Users" setSearch={setSearch} />
        <Filter filters={filters} onFilter={setFilter} />
      </Box>
    </Box>
  );
};

export default UserHeader;
