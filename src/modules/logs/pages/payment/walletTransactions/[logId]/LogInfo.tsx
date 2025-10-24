import { Box, Typography, useTheme } from "@mui/material";
// import { LogService } from "@src/modules/logs/services/log.service";
// import { Log } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
// import Modal from "@src/shared/components/Modal";
// import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const WalletTransactionsInfo = () => {
  const location = useLocation();
  const theme = useTheme();
  // const { getLog, deleteLog } = LogService();
  // const param = useParams();
  const [log, setLog] = useState(null);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const navigate = useNavigate();

  // async function handleDeleteLog() {
  //   const response = await deleteLog(log?.id || "");
  //   if (response.success) {
  //     navigate(-1);
  //   }
  // }

  useEffect(() => {
    const info = location.state;
    if (info.userId) {
      setLog(info);
    }
  }, []);

  const fields: { title: string; value: string }[] = [
    { title: "User ID", value: log?.userId || "" },
    { title: "Transaction Type", value: log?.transactionType || "" },
    {
      title: "Amount",
      value: log?.amount || "",
    },
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
            "Wallet Transactions (Deposit/Withdrawal)",
            "View",
          ]}
        />
        {/* <Box
          component="button"
          onClick={() => {
            setShowDeleteModal(true);
          }}
          sx={{
            border: "none",
            background: theme.palette.secondary.main,
            cursor: "pointer",
            display: "flex",
            width: "178px",
            height: "40px",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "100px",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
            }}
          >
            Delete Log
          </Typography>
        </Box> */}
        {/* {showDeleteModal && (
          <Modal
            onCancel={() => {
              setShowDeleteModal(false);
            }}
            // onConfirm={() => handleDeleteLog()}
            childrenSx={{ gap: 0.5 }}
          >
            <Typography>Are you sure you want to</Typography>
            <Typography
              sx={{ color: theme.palette.secondary.main, fontWeight: 500 }}
            >
              Delete
            </Typography>
            <Typography>this log?</Typography>
          </Modal>
        )} */}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {fields.map(({ title, value }) => (
          <Field title={title} value={value} />
        ))}
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
            Status
          </Typography>
          <Typography
            sx={{
              color:
                log?.status?.toLowerCase() === "successful"
                  ? theme.palette.success.main
                  : log?.status?.toLowerCase() === "pending"
                  ? theme.palette.warning.main
                  : theme.palette.error.main,
              border: `1px solid ${
                log?.status?.toLowerCase() === "successful"
                  ? theme.palette.success.main
                  : log?.status?.toLowerCase() === "pending"
                  ? theme.palette.warning.main
                  : theme.palette.error.main
              }`,
              width: "fit-content",
              padding: "6px 16px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {log?.status?.toUpperCase()}
          </Typography>
        </Box>
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
export default WalletTransactionsInfo;
