import { Box, MenuItem, Select, Typography } from "@mui/material";
import { colors } from "@src/shared/constants/constants";
import { useState } from "react";
import ChevronArrowDown from "../assets/ChevronArrowDown";

export const DateInput = ({
  label,
  type,
  onChange,
}: {
  label: string;
  type: "day" | "month" | "year";
  onChange?: (e: Event) => void;
}) => {
  const [value, setValue] = useState(`Select ${type}`);
  const options = {
    day: [
      "Select day",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
    ],
    month: [
      "Select month",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    year: [
      "Select year",
      new Date().getFullYear().toString(),
      ...Array.from({ length: 100 }, (_, i) =>
        (new Date().getFullYear() + i + 1).toString(),
      ),
    ],
  };
  return (
    <Box
      sx={{
        background: "#f6f7f8",
        width: "100%",
        padding: "8px 12px",
        borderRadius: "8px",
      }}
    >
      <Typography sx={{ fontSize: "12px", mb: "6px" }}>{label}</Typography>
      <Select
        value={value}
        onChange={(e: any) => {
          if (onChange) {
            onChange(e);
          }
          setValue((e.target as HTMLSelectElement).value);
        }}
        sx={{
          width: "100%",
          "& .MuiSelect-select": {
            padding: 0,
            fontSize: "16px",
            fontWeight: 600,
            color: colors.textTitle,
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        MenuProps={{
          sx: {
            zIndex: 99999,
          },
        }}
        IconComponent={ChevronArrowDown}
      >
        {/* <MenuItem>
          <em>Select {type}</em>
        </MenuItem> */}
        {options[type].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
