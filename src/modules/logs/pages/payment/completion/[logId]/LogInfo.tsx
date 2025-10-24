import { Box, Typography, useTheme } from "@mui/material";
import UserNav from "@src/modules/user/components/UserNav";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const PaymentCompletionInfo = () => {
  const location = useLocation()
  const theme = useTheme();
  const [log, setLog] = useState(null);


  useEffect(() => {
     const info = location.state;
     if (info.tenant) {
       setLog(info);
     }
  }, []);

  const fields: { title: string; value: string }[] = [
    { title: "User ID (Tenant)", value: log?.tenant || "" },
    { title: "User ID (Landlord)", value: log?.landlord || "" },
    { title: "Amount", value: log?.amount || "" },
    { title: "Transaction ID", value: log?.transactionId || "" },
    { title: "Property ID", value: log?.propertyId || "" },
    { title: "Wallet Balance Before", value: log?.walletBalanceBefore || "" },
    { title: "Wallet Balance After", value: log?.walletBalanceAfter || "" },
    { title: "Timestamp", value: log?.timestamp || "" },
    { title: "Device & IP Address", value: log?.device || "" },
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <UserNav
          routes={[
            "Logs",
            "Payment & Transaction Logs",
            "Payment Completion",
            "View",
          ]}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {fields.map(({ title, value }) => (
          <Field title={title} value={value} />
        ))}
      </Box>
    </Box>
  );
};

const Field: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography
        sx={{
          fontSize: "18px",
          fontStyle: "normal",
          color: theme.palette.common.black,
          fontWeight: 600,
          lineHeight: "140%",
          letterSpacing: "-0.36px",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: theme.palette.common.black,
          background: theme.palette.primary.light,
          display: "flex",
          width: "647px",
          padding: "14px 12px",
          alignItems: "center",
          borderRadius: "8px",
          gap: "17px",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "140%",
          letterSpacing: "-0.32px",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
export default PaymentCompletionInfo;
