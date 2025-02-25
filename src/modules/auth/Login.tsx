import {
  Box,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Input from "../property/pages/AddNewListing/components/Input";
import EmailIcon from "@src/assets/icons/EmailIcon";
import LockIcon from "@src/assets/icons/LockIcon";
import CustomButton from "../property/pages/AddNewListing/components/Button";
import { useNavigate } from "react-router";
import axiosInstance from "@src/core/axios";
import axios from "axios";

const login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bearerToken, setBearerToken] = useState("");
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);

  const login = async (data: any) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);
      setUser(res.data.data);
      setIsAuthenticated(true);
      setBearerToken(res.data.data.token);

      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("jwtToken", JSON.stringify(res.data.data.token));

      setLoading(false);
      setMessage(res.data.message);
      setStatusCode(res.data.statusCode);
      navigate("/users", {replace: true});
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || null; // Get the error status code
        const errorMessage = error.response?.data?.message || error.message; // Get the error message
        setMessage(errorMessage);
        setStatusCode(statusCode);
      }
    }
  };

  const handleSubmit = (e: any) => {
    const loginData = {
      email,
      password,
    };
    e.preventDefault();
    login(loginData);
  };
  return (
    <Box
      width="100vw"
      bgcolor={theme.palette.common.white}
      height="100vh"
      overflow="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" maxWidth="656px">
        <form action="submit" onSubmit={handleSubmit}>
          <Typography
            fontSize="40px"
            fontWeight={600}
            color={theme.palette.secondary.main}
            // mb="12px"
          >
            Welcome back!
          </Typography>
          <Typography
            fontSize={{ xs: "16px", sm: "20px" }}
            mb="32px"
            color="#828B9B"
          >
            Enter your credentials to continue
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            gap={{ xs: "20px", sm: "28px" }}
            mb="32px"
          >
            <Input
              name="email"
              placeholder="Enter email address"
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startIcon={
                <>
                  <Box
                    display={{ xs: "none", sm: "flex" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <EmailIcon />
                  </Box>
                  <Box
                    display={{ xs: "flex", sm: "none" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <EmailIcon width="16px" height="16px" />
                  </Box>
                </>
              }
            />
            <Input
              name="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startIcon={
                <>
                  <Box
                    display={{ xs: "none", sm: "flex" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <LockIcon />
                  </Box>
                  <Box
                    display={{ xs: "flex", sm: "none" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <LockIcon width="16px" height="16px" />
                  </Box>
                </>
              }
            />
          </Box>
          <Box width="100%" display="flex" justifyContent="flex-end" mb="32px">
            <Typography
              fontSize={16}
              color={theme.palette.common.black}
              fontWeight={600}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </Typography>
          </Box>
          <CustomButton
            type="submit"
            variant="contained"
            buttonStyles={{
              height: { xs: "48px", sm: "60px" },
              width: "100%",
              color: theme.palette.common.white,
              mb: { xs: "12px", sm: "28px" },
              background: theme.palette.secondary.main,
              "&:hover": {
                background: theme.palette.secondary.light,
                borderColor: "transparent",
                color: theme.palette.common.white,
              },
            }}
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{ color: theme.palette.common.white }}
              />
            ) : (
              "Log in"
            )}
          </CustomButton>
        </form>
      </Box>
      <Snackbar
        open={message.length ? true : false}
        autoHideDuration={5000}
        // message={message}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <SnackbarContent
          message={message}
          sx={{
            bgcolor:
              statusCode === 201 || statusCode === 200 ? "099137" : "red",
            color: "white",
            zIndex: 9999,
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default login;
