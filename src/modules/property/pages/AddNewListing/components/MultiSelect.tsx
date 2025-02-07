import { Box, SxProps, Theme } from "@mui/material";
import { colors, radius } from "@src/shared/constants/constants";
import React from "react";

interface SelectProps {
  options: any[];
  selected: string | number;
  onSelect: (option: string) => void;
  sx?: SxProps<Theme>;
}

const MultiSelect = ({
  options,
  selected,
  onSelect,
  sx,
  ...props
}: SelectProps) => {
  return (
    <Box display="flex" alignItems="center" gap="12px">
      {options.map((option: any, i: number) => (
        <Box
          key={i}
          flex={options.length <= 3 ? 1 : undefined}
          width={String(option).length <= 2 ? "57px" : "fit-content"}
          height={String(option).length <= 2 ? "57px" : "fit-content"}
          px={String(option).length <= 2 ? 0 : "19px"}
          py={String(option).length <= 2 ? 0 : "15px"}
          bgcolor={
            String(selected) ===
              String(option).toLowerCase().split(" ").join("-") ||
            selected === option
              ? colors.secondary
              : colors.inputBackground
          }
          // py="13px"
          borderRadius={radius.rounded}
          fontSize={16}
          fontWeight={600}
          color={
            String(selected) ===
              String(option).toLowerCase().split(" ").join("-") ||
            selected === option
              ? colors.textNegative
              : colors.textBody
          }
          onClick={() => onSelect(option)}
          sx={{ cursor: "pointer", ...sx }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          {...props}
        >
          {option}
        </Box>
      ))}
    </Box>
  );
};

export default MultiSelect;
