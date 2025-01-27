import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { images } from "@src/utils/images";
import React from "react";

const TransactionHistory = () => {
  const LATEST_TRANSACTIONS = [
    {
      profileImg: images.avatar,
      fullName: "John Smith",
      date: "15 Oct 2023",
      amount: 50,
      currencyIcon: icons.naira,
      status: "pending" as const,
    },
    {
      profileImg: images.avatar,
      fullName: "Sarah Johnson",
      date: "14 Oct 2023",
      amount: 25,
      currencyIcon: icons.naira,
      status: "pending" as const,
    },
    {
      profileImg: images.avatar,
      fullName: "Mike Wilson",
      date: "13 Oct 2023",
      amount: 75,
      currencyIcon: icons.naira,
      status: "pending" as const,
    },
  ];
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "14px",
            color: theme.palette.common.black,
          }}
        >
          Transaction History
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {LATEST_TRANSACTIONS.map((transaction, index) => (
            <Transaction
              key={index}
              profileImg={transaction.profileImg}
              fullName={transaction.fullName}
              date={transaction.date}
              amount={transaction.amount}
              currencyIcon={transaction.currencyIcon}
              status={transaction.status}
            />
          ))}
        </Box>
      </Box>
      <Box
        component="button"
        sx={{
          background: theme.palette.grey[500],
          border: "none",
          padding: "16px",
          color: "white",
          cursor: "pointer",
          mt: "8px",
          display: "flex",
          width: "178px",
          borderRadius: "100px",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "140%",
            letterSpacing: "-0.28px",
          }}
        >
          View all
        </Typography>
      </Box>
    </Box>
  );
};

const Transaction: React.FC<{
  profileImg: string;
  fullName: string;
  date: string;
  amount: number;
  currencyIcon: string;
  status: "successful" | "pending" | "failed";
}> = ({
  profileImg,
  fullName,
  date,
  amount,
  currencyIcon = icons.naira,
  status,
}) => {
  const theme = useTheme();
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
          {fullName}
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
          {date}
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
            {amount}K
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              background: theme.palette.success.main,
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
              color: theme.palette.success.main,
            }}
          >
            {status}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default TransactionHistory;
