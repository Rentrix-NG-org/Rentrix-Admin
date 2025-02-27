import { ChevronLeftRounded } from "@mui/icons-material";
import { Box, Checkbox, SxProps, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { useMenuPosition } from "../hooks/shared.hooks";
import PaginationControl from "@src/modules/user/components/PaginationControl";
import { Column } from "../types/shared.types";

interface TableProps {
  onSelect: (row: string[], selected: { value: string; index: number }) => void;
  onRowClick: (row: string[]) => void;
  columns: Column[];
  data: string[][];
}

const Table: React.FC<TableProps> = ({
  onSelect,
  onRowClick,
  columns,
  data,
}) => {
  const [rows, setRows] = useState<string[][]>(data);
  const [paginatedRows, setPaginatedRows] = useState<string[][]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const result = data.map((d) => {
      return [...d, "Action"] as string[];
    });
    setRows(result);
  }, [data]);
  const theme = useTheme();

  useEffect(() => {
    const limit = 2;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = rows.slice(start, end);
    setPaginatedRows(paginatedData);
  }, [page, rows]);
  return (
    <Box
      data-table-container
      sx={{
        border: `1px solid ${theme.palette.grey[50]}`,
        borderTopLeftRadius: "14px",
        borderTopRightRadius: "14px",
        overflow: "hidden",
        overflowX: "scroll",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        }}
      >
        {columns.map(({ header, label }) => (
          <Typography
            key={label}
            sx={{
              fontWeight: 600,
              textWrap: "nowrap",
              color: theme.palette.common.black,
              background: theme.palette.grey.A200,
              borderBottom: `1px solid ${theme.palette.grey.A100}`,
              padding: "13px 31px",
              minWidth: "200px",
            }}
          >
            {header}
          </Typography>
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        }}
      >
        {paginatedRows.map(
          (row, rowIndex) =>
            Array.isArray(row) &&
            row.map((cell, cellIndex) =>
              columns[cellIndex]?.type === "select" ? (
                <Select
                  cell={cell}
                  onSelect={(title) => {
                    onSelect(row, { value: title, index: cellIndex });
                  }}
                  column={columns[cellIndex].header}
                  key={`${rowIndex}-${cellIndex}`}
                  options={columns[cellIndex].options as string[]}
                />
              ) : columns[cellIndex]?.type === "custom-text" ? (
                <Box
                  sx={{
                    padding: "28px 32px",
                    borderBottom: `1px solid ${theme.palette.grey.A100}`,
                    minWidth: "200px",
                  }}
                >
                  <Typography
                    // component="button"
                    onClick={() => onRowClick(row)}
                    key={`${rowIndex}-${cellIndex}`}
                    sx={{
                      textWrap: "nowrap",
                      border: `1px solid ${columns[cellIndex].colors?.[cell ? cell.toLowerCase() : ""]}`,
                      color:
                        columns[cellIndex].colors?.[
                          cell ? cell.toLowerCase() : ""
                        ],
                      width: "fit-content",
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: "10px",
                      padding: "6px 16px",
                    }}
                  >
                    {cell && cell.length > 25
                      ? cell.slice(0, 25).toUpperCase() + "..."
                      : cell
                        ? cell.toUpperCase()
                        : ""}
                  </Typography>
                </Box>
              ) : columns[cellIndex]?.type === "action" ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: "31px",
                    gap: 2,
                    minWidth: "200px",
                    borderBottom: `1px solid ${theme.palette.grey.A100}`,
                  }}
                >
                  {columns[cellIndex]?.component?.map((x) => (
                    <Box
                      // component="button"
                      onClick={() => x.onClick(String(row[0]))}
                      sx={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        p: 0,
                      }}
                    >
                      {x.component}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography
                  // component="button"
                  onClick={() => onRowClick(row)}
                  key={`${rowIndex}-${cellIndex}`}
                  sx={{
                    textWrap: "nowrap",
                    padding: "28px 32px",
                    border: "none",
                    borderBottom: `1px solid ${theme.palette.grey.A100}`,
                    minWidth: "200px",
                  }}
                >
                  {cell?.length > 25 ? cell?.slice(0, 25) + "..." : cell}
                </Typography>
              ),
            ),
        )}
      </Box>

      <PaginationControl
        onPage={(page) => setPage(page)}
        data={rows}
        limit={2}
      />
    </Box>
  );
};

const Select: FC<{
  column: string;
  cell: string;
  options: string[];
  onSelect: (selected: string) => void;
}> = ({ column, options, onSelect, cell }) => {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const colors: Record<
    string,
    { value: string; accent: string; border: string }
  > = {
    tenant: { value: "#9747ff", border: "transparent", accent: "#efe3ff" },
    landlord: { value: "#297dfd", border: "transparent", accent: "#f7f7ff" },
    suspended: { value: "#cb1a14", border: "transparent", accent: "#f7dddc" },
    active: { value: "#099137", border: "transparent", accent: "#daefe1" },
    Supervisor: { value: "#430c7b", border: "transparent", accent: "#e3dbeb" },
    Admin: { value: "#cd9e14", border: "transparent", accent: "#fef5dc" },
    admin: { value: "#cd9e14", border: "transparent", accent: "#fef5dc" },
    supervisor: { value: "#430c7b", border: "transparent", accent: "#e3dbeb" },
    pending: { value: "#ad6f07", border: "transparent", accent: "#fbe2b7" },
    denied: { value: "#cb1a14", border: "transparent", accent: "#f7dddc" },
    LISTED: { value: "#099137", border: "#099137", accent: "transparent" },
    "UNDER REVIEW": {
      value: "#DD900D",
      border: "#DD900D",
      accent: "transparent",
    },
    RENTED: { value: "#297DFD", border: "#297DFD", accent: "transparent" },
    "Rentrix Rep": {
      value: "#00a3a3",
      border: "transparent",
      accent: "#e5f6f6",
    },
    Default: { value: "#002b5b", border: "transparent", accent: "#cce3fc" },
  };

  const color = colors[cell || options[0]] || colors.Default;
  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.grey.A100}`,
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "28px 31px",
        minWidth: "200px",
        // justifyContent: "center",
      }}
    >
      <Box
        component="button"
        onClick={() => setIsMenuOpen(true)}
        sx={{
          background: color.accent ? color.accent : "transparent",
          padding: "3px 16px",
          borderRadius: 3,
          cursor: "pointer",
          width: "fit-content",
          border: color.border ? `1px solid ${color.border}` : "none",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Typography sx={{ color: color.value, fontSize: 12, fontWeight: 600 }}>
          {cell.slice(0, 1).toUpperCase() + cell.slice(1) || options[0]}
        </Typography>
        <ChevronLeftRounded
          sx={{
            transform: "rotate(-90deg) ",
            color: color.value,
          }}
        />
      </Box>

      {isMenuOpen && (
        <Menu
          sx={{}}
          title={column}
          options={options}
          onSelect={(title) => {
            onSelect(title);
          }}
          onClose={() => setIsMenuOpen(false)}
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
  onSelect: (title: string) => void;
}> = ({ title, options = [], onSelect, sx, onClose }) => {
  const [selected, setSelected] = useState("");
  const theme = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const position = useMenuPosition(menuRef);
  return (
    <Box
      ref={menuRef}
      sx={{
        border: `1px solid ${theme.palette.grey[100]}`,
        width: 312,
        position: "absolute",
        top: position.top,
        left: position.left,
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
                onSelect(option);
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
