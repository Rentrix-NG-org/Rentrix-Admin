import { ChevronLeftRounded } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const SelectInput: React.FC<{
  label: string;
  icon?: string;
  options: string[];
  type?: "text" | "number";
  onChange?: (value: string) => void;
  required?: boolean;
}> = ({ label, icon, options = ["None"], type, onChange, required }) => {
  const [selected, setSelected] = useState("");
  const labelRef = useRef<HTMLInputElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.clientWidth);
    }
  }, []);
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
        background: theme.palette.grey[300],
        borderRadius: "10px",
        alignItems: "center",
        height: 50,
        position: "relative",
        cursor: "pointer",
        p: "8px 16px",
        gap: "12px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -1,
          left: 40,
          width: labelWidth || "10px",
          height: "1px",
          background: theme.palette.common.white,
          zIndex: 1,
        },
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
          sx={{
            color: theme.palette.grey[700],
            fontSize: 14,
            lineHeight: 1,
            padding: 0,
            margin: 0,
          }}
        >
          {label} {required && "*"}
        </Typography>
      </Box>
      <Box>
        <Box component="img" src={icon} sx={{ width: 18, height: 18 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      ></Box>

      <Box>{selected || "Select " + label.toLowerCase()} </Box>
      <ChevronLeftRounded
        sx={{
          ml: "auto",
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
          alignItems: "flex-start",
        }}
      >
        {options.map((option) => (
          <Box
            component="button"
            onClick={() => {
              onChange?.(option);
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
