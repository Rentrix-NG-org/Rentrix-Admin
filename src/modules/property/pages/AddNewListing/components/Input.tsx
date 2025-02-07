import { Box, MenuItem, SxProps, Theme, Typography } from "@mui/material";
import React, { CSSProperties, useRef, useState } from "react";
import LineSeperator from "./LineSeperator";
import ChevronArrowDown from "../assets/ChevronArrowDown";
import Checked from "../assets/Checked";
import EmptyCheckbox from "../assets/EmptyCheckbox";
import { colors, padding, radius, text } from "@src/shared/constants/constants";

interface InputProps {
  inputStyles?: CSSProperties;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
  name?: string;
  label?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | null;
  value: string;
  type?: string;
  multiple?: boolean;
  multichoice?: boolean;
  select?: boolean;
  options?: any;
  onSelect?: (option: any) => void;
  inputContainerStyles?: CSSProperties | SxProps<Theme>;
  selected?: string[] | string;
  setSelected?: (option: any) => void;
  autoFocus?: boolean
}

const Input = ({
  inputStyles,
  startIcon,
  endIcon,
  placeholder,
  name,
  label,
  required,
  value,
  onChange,
  type,
  multiple,
  multichoice = false,
  select,
  options,
  onSelect,
  inputContainerStyles,
  selected,
  setSelected,
  autoFocus
}: InputProps) => {
  const [focus, setFocus] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState<string[]>([]);
  return (
    <Box width="100%">
      <Box
        px={padding.mobile}
        py={{ xs: "14px", sm: "18px" }}
        borderRadius={radius.mini}
        bgcolor={colors.offWhite}
        display="flex"
        alignItems="center"
        gap={{ xs: "12px", sm: "8px" }}
        position="relative"
        border={focus || value ? `1px solid ${colors.secondary}` : "none"}
        sx={{ ...inputContainerStyles }}
      >
        {label && (
          <Box
            position="absolute"
            height="1px"
            width={textRef?.current?.offsetWidth}
            top={focus || value ? -1 : 0}
            left={40}
            bgcolor={colors.inputBackground}
          >
            <Typography
              ref={textRef}
              position="absolute"
              px="8px"
              fontSize={{ xs: "12px", sm: text.small }}
              fontWeight={text.weightSemiBold}
              color={colors.textBody}
              width="fit-content"
              sx={{
                whiteSpace: "nowrap",
              }}
              top={{ xs: -8, sm: -12 }}
            >
              {label}
              {required ? "*" : ""}
            </Typography>
          </Box>
        )}
        {startIcon && (
          <>
            {startIcon}
            <LineSeperator />
          </>
        )}
        <input
          required={required}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          disabled={select}
          type={type}
          multiple={multiple}
          className="input"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            backgroundColor: colors.offWhite,
            border: "none",
            fontSize: text.small,
            color: colors.textTitle,
            outline: 'none',
            ...inputStyles,
          }}
        />
        {endIcon && <>{endIcon}</>}
        {select ? (
          <Box sx={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
            <Box
              display={{ xs: "none", sm: "flex" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ChevronArrowDown />
            </Box>
            <Box
              display={{ xs: "flex", sm: "none" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ChevronArrowDown width="16px" height="16px" />
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box
        display={select && open && options ? "block" : "none"}
        width="100%"
        height="fit-content"
        // position="absolute"
        // top={"95%"}
        // left={0}
        bgcolor={colors.light}
        borderRadius={radius.semi}
        border="1px solid #DADDE2"
        mt="24px"
        zIndex={2}
        sx={{
          boxShadow: "0px 4px 10px 4px rgba(0, 0, 0, .25)",
        }}
      >
        {options?.map((option: string) => (
          <MenuItem
            onClick={() => {
              if (onSelect) onSelect(option);
              if (!multichoice) setOpen(false);
              else {
                if (setSelected)
                  setSelected((prev: string) =>
                    prev.includes(option)
                      ? prev.filter((x) => x !== option)
                      : [...prev, option]
                  );
              }
            }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {option}
            {multichoice &&
              (selected?.includes(option.toLowerCase().split(" ").join("-")) ? (
                <Checked />
              ) : (
                <EmptyCheckbox width="20px" height="20px" />
              ))}
          </MenuItem>
        ))}
      </Box>
    </Box>
  );
};

export default Input;
