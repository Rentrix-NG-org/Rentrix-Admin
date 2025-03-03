import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import Input from "../property/pages/AddNewListing/components/Input";
import CustomButton from "../property/pages/AddNewListing/components/Button";
import EmailIcon from "@src/assets/icons/EmailIcon";
import { useNavigate } from "react-router";
import { icons } from "@src/utils/icons";
import axiosInstance from "@src/core/axios";
import axios from "axios";

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [_, setMessage] = useState("");
  const [__, setStatusCode] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const forgotPass = async (data: any) => {
    setLoading(true);
    try {
      const res = await axiosInstance.patch("/admin/forgotPassword", data);
      setMessage(res.data.message);
      setLoading(false);
      setIsSent(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.status || null; // Get the error status code
        const errorMessage = error.response?.data?.message || error.message; // Get the error message
        setMessage(errorMessage);
        setStatusCode(errorCode);
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    const data = {
      email,
    };
    e.preventDefault();
    forgotPass(data);
  };

  return (
    <Box
      width="100vw"
      bgcolor={isSent ? "rgba(0, 0, 0, 0.4)" : theme.palette.common.white}
      height="100vh"
      overflow="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" maxWidth={isSent ? "733px" : "656px"}>
        {isSent ? (
          <Box
            p="32px"
            borderRadius="12px"
            bgcolor={theme.palette.common.white}
          >
            <Box display="flex" alignItems="flex-start">
              <Box flex={1} display="flex" justifyContent="center">
                <Box component="img" src={icons.info} sx={{ width: 56 }} />
              </Box>
              <Box
                onClick={() => navigate("/login")}
                component="img"
                src={icons.cancel}
              />
            </Box>
            <Box>
              <Typography
                mt="24px"
                mb="32px"
                fontSize={19}
                fontWeight={600}
                color="#32363C"
                textAlign="center"
              >
                Please wait while your request is being processed. <br /> An
                admin will call you to confirm your request. <br /> If you did
                not get a call or approval within 24 hours, contact your
                Supervisor.
              </Typography>
              <CustomButton
                onClick={() => navigate("/login")}
                variant="contained"
                buttonStyles={{
                  height: { xs: "48px", sm: "60px" },
                  width: "100%",
                  color: theme.palette.common.black,
                  mb: { xs: "12px", sm: "28px" },
                  background: "#F0F1F3",
                  "&:hover": {
                    background: "#F0F1F3",
                    borderColor: "transparent",
                    color: theme.palette.common.black,
                  },
                }}
              >
                Cancel
              </CustomButton>
            </Box>
          </Box>
        ) : (
          <form action="submit" onSubmit={handleSubmit}>
            <Typography
              fontSize="40px"
              fontWeight={600}
              color={theme.palette.secondary.main}
            >
              Forgot Password?
            </Typography>
            <Typography
              fontSize={{ xs: "16px", sm: "20px" }}
              mb="32px"
              color="#828B9B"
            >
              No worries, enter the email associated with your account and we
              will send you reset instructions.
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
                "Send"
              )}
            </CustomButton>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPassword;
