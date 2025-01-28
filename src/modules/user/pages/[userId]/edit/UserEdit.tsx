import { Box, Typography, useTheme } from "@mui/material";
import UserNav from "@src/modules/user/components/UserNav";
import { icons } from "@src/utils/icons";

const UserEdit = () => {
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

      <Box>
        <ImageEdit />
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
