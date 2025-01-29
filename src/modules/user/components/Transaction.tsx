import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { images } from "@src/utils/images";
import dayjs from "dayjs";

const Transaction: React.FC<{
  profileImg: string;
  description: string;
  date: string;
  amount: number;
  currencyIcon: string;
  status: "successful" | "pending" | "failed";
}> = ({
  profileImg,
  description,
  date,
  amount,
  currencyIcon = icons.naira,
  status,
}) => {
  const theme = useTheme();
  const statusColors = {
    success: theme.palette.success.main,
    failed: theme.palette.error.main,
    pending: theme.palette.warning.main,
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "12px",
        borderRadius: "12px",
        border: `2px solid ${theme.palette.grey[300]}`,
        background: theme.palette.grey[200],
        gap: "12px",
      }}
    >
      <Box
        sx={{ borderRadius: "50%", overflow: "hidden", width: 48, height: 48 }}
      >
        <Box
          component="img"
          src={profileImg || images.avatar}
          sx={{ width: 48 }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Typography
          sx={{
            color: theme.palette.common.black,
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "140%",
            letterSpacing: "-0.32px",
          }}
        >
          {description}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            color: theme.palette.grey[600],
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        >
          {dayjs(Number(date)).format("MMMM DD, YYYY")}
        </Typography>
      </Box>
      <Box
        sx={{
          ml: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={currencyIcon}
            sx={{
              width: 16,
              height: 16,
            }}
          />
          <Typography
            sx={{
              color: theme.palette.common.black,
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "140%",
              letterSpacing: "-0.32px",
            }}
          >
            {amount >= 1000000
              ? `${(amount / 1000000).toFixed(1)}M`
              : `${(amount / 1000).toFixed(1)}K`}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              background: statusColors[status as keyof typeof statusColors],
              borderRadius: "50%",
            }}
          ></Box>
          <Typography
            sx={{
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "120%",
              letterSpacing: "-0.24px",
              color: statusColors[status as keyof typeof statusColors],
            }}
          >
            {status.slice(0, 1).toUpperCase()}
            {status.slice(1)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Transaction;
