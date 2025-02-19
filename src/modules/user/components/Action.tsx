import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { useState } from "react";

const Action: React.FC<{ row: any[]; sx?: SxProps }> = () => {
  const theme = useTheme();
  const [tooltips, setTooltips] = useState<
    { name: string; isShown: boolean }[]
  >([]);

  function handleTooltipShow(name: string) {
    setTimeout(() => {
      const tooltipExist = tooltips.find((tooltip) => tooltip.name === name);
      if (!tooltipExist) {
        setTooltips((curr) => [...curr, { name, isShown: true }]);
      } else {
        const updated = tooltips.map((t) => {
          if (t.name === name) {
            t.isShown = true;
            return t;
          }
          return t;
        });
        setTooltips(updated);
      }
    }, 500);
  }

  function handleTooltipHide(name: string) {
    setTimeout(() => {
      const tooltipExist = tooltips.find((tooltip) => tooltip.name === name);
      if (!tooltipExist) {
        setTooltips((curr) => [...curr, { name, isShown: false }]);
      } else {
        const updated = tooltips.map((t) => {
          if (t.name === name) {
            t.isShown = false;
            return t;
          }
          return t;
        });
        setTooltips(updated);
      }
    }, 500);
  }
  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "28px 32px",
        // justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          component="button"
          onMouseEnter={() => handleTooltipShow("Show")}
          onMouseLeave={() => handleTooltipHide("Show")}
          sx={{
            background: "none",
            border: "none",
            cursor: "pointer",
            p: 0,

            position: "relative",
          }}
        >
          <Box component="img" src={icons.eye} sx={{ width: 18 }} />
          <Tooltip name="Show" tooltips={tooltips} />
        </Box>
        <Box
          component="button"
          onMouseEnter={() => handleTooltipShow("edit")}
          onMouseLeave={() => handleTooltipHide("edit")}
          sx={{
            background: "none",
            border: "none",
            cursor: "pointer",
            p: 0,
            position: "relative",
          }}
        >
          <Box component="img" src={icons.edit} sx={{ width: 18 }} />
          <Tooltip name="edit" tooltips={tooltips} />
        </Box>
        <Box
          component="button"
          onMouseEnter={() => handleTooltipShow("delete")}
          onMouseLeave={() => handleTooltipHide("delete")}
          sx={{
            background: "none",
            border: "none",
            cursor: "pointer",
            p: 0,
            position: "relative",
          }}
        >
          <Box component="img" src={icons.bin} sx={{ width: 18 }} />
          <Tooltip name="delete" tooltips={tooltips} />
        </Box>
      </Box>
    </Box>
  );
};

const Tooltip: React.FC<{
  name: string;
  tooltips: { name: string; isShown: boolean }[];
}> = ({ name, tooltips }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: tooltips.find((t) => t.name === name)?.isShown
          ? "block"
          : "none",
        position: "absolute",
        top: -48,
        left: "50%",
        transform: "translateX(-50%)",
        background: theme.palette.primary.main,
        padding: "8px 12px",
        borderRadius: "8px",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.common.white,
          fontSize: 10,
          fontWeight: 500,
        }}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>

      <Box
        sx={{
          background: theme.palette.primary.main,
          width: 24,
          height: 24,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          bottom: -2,
          borderRadius: 0.4,
          zIndex: -1,
        }}
      ></Box>
    </Box>
  );
};

export default Action;
