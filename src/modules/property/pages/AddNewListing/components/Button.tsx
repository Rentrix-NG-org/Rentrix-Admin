import React from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { radius, text } from "@src/shared/constants/constants";

interface ButtonProps {
  buttonStyles?: SxProps<Theme> | React.CSSProperties;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  variant: "text" | "contained" | "outlined";
  disabled?: boolean;
  children: any;
  type?: "button" | "submit" | "reset";
}

const CustomButton = ({
  variant,
  buttonStyles,
  startIcon,
  endIcon,
  onClick,
  disabled,
  children,
  type = "button",
}: ButtonProps) => {
  return (
    <Button
      disabled={disabled}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      type={type}
      disableElevation
      sx={{
        borderRadius: radius.rounded,
        height: { xs: "48px", sm: "60px" },
        fontSize: text.small,
        fontWeight: text.weightSemiBold,
        textTransform: "none",
        width: '100%',
        zIndex: 9,
        ...buttonStyles,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
