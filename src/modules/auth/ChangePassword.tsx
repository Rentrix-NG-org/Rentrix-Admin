import {
  Box,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserNav from "../user/components/UserNav";
import Input from "../property/pages/AddNewListing/components/Input";
import LockIcon from "@src/assets/icons/LockIcon";
import CustomButton from "../property/pages/AddNewListing/components/Button";
import axios from "axios";
import axiosInstance from "@src/core/axios";
import { User } from "../profile/AdminProfile";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) setUser(JSON.parse(getUser));
    else setUser(null);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 6000);
  });

  const changePass = async (data: any) => {
    setLoading(true);
    try {
      await axiosInstance.patch(
        `/admin/${user?.users[0]?.id}/changePassword`,
        data,
      );

      setLoading(false);
      setMessage("Password changed successfully!");
      setStatusCode(200);
      setPassword("");
      setConfirmPassword("");
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
    const data = {
      password,
    };
    e.preventDefault();
    changePass(data);
  };
  return (
    <Box mt="60px" px="20px">
      <UserNav routes={["Profile", "My Details", "Change Password"]} />
      <Box mt="25px" width="100%" maxWidth="408px">
        <form action="submit" onSubmit={handleSubmit}>
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
                  <LockIcon width="16px" height="16px" />
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
          <Input
            name="confirmPassword"
            placeholder="Confirm your password"
            label="Confirm Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            inputContainerStyles={{ mt: "16px" }}
            startIcon={
              <>
                <Box
                  display={{ xs: "none", sm: "flex" }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <LockIcon width="16px" height="16px" />
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
          <CustomButton
            disabled={
              loading ||
              !confirmPassword ||
              password !== confirmPassword ||
              !user
            }
            type="submit"
            variant="contained"
            buttonStyles={{
              height: { xs: "48px", sm: "48px" },
              width: "287px",
              fontSize: "16px",
              mt: "32px",
              color: theme.palette.common.white,
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
              "Save"
            )}
          </CustomButton>
        </form>
      </Box>
      <Snackbar
        open={message?.length ? true : false}
        autoHideDuration={5000}
        // message={message}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarContent
          message={message}
          sx={{
            bgcolor:
              statusCode === 201 || statusCode === 200 ? "#099137" : "red",
            color: "white",
            zIndex: 9999,
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default ChangePassword;
