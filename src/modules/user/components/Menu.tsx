import { ChevronLeftRounded } from "@mui/icons-material";
import { Box, Checkbox, SxProps, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";

const Menu: React.FC<{
  title: string;
  sx?: SxProps;
  options: string[];
  onClose: VoidFunction;
  onSelect: (title: string) => void;
}> = ({ title, options = [], onSelect, sx, onClose }) => {
  const [selected, setSelected] = useState("");
  const theme = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  // const position = useMenuPosition(menuRef);
  return (
    <Box
      ref={menuRef}
      sx={{
        border: `1px solid ${theme.palette.grey[100]}`,
        width: 312,
        position: "absolute",
        background: theme.palette.common.white,
        zIndex: 999999999999,
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "5px 20px",
          height: "35px",
          borderBottom: `1px solid ${theme.palette.grey[100]}`,
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            color: "#0F0006",
            fontSize: "16px",
            fontStyle: "normal",
            lineHeight: "100%",
            textTransform: "capitalize",
          }}
        >
          {title.slice(0, 1)}
          {title.slice(1).toLowerCase()}
        </Typography>
        <Box
          component="button"
          onClick={onClose}
          sx={{ border: "none", background: "none", cursor: "pointer" }}
        >
          <ChevronLeftRounded
            sx={{
              transform: "rotate(90deg)",
              width: "24px",
              height: "24px",
              color: theme.palette.secondary.main,
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          p: "10px 30px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {options.map((option) => (
          <Box
            component="button"
            onClick={() => {
              onSelect(option);
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.black,
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                textTransform: "capitalize",
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
export default Menu;
