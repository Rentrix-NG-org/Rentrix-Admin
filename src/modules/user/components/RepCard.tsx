import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const RepCard: React.FC<{
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  location: string;
  status: string;
}> = ({
  id = "",
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
  const navigate = useNavigate();
  const colors: Record<string, { value: string; accent: string }> = {
    tenant: { value: "#9747ff", accent: "#efe3ff" },
    landlord: { value: "#297dfd", accent: "#f7f7ff" },
    suspended: { value: "#cb1a14", accent: "#f7dddc" },
    active: { value: "#099137", accent: "#daefe1" },
    Active: { value: "#099137", accent: "#daefe1" },
    supervisor: { value: "#430c7b", accent: "#e3dbeb" },
    "Rentrix Rep": { value: "#00a3a3", accent: "#e5f6f6" },
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
          onClick={() => {
            navigate(`/users/${id}/edit`);
          }}
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
              color: colors["Rentrix Rep"].value,
              textAlign: "center",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Rentrix Rep
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
            Location:{" "}
            <Typography
              sx={{
                color: theme.palette.grey[600],
                textAlign: "center",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "-0.05px",
                display: 'inline'
              }}
            >
              {location}
            </Typography>
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

export default RepCard;
