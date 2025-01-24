import { ChevronLeftRounded } from "@mui/icons-material";
import { Box, Checkbox, SxProps, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { useState } from "react";

interface TableDataType {
  columnLabel: string;
  value: string[];
  type: "text" | "button" | "select" | "action";
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
  onSelect?: ({
    option,
    index,
    column,
  }: {
    option: string;
    index: number;
    column: string[];
  }) => void;
}> = ({ columns, data, onSelect }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          border: `1px solid ${theme.palette.grey[50]}`,
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
                      onSelect={onSelect}
                      columnLabel={column.label}
                      options={row?.option}
                      color={{ value: "#099137", accent: "#daefe1" }}
                      index={index}
                      data={data}
                      value={v}
                    />
                  ) : row.type === "action" ? (
                    <Action row={row} index={index} />
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

const Action: React.FC<{ index: number; row: TableDataType }> = ({
  index,
  row,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: "29px 15px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderBottom:
          row.value.length === index + 1
            ? "none"
            : `1px solid ${theme.palette.grey.A100}`,
      }}
    >
      <Box component="img" src={icons.eye} />
      <Box component="img" src={icons.edit} />
      <Box component="img" src={icons.bin} />
    </Box>
  );
};

const Select: React.FC<{
  columnLabel: string;
  index: number;
  options?: string[];
  color?: { value: string; accent: string };
  value?: string;
  data: TableDataType[];
  onSelect?: ({
    option,
    index,
    column,
  }: {
    option: string;
    index: number;
    column: string[];
  }) => void;
}> = ({ columnLabel, options, onSelect, data, value, index }) => {
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
  const column = data.map((d) => d.value[0]);
  const row = data.find((d) => d.columnLabel === columnLabel)!;
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

      {isOpen && (
        <Menu
          onSelect={(title) =>
            onSelect && onSelect({ option: title, column, index })
          }
          sx={{ top: row.value.length === index + 1 ? -80 : -10 }}
          onClose={() => setIsOpen(false)}
          title={columnLabel as string}
          options={options as string[]}
        />
      )}
    </Box>
  );
};

const Menu: React.FC<{
  title: string;
  sx?: SxProps;
  options: string[];
  onClose: VoidFunction;
  onSelect?: (title: string) => void;
}> = ({ title, options = [], onSelect, sx, onClose }) => {
  const [selected, setSelected] = useState("");
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.grey[100]}`,
        width: 312,
        position: "absolute",
        top: -10,
        left: -140,
        background: theme.palette.common.white,
        zIndex: 999,
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
          p: "10px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        {options.map((option) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              sx={{
                color: theme.palette.secondary.main,
                "&.Mui-checked": {
                  color: theme.palette.secondary.main,
                },
              }}
              checked={selected === option}
              onChange={() => {
                setSelected(option);
                onSelect?.(option);
              }}
            />
            <Typography
              sx={{
                color:
                  selected === option
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                fontSize: 14,
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
export default Table;
