import { ChevronLeftRounded } from "@mui/icons-material";
import { Box, Checkbox, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { useState } from "react";

const Filter: React.FC<{ placeholder?: string }> = ({
  placeholder = "Filter",
}) => {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.grey[300]}`,
        background: theme.palette.grey[100],
        borderRadius: 10,
        cursor: "pointer",
        width: 99,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
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
        <Box component="img" src={icons.settings} sx={{ width: 16 }} />
        <Typography sx={{ color: theme.palette.common.black, fontWeight: 600 }}>
          {placeholder}
        </Typography>
      </Box>
      {isModalOpen && <Modal />}
    </Box>
  );
};

const Modal = () => {
  const theme = useTheme();
  const [filterState, setFilterState] = useState<{
    [key: number]: { isShown: boolean; selected: string };
  } | null>(null);
  console.log(filterState, "state");
  const filters = [
    { name: "Status", options: ["Active", "Suspended"] },
    { name: "Role", options: ["Landlord", "Tenant", "Rentrix Rep"] },
  ];

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
                    setFilterState((curr) =>
                      curr === null
                        ? null
                        : {
                            ...curr,
                            [index]: {
                              isShown: curr[index]?.isShown || false,
                              selected: option,
                            },
                          },
                    );
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
