import { Box, useTheme } from "@mui/material";
import UserNav from "@src/modules/user/components/UserNav";
import { useNavigate } from "react-router";

const PaymentTransactions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const categories = [
    // { name: "Payment Initiation", route: "initiation" },
    { name: "Payment Completion", route: "completion" },
    {
      name: "Wallet Transactions(Deposit/Withdrawal)",
      route: "wallet-transactions",
    },
    { name: "Withdrawal Requests (Approved)", route: "withdrawal-requests" },
    { name: "Refund Requests (Manual entry)", route: "refund-requests" },
  ];

  return (
    <Box
      sx={{
        margin: "19px",
        display: "flex",
        flexDirection: "column",
        gap: "31px",
      }}
    >
      <UserNav routes={["Logs", "Payment & Transaction Logs"]} />

      <Box
        sx={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: "20px", lg: "40px", xl: "49px" },
        }}
      >
        {categories.map((category) => (
          <Box
            component="button"
            onClick={() => navigate(category.route)}
            sx={{
              border: `1px solid ${theme.palette.grey[300]}`,
              padding: "16px",
              width: "224px",
              display: "flex",
              alignItems: "center",
              borderRadius: 0.8,
              cursor: "pointer",
              justifyContent: "center",
              height: "71px",
              background: "none",
              lineHeight: "110%",
              // whiteSpace: "nowrap",
              color: theme.palette.common.black,
              "&:hover": {
                background: theme.palette.secondary.main,
                color: theme.palette.common.white,
              },
            }}
          >
            {category.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default PaymentTransactions;
