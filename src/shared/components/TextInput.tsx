import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const TextInput: React.FC<{
  label: string;
  value?: string;
  icon?: string;
  type?: "text" | "number";
  onChange?: (value: string) => void;
  required?: boolean;
  containerSx?: SxProps;
  inputSx?: SxProps;
}> = ({
  label,
  icon,
  value,
  type = "text",
  required,
  onChange,
  containerSx,
  inputSx,
}) => {
  const theme = useTheme();
  const labelRef = useRef<HTMLInputElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.clientWidth);
    }
  }, []);
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        height: 50,
        borderRadius: "10px",
        position: "relative",
        paddingX: "16px",
        display: "flex",
        alignItems: "center",
        background: theme.palette.grey[300],
        boxSizing: "border-box",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -1,
          left: 40,
          width: labelWidth || "20px",
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
          top: -12,
          left: 40,
          lineHeight: 1,
          zIndex: 2,
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "11px",
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={icon}
          sx={{
            height: "20px",
            width: "20px",
            left: 8,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            height: 12,
            background: theme.palette.grey[500],
            px: 0.05,
          }}
        ></Box>

        <Box
          component="input"
          placeholder={`Enter ${label.toLowerCase()}`}
          onChange={(e) => onChange?.(e.target.value)}
          type={type}
          value={value}
          sx={{
            outline: "none",
            border: "none",
            width: "100%",
            background: "none",
            fontSize: 14,
            color: theme.palette.common.black,
            ...inputSx,
          }}
        />
      </Box>
    </Box>
  );
};
export default TextInput;
