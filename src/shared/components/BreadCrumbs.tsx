import { Box, Typography } from "@mui/material";

interface BreadcrumbsProps {
  url: string;
}

const Breadcrumbs = ({ url }: BreadcrumbsProps) => {
  const segments = url.split("/");
  return (
    <Box>
      {segments.slice(1, segments.length).map((segment, i) => (
        <Typography
          key={i}
          fontSize={20}
          fontWeight={600}
          color={i === segments.length - 2 ? "#00A3A3" : "#222522"}
          textTransform="capitalize"
          display="inline"
        >
          {segment.split("-").join(" ") +
            (i === segments.length - 2 ? "" : " > ")}
        </Typography>
      ))}
    </Box>
  );
};

export default Breadcrumbs;
