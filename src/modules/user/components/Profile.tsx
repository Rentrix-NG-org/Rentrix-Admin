import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { images } from "@src/utils/images";

const Profile = () => {
  const theme = useTheme();

  const userDetails: { label: string; value: string }[] = [
    { label: "Email", value: "johndoe@example.com" },
    { label: "Phone Number", value: "+123 456 789 012" },
    { label: "Date of Birth", value: "09 Nov 1890" },
  ];

  const colors: Record<string, { value: string; accent: string }> = {
    Tenant: { value: "#9747ff", accent: "#efe3ff" },
    landlord: { value: "#297dfd", accent: "#f7f7ff" },
    suspended: { value: "#cb1a14", accent: "#f7dddc" },
    Active: { value: "#099137", accent: "#daefe1" },
    supervisor: { value: "#430c7b", accent: "#e3dbeb" },
    "Rentrix Rep": { value: "#00a3a3", accent: "#e5f6f6" },
    Default: { value: "#002b5b", accent: "#cce3fc" },
  };

  const userRoles = ["Tenant", "Rentrix Rep"];

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
                width: 180,
                height: 180,
              }}
            >
              <Box component="img" src={images.avatar} sx={{ width: "100%" }} />
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
            John Doe
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
            {userRoles.map((role) => (
              <Box
                sx={{
                  background: colors?.[role]?.accent,
                  padding: "6px 16px",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  sx={{
                    color: colors?.[role]?.value,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {role}
                </Typography>
              </Box>
            ))}
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
                background: colors["Active"].accent,
                padding: "6px 16px",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  color: colors["Active"].value,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Active
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          component="button"
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
