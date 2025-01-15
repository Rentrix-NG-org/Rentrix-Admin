import { ChevronLeft, ChevronLeftRounded } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";

interface TableDataType {
  columnLabel: string;
  value: string[];
  type: "text" | "button" | "select";
  option?: string[];
  actionTitle?: string;
  onAction?: () => void;
}

const Table: React.FC<{
  columns: {
    header: string;
    label: string;
  }[];
  data: TableDataType[];
}> = ({ columns, data }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          border: `1px solid ${theme.palette.grey[50]}`,
          // background: theme.palette.grey.A100,
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",

          overflow: "hidden",
          overflowX: "scroll",
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        }}
      >
        {columns.map((column) => (
          <Box sx={{}}>
            <Typography
              sx={{
                fontWeight: 600,
                textWrap: "nowrap",
                color: theme.palette.common.black,
                background: theme.palette.grey.A200,
                borderBottom: `1px solid ${theme.palette.grey.A100}`,
                padding: "13px 31px",
              }}
            >
              {column.header}
            </Typography>

            {data
              .filter((d) => d.columnLabel === column.label)
              .map((row) =>
                row.value.map((v, index) =>
                  row.type === "select" ? (
                    <Select
                      options={row?.option}
                      color={{ value: "#099137", accent: "#daefe1" }}
                      index={index}
                      row={row}
                      value={v}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: 500,
                        padding: "26px 31px",
                        overflow: "hidden",
                        textWrap: "nowrap",
                        color: theme.palette.common.black,
                        borderBottom:
                          row.value.length === index + 1
                            ? "none"
                            : `1px solid ${theme.palette.grey.A100}`,
                      }}
                    >
                      {v}
                    </Typography>
                  ),
                ),
              )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Select: React.FC<{
  index: number;
  options?: string[];
  color?: { value: string; accent: string };
  value?: string;
  row: { value: string[] };
  onSelect?: (option: string) => void;
}> = ({ options, onSelect, color, row, value, index }) => {
  const colors: Record<string, { value: string; accent: string }> = {
    Tenant: { value: "#9747ff", accent: "#efe3ff" },
    Landlord: { value: "#297dfd", accent: "#f7f7ff" },
    Suspended: { value: "#cb1a14", accent: "#f7dddc" },
    Active: { value: "#099137", accent: "#daefe1" },
    Supervisor: { value: "#430c7b", accent: "#e3dbeb" },
    "Rentrix Rep": { value: "#00a3a3", accent: "#e5f6f6" },
    Default: { value: "#002b5b", accent: "#cce3fc" },
  };
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "23px 15px",
        position: "relative",
        borderBottom:
          row.value.length === index + 1
            ? "none"
            : `1px solid ${theme.palette.grey.A100}`,
      }}
    >
      <Box
        component="button"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          background: colors[value ?? "Default"]?.accent,
          display: "flex",
          width: "fit-content",
          alignItems: "center",
          border: "none",
          cursor: "pointer",
          borderRadius: 3,
          padding: "3px 16px",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: colors[value || "Default"]?.value,
          }}
        >
          {value}
        </Typography>
        <ChevronLeftRounded
          sx={{
            transform: "rotate(-90deg) ",
            color: colors[value || "Default"]?.value,
          }}
        />
      </Box>

      <Box
        display={isOpen ? "flex" : "none"}
        sx={{
          flexDirection: "column",
          zIndex: 10,
          position: "absolute",
          top: 56,
          left: "50%",
          right: 0,
          width: "fit-content",
          transform: "translateX(-80%)",
          overflow: "hidden",
          borderRadius: 1,
          background: theme.palette.common.white,
          boxShadow: `0 4px 6px ${theme.palette.grey[200]}`,
        }}
      >
        {options?.map((option) => (
          <Box
            component="button"
            onClick={() => setIsOpen(false)}
            sx={{
              border: "none",
              background: "none",
              p: 0,
              m: 0,
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: theme.palette.common.black,
                pl: 1.5,
                pr: 4,
                gap: 1,
                textAlign: "left",
                py: 1,
                "&:hover": {
                  background: theme.palette.grey[200],
                },
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
export default Table;
