import { ChevronLeftRounded } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { icons } from "@src/utils/icons";
import { CSSProperties, useEffect, useState } from "react";
import { Filters } from "../types/shared.types";

const Filter: React.FC<{
  placeholder?: string;
  filterStyle?: CSSProperties | SxProps<Theme>;
  filters?: Filters[];
  onFilter: (value: string[]) => void;
}> = ({ placeholder = "Filter", filters = [], onFilter, filterStyle }) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.grey[300]}`,
        background: theme.palette.grey[100],
        borderRadius: 10,
        cursor: "pointer",
        width: "fit-content",
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        ...filterStyle,
      }}
    >
      <Box
        component="button"
        onClick={() => setIsModalOpen(!isModalOpen)}
        sx={{
          border: "none",
          padding: "6px 16px",
          background: "none",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {placeholder === "Filter" && (
          <Box component="img" src={icons.settings} sx={{ width: 16 }} />
        )}
        <Typography sx={{ color: theme.palette.common.black, fontWeight: 600 }}>
          {placeholder}
        </Typography>
      </Box>
      {isModalOpen && <Modal onFilter={onFilter} filters={filters!} onClose={() => setIsModalOpen(false)} />}
    </Box>
  );
};

const Modal: React.FC<{
  onFilter: (value: string[]) => void;
  filters: Filters[];
  onClose: () => void;
}> = ({ onFilter, filters, onClose }) => {
  const theme = useTheme();
  const [filterState, setFilterState] = useState<{
    [key: number]: { isShown: boolean; selected: string };
  } | null>(null);

  useEffect(() => {
    if (filterState) {
      const selectedFilters = Object.values(filterState).map((f) => f.selected);
      onFilter(selectedFilters);
    }
  }, [filterState]);
  function handleFilterState(index: number) {
    setFilterState((curr) => {
      if (!curr) {
        return {
          [index]: {
            isShown: true,
            selected: "",
          },
        };
      }
      return {
        ...curr,
        [index]: {
          isShown: !curr[index]?.isShown,
          selected: curr[index]?.selected || "",
        },
      };
    });
  }
  return (
    <Box
      sx={{
        position: "absolute",
        left: -240,
        top: 40,
        width: 312,
        zIndex: 999,
        border: `1px solid ${theme.palette.grey[300]}`,
        borderTop: "none",
        background: theme.palette.grey.A200,
      }}
    >
      {filters.map(({ name, options }, index) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // padding: "6px 8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              borderTop: `1px solid ${theme.palette.grey[300]}`,
              borderBottom: `1px solid ${theme.palette.grey[300]}`,
            }}
          >
            <Typography>{name}</Typography>
            <Box
              component="button"
              onClick={() => handleFilterState(index)}
              sx={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <ChevronLeftRounded
                sx={{
                  transform: filterState?.[index]?.isShown
                    ? "rotate(90deg)"
                    : "rotate(-90deg)",
                  color: theme.palette.secondary.main,
                  width: 32,
                  height: 32,
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: filterState?.[index]?.isShown ? "block" : "none",
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
                  checked={filterState?.[index]?.selected === option}
                  onChange={() => {
                    if (filterState?.[index]?.selected === option) {
                      setFilterState((curr) =>
                        curr === null
                          ? null
                          : {
                              ...curr,
                              [index]: {
                                isShown: curr[index]?.isShown || false,
                                selected: "",
                              },
                            }
                      );
                    } else {
                      setFilterState((curr) =>
                        curr === null
                          ? null
                          : {
                              ...curr,
                              [index]: {
                                isShown: curr[index]?.isShown || false,
                                selected: option,
                              },
                            }
                      );
                    }
                  }}
                />
                <Typography
                  sx={{
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
      ))}
    </Box>
  );
};
export default Filter;
