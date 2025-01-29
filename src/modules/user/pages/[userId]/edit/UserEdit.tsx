import { Box, Typography, useTheme } from "@mui/material";
import UserNav from "@src/modules/user/components/UserNav";
import SelectInput from "@src/shared/components/SelectInput";
import TextInput from "@src/shared/components/TextInput";
import { icons } from "@src/utils/icons";
import { days, months } from "./date";

const UserEdit = () => {
  const theme = useTheme();
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
      <UserNav
        routes={["User Management", "User Details", "Edit User Details"]}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          width: 700,
        }}
      >
        <ImageEdit />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <TextInput label="First Name" icon={icons.user} required />
          <TextInput label="Surname" icon={icons.user} required />
          <SelectInput
            label="Gender"
            icon={icons.usercircle}
            options={["Male", "Female"]}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Typography
              sx={{
                color: theme.palette.common.black,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "140%",
                letterSpacing: "-0.32px",
              }}
            >
              Date of Birth
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SelectInput
                label="Day"
                icon={icons.usercircle}
                options={days["January"] as unknown as string[]}
              />
              <SelectInput
                label="Month"
                icon={icons.usercircle}
                options={months}
              />
              <SelectInput
                label="Year"
                icon={icons.usercircle}
                options={Array.from(
                  { length: new Date().getFullYear() - 1949 },
                  (_, i) => (1950 + i).toString(),
                )}
              />
            </Box>
          </Box>

          <TextInput
            label="Phone Number"
            type="number"
            icon={icons.call}
            required
          />
          <TextInput label="Email Address" icon={icons.mail} required />
        </Box>
        <Box
          component="button"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            padding: "16px",
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            borderRadius: "100px",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "150%",
            }}
          >
            Save
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ImageEdit = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: theme.palette.grey[300],
          borderRadius: "50%",
          flexDirection: "column",
          width: "fit-content",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: "50%",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={icons.profilehead}
            sx={{
              width: "90%",
              height: "90%",
              borderRadius: "50%",

              objectFit: "cover",
            }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 2,
            right: 2,
            background: theme.palette.primary.dark,
            height: 24,
            width: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: `1px solid ${theme.palette.common.white}`,
          }}
        >
          <Box
            component="img"
            src={icons.camera}
            sx={{ width: 16, height: 16 }}
          />
        </Box>
      </Box>

      <Box>
        <Box sx={{ border: "none", backgroundColor: "transparent" }}>
          <Typography
            sx={{
              color: theme.palette.common.black,
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "145%",
              letterSpacing: "-0.28px",
              textDecoration: "underline",
              textUnderlineOffset: "5px",
            }}
          >
            Change Image
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default UserEdit;
