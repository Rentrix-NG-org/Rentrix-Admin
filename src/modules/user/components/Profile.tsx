import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { User } from "../types/user.types";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const Profile: React.FC<{ user: Partial<User> }> = ({ user }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const userDetails: { label: string; value: string }[] = [
    { label: "Email", value: user?.account?.email || "" },
    { label: "Phone Number", value: user?.phoneNumber || "" },
    {
      label: "Date of Birth",
      value:
        dayjs(Number(user?.dateOfBirth)).format("DD MMM YYYY").toString() || "",
    },
  ];

  const colors: Record<string, { value: string; accent: string }> = {
    Tenant: { value: "#9747ff", accent: "#efe3ff" },
    Landlord: { value: "#297dfd", accent: "#f7f7ff" },
    suspended: { value: "#cb1a14", accent: "#f7dddc" },
    active: { value: "#099137", accent: "#daefe1" },
    Supervisor: { value: "#430c7b", accent: "#e3dbeb" },
    "Rentrix Rep": { value: "#00a3a3", accent: "#e5f6f6" },
    enabled: { value: "#002b5b", accent: "#cce3fc" },
    Default: { value: "#002b5b", accent: "#cce3fc" },
  };

  const userRoles = {
    representative: "Rentrix Rep",
    tenant: "Tenant",
    landlord: "Landlord",
    supervisor: "Supervisor",
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "14px",
          color: theme.palette.common.black,
        }}
      >
        Profile Details
      </Typography>
      <Box
        sx={{
          background: theme.palette.background.default,
          padding: "29px",
          borderRadius: "18px",
          display: "flex",
          alignItems: "flex-start",
          gap: "57.7px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "19px",
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              overflow: "hidden",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: theme.palette.grey[300],
            }}
          >
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "50%",
                width: user?.photoUrl ? 180 : 200,
                height: user?.photoUrl ? 180 : 200,
              }}
            >
              <Box
                component="img"
                src={user?.photoUrl || icons.profilehead}
                sx={{ width: "100%" }}
              />
            </Box>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 700,
              color: theme.palette.common.black,
              lineHeight: "normal",
              letterSpacing: "-0.057px",
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {userDetails.map(({ label, value }) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.palette.common.black,
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.palette.grey[700],
                }}
              >
                {value}
              </Typography>
            </Box>
          ))}

          <Box sx={{ display: "flex", gap: "14px" }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.palette.common.black,
              }}
            >
              Roles:
            </Typography>
            {user?.roles &&
              user.roles.map((role) => {
                const roleKey = role as keyof typeof userRoles;
                return (
                  <Box
                    sx={{
                      background: colors?.[userRoles[roleKey]]?.accent,
                      padding: "6px 16px",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors?.[userRoles[roleKey]]?.value,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {userRoles[roleKey]}
                    </Typography>
                  </Box>
                );
              })}
          </Box>

          <Box sx={{ display: "flex", gap: "14px" }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.palette.common.black,
              }}
            >
              Status:
            </Typography>
            <Box
              sx={{
                background:
                  colors?.[user?.account?.status || "Default"]?.accent,
                padding: "6px 16px",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  color: colors?.[user?.account?.status || "Default"]?.value,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {user?.account?.status?.slice(0, 1).toUpperCase()}
                {user?.account?.status?.slice(1)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          component="button"
          onClick={() => navigate("edit")}
          sx={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            ml: "auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Box component="img" src={icons.edit} />
          <Typography
            sx={{
              color: theme.palette.common.black,
              textAlign: "center",
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.05px",
            }}
          >
            Edit
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Profile;
