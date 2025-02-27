import { ChevronLeftRounded } from "@mui/icons-material";
import { Box, SxProps, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const SelectInput: React.FC<{
  label: string;
  icon?: string;
  value?: string | number;
  options: string[];
  typeable?: boolean;
  onChange?: (value: string) => void;
  containerSx?: SxProps;
  inputSx?: SxProps;
  placeholderSx?: SxProps;
  required?: boolean;
}> = ({
  label,
  icon,
  options = ["None"],
  typeable,
  value,
  onChange,
  containerSx,
  inputSx,
  required,
  placeholderSx,
}) => {
  const [selected, setSelected] = useState("");
  const [typeableValue, setTypeableValue] = useState("");
  const [filterOptions, setFilterOptions] = useState(options);
  const labelRef = useRef<HTMLInputElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (
      value &&
      options
        .map((o) => String(o).toLowerCase().replace(/-/g, " "))
        .includes(String(value).toLowerCase().replace(/-/g, " "))
    ) {
      setSelected(
        options.find(
          (o) =>
            String(o).toLowerCase().replace(/-/g, " ") ===
            String(value).toLowerCase().replace(/-/g, " "),
        ) || "",
      );
    }
  }, [value, options]);

  useEffect(() => {
    if (typeableValue && typeableValue !== selected) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(typeableValue.toLowerCase()),
      );
      setFilterOptions(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [typeableValue]);
  return (
    <Box
      component="button"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      sx={{
        display: "flex",
        width: "100%",
        border: `1px solid ${theme.palette.primary.main}`,
        background: theme.palette.grey[100],
        borderRadius: "10px",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        height: 50,
        padding: icon ? "8px 16px" : "8px 12px",
        gap: "12px",
        "&::before": {
          content: '""',
          display: icon ? "block" : "none",
          position: "absolute",
          top: -1,
          left: 40,
          width: labelWidth || "10px",
          height: "1px",
          background: theme.palette.common.white,
          zIndex: 1,
        },
        ...containerSx,
      }}
    >
      <Box
        ref={labelRef}
        sx={{
          position: "absolute",
          px: 1,
          top: -13,
          left: 40,
          lineHeight: 1,
          zIndex: 10,
        }}
      >
        <Typography
          display={icon ? "inline" : "none"}
          sx={{
            color: theme.palette.grey[700],
            fontSize: 14,
            lineHeight: 1,
            padding: 0,
            margin: 0,
            display: icon ? "inline" : "none",
          }}
        >
          {label} {required && "*"}
        </Typography>
      </Box>
      <Box display={icon ? "inline" : "none"}>
        <Box
          component="img"
          src={icon}
          sx={{ width: 18, height: 18, pointerEvents: "none" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: typeable ? "100%" : "auto",
          ...inputSx,
        }}
      >
        <Box
          display={typeable ? "flex" : "none"}
          component="input"
          value={typeableValue}
          placeholder={`Select or type ${label.toLowerCase()}`}
          onChange={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onChange?.(e.target.value);
            setTypeableValue(e.target.value);
          }}
          type="text"
          sx={{
            width: "100%",
            outline: "none",
            background: "none",
            border: "none",
            color: theme.palette.grey[600],
          }}
        />
      </Box>
      <Box
        sx={{
          display: typeable ? "none" : "flex",
          flexDirection: "column",
          gap: "2px",
          width: "100%",
        }}
      >
        <Typography
          display={icon ? "none" : "inline"}
          sx={{
            color: theme.palette.grey[800],
            fontSize: 14,
            lineHeight: 1,
            textAlign: "left",
            padding: 0,
            margin: 0,
          }}
        >
          {label} {required && "*"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: icon ? 14 : 16,
              fontStyle: "normal",
              fontWeight: icon ? 500 : 600,
              lineHeight: "120%",
              color: theme.palette.text.secondary,
              textAlign: "left",
              letterSpacing: "-0.32px",
              ...placeholderSx,
            }}
          >
            {selected || "Select " + label.toLowerCase()}{" "}
          </Typography>

          <ChevronLeftRounded
            sx={{
              ml: "auto",
              display: icon ? "none" : "block",
              transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
              color: theme.palette.text.secondary,
              ...placeholderSx,
            }}
          />
        </Box>
      </Box>
      <ChevronLeftRounded
        sx={{
          ml: "auto",
          display: icon ? "block" : "none",
          transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
          color: theme.palette.common.black,
        }}
      />

      <Box
        display={isOpen ? "flex" : "none"}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 99,
          top: 56,
          padding: "16px",
          background: theme.palette.background.default,
          flexDirection: "column",
          gap: 0.5,
          borderRadius: "10px",
          maxHeight: 180,
          overflowY: "scroll",
          alignItems: "flex-start",
        }}
      >
        {filterOptions.map((option) => (
          <Box
            component="button"
            onClick={() => {
              onChange?.(option);
              setTypeableValue(option);
              setSelected(option);
            }}
            sx={{
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 14,
                width: "100%",
                textAlign: "left",
                py: 0.5,
              }}
            >
              {option}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default SelectInput;
