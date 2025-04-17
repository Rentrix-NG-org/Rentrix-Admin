import { Box, Typography, useTheme } from "@mui/material";
import LogTable from "@src/shared/components/LogTable";
import { icons } from "@src/utils/icons";
import UserNav from "../../components/UserNav";
import { UserService } from "../../services/user.service";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

type ActivityType =
  | "login-event"
  | "update"
  | "download"
  | "payment-made"
  | "document-viewed";

const types: Record<ActivityType, string> = {
  "login-event": "Login Event",
  update: "Update",
  download: "Download",
  "payment-made": "Payment Made",
  "document-viewed": "Document Viewed",
};

const AdminDetails = () => {
  const { getUserAdmin } = UserService();
  const activityTypes = useMemo(() => types, []);

  const params = useParams();
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    photoUrl: "",
    roles: [""],
    phoneNumber: "",
    dateOfBirth: "",
    account: { email: "", status: "", logs: [] },
    logs: [],
    locations: [],
  });
  const [logs, setLogs] = useState([
    {
      date: "",
      time: "",
      activityType: "",
      details: "",
    },
  ]);

  const columns: { label: string; header: string; type: "text" | "custom" }[] =
    [
      { header: "Date", label: "date", type: "text" },
      { header: "Time", label: "time", type: "text" },
      { header: "Activity Type", label: "activityType", type: "text" },
      { header: "Details", label: "details", type: "text" },
    ];

  useEffect(() => {
    async function fetchUser() {
      const response = await getUserAdmin(params?.userId || "");
      if (response.success) {
        console.log(response.data);
        setAdmin(response.data);
      }
    }
    fetchUser();
  }, [params]);

  useEffect(() => {
    if (admin.account.logs.length > 0) {
      const formattedLogs = admin.account.logs.map((log: any) => {
        return {
          date: dayjs(Number(log.createdAt)).format("DD MMM YYYY"),
          time: dayjs(Number(log.createdAt)).format("HH:mm"),
          activityType: activityTypes[log.activityType as ActivityType],
          details: log.description,
        };
      });
      setLogs(formattedLogs);
    }
  }, [admin, activityTypes]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "42.82px",
        px: "20px",
        gap: "25px",
      }}
    >
      <UserNav routes={["User Management", "User Details"]} />

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <AdminCard
          firstName={admin.firstName}
          lastName={admin.lastName}
          photoUrl={admin.photoUrl}
          email={admin.account.email}
          phoneNumber={admin.phoneNumber}
          dateOfBirth={admin.dateOfBirth}
          location={
            admin.locations.length ? admin.locations.join(", ") : "No Location"
          }
          status={admin.account.status}
        />

        <Options />
      </Box>
      <LogTable columns={columns} data={logs} />
    </Box>
  );
};
export default AdminDetails;

const Options = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const buttons: {
    title: string;
    route?: string;
    icon?: string;
  }[] = [
    { title: "Change Role", route: "change-role", icon: icons.useradd },
    {
      title: "Change Location",
      route: "change-location",
      icon: icons.location,
    },
    { title: "Grant Access", route: "grant-access", icon: icons.lock },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: 300,
        mr: 20,
      }}
    >
      {buttons.map(({ title, route, icon }) => (
        <Box
          sx={{
            height: "60px",
            width: "100%",
            border: "none",
            borderRadius: "100px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.grey[200],
            justifyContent: "center",
            cursor: "pointer",
            gap: "8px",
          }}
          onClick={() => {
            navigate(route);
          }}
          component="button"
        >
          <Box component="img" src={icon} sx={{ width: 18, height: 18 }} />

          <Typography
            sx={{
              fontWeight: 600,
              color: theme.palette.grey[800],
            }}
          >
            {title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const AdminCard: React.FC<{
  firstName: string;
  lastName: string;
  photoUrl: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  location: string;
  status: string;
}> = ({
  firstName = "",
  lastName = "",
  photoUrl = "",
  email = "",
  phoneNumber = "",
  dateOfBirth = "",
  location = "",
  status = "",
}) => {
  const theme = useTheme();
  const colors: Record<string, { value: string; accent: string }> = {
    tenant: { value: "#9747ff", accent: "#efe3ff" },
    landlord: { value: "#297dfd", accent: "#f7f7ff" },
    suspended: { value: "#cb1a14", accent: "#f7dddc" },
    active: { value: "#099137", accent: "#daefe1" },
    Active: { value: "#099137", accent: "#daefe1" },
    supervisor: { value: "#430c7b", accent: "#e3dbeb" },
    Admin: { value: "#63c5c5", accent: "#e5f6f6" },
    Default: { value: "#002b5b", accent: "#cce3fc" },
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 315,
        background: theme.palette.grey[100],
        display: "flex",
        gap: "9px",
        flexDirection: "column",
        padding: "17px 31px",
        borderRadius: "18px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Box
          component="img"
          src={photoUrl || icons.profilehead}
          sx={{
            width: 100,
            height: 100,
            transform: "translateX(12px)",
            borderRadius: "50%",
          }}
        />

        <Box
          component="button"
          sx={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <Box
            component="img"
            src={icons.edit}
            sx={{ width: 18, height: 18 }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 700, color: theme.palette.common.black }}>
          {firstName} {lastName}
        </Typography>
        <Box sx={{ display: "flex", gap: 0.2 }}>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Role:
          </Typography>
          <Typography
            sx={{
              color: colors["Admin"].value,
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Admin
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.2 }}>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Email:
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            {email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.2 }}>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Phone :
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            {phoneNumber}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.2 }}>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Date of Birth :
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            {dayjs(Number(dateOfBirth)).format("DD MMM, YYYY")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.2 }}>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Location :
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            {location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 0.2 }}>
          <Typography
            sx={{
              color: theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Status :
          </Typography>
          <Typography
            sx={{
              color:
                status === "Active".toLowerCase()
                  ? theme.palette.success.main
                  : theme.palette.grey[600],
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
