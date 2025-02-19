import { Box, Typography, useTheme } from "@mui/material";
import { LogService } from "@src/modules/logs/services/log.service";
import { Log } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
import Modal from "@src/shared/components/Modal";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const AccountDeletionInfo = () => {
  const theme = useTheme();
  const { getLog, deleteLog } = LogService();
  const param = useParams();
  const [log, setLog] = useState<Log | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  async function handleDeleteLog() {
    const response = await deleteLog(log?.id || "");
    if (response.success) {
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchLog() {
      const response = await getLog(param?.logId || "");
      if (response.success) {
        const data = response.data as Log;
        console.log(data, "is data");
        setLog({
          ...data,
          createdAt: dayjs(Number(data.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss",
          ),
          status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
        });
      }
    }
    fetchLog();
  }, []);

  const fields: { title: string; value: string }[] = [
    { title: "User ID", value: log?.account?.id || "" },
    { title: "Reasons", value: log?.action || "" },
    { title: "Timestamp", value: log?.createdAt || "" },
    { title: "Device & IP Address", value: log?.devices?.join(", ") || "" },
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
          showBack={false}
          routes={[
            "Logs",
            "User Account Management",
            "Profile Updates",
            "View",
          ]}
        />

        <Box
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
        </Box>
        {showDeleteModal && (
          <Modal
            onCancel={() => {
              setShowDeleteModal(false);
            }}
            onConfirm={() => handleDeleteLog()}
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
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {fields.map(({ title, value }) => (
          <Field title={title} value={value} />
        ))}
      </Box>
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
export default AccountDeletionInfo;
