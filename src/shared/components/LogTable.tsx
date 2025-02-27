import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const LogTable: React.FC<{
  columns: { label: string; header: string }[];
  data: any[];
}> = ({ columns, data }) => {
  const [rows, setRows] = useState<string[][]>([]);
  const theme = useTheme();

  useEffect(() => {
    const formatted = data.map((d) => Object.values(d)) as string[][];
    setRows(formatted);
    // console.log(formatted, "f");
  }, [data]);
  return (
    <Box sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          background: theme.palette.secondary.main,
          color: theme.palette.common.white,
          padding: "10px",
        }}
      >
        {columns.map((column) => (
          <Typography
            key={column.label}
            sx={{
              color: theme.palette.common.white,
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "150%",
            }}
          >
            {column.header}
          </Typography>
        ))}
      </Box>

      <Box sx={{}}>
        {rows.map((row, index) => (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
            }}
          >
            {row.map((cell, cellIndex) => (
              <Typography
                sx={{
                  padding: "10px",
                  borderBottom:
                    index + 1 === rows.length
                      ? "none"
                      : `1px solid ${theme.palette.grey[300]}`,
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: theme.palette.common.black,
                }}
                key={`${index}-${cellIndex}`}
              >
                {cell}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default LogTable;
