import { Box, Typography, useTheme } from "@mui/material";
import { LogService } from "@src/modules/logs/services/log.service";
import UserNav from "@src/modules/user/components/UserNav";
import Modal from "@src/shared/components/Modal";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const AdminPanelInfo = () => {
  const param = useParams();
  const [admin, setAdmin] = useState<{
    id: string;
    createdAt: string;
    accessModules: string[];
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { getAdmin } = LogService();
  const theme = useTheme();
  const navigate = useNavigate();

  async function handleDeleteLog() {
    setShowDeleteModal(false);
    navigate(-1);
  }

  useEffect(() => {
    async function fetchAdmin() {
      const response = await getAdmin(param?.userId || "0");
      if (response.success) {
        console.log(response.data, "is info");
        setAdmin(response.data);
      }
    }
    fetchAdmin();
  }, []);

  const fields: { title: string; value: string }[] = [
    {
      title: "Admin ID",
      value: admin?.id || "",
    },
    {
      title: "Accessed Modules",
      value: admin?.accessModules.join(", ") || "No Access",
    },
    {
      title: "Timestamps",
      value:
        dayjs(Number(admin?.createdAt)).format("YYYY-MM-DD HH:mm:ss") || "",
    },
    {
      title: "Device & IP Address",
      value: "0.0.0.0",
    },
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
            "Administrative Actions Logs",
            "Admin Panel Access",
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
export default AdminPanelInfo;
