import { Box, Button, Typography, useTheme } from "@mui/material";

const Unauthorized = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 2,
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="h4" color="error">
        Unauthorized Access
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, fontSize: "16px" }}>
        You cannot access this page. You may not have the required permissions.
      </Typography>
      <Button
        variant="contained"
        onClick={() => window.history.back()}
        sx={{
          width: 300,
          padding: 2,
          borderRadius: "100px",
          bgcolor: theme.palette.secondary.main,
        }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default Unauthorized;
