import {
  Box,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserNav from "../user/components/UserNav";
import { ImageEdit } from "../user/pages/[userId]/edit/UserEdit";
// import { images } from "@src/utils/images";
import { icons } from "@src/utils/icons";
import CustomButton from "../property/pages/AddNewListing/components/Button";
import moment from "moment";
import { MediaService } from "@src/shared/services/media.service";
import { UserService } from "../user/services/user.service";
import Modal from "@src/shared/components/Modal";
import OTPInput from "react-otp-input";
import { colors, radius } from "@src/shared/constants/constants";

export interface User {
  id: string;
  email: string;
  role: string;
  status: string;
  gender: string;
  dateOfBirth: string;
  users: {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    type: string;
    photoUrl: string;
    updatedAt: string;
    createdAt: string;
    dateOfBirth: string;
    location: string;
  }[];
}

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { uploadFile } = MediaService();
  const { updateUser, checkPinStatus, createPin, changePin } = UserService();
  const theme = useTheme();
  const date = user?.users[0]?.dateOfBirth;
  const formattedDob = moment(Number(date)).format("DD MMM YYYY");
  const [showCreatePinModal, setShowCreatePinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [forcePinChange, setForcePinChange] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) setUser(JSON.parse(getUser));
    else setUser(null);
  }, []);

  async function uploadImage() {
    const formData = new FormData();
    if (!image) {
      return null;
    }
    formData.append("file", image, image.name);
    const response = await uploadFile(formData);
    if (response.success) {
      return response.data.data.url as string;
    }
    return null;
  }

  const uploadProfilePicture = async () => {
    try {
      setLoading(true);
      const url = await uploadImage();

      const constructed = {
        photoUrl: url,
      };

      const response = await updateUser(user?.users[0]?.id, constructed);
      if (response.success) {
        const updatedUser = {
          ...user,
          users: [
            {
              ...user.users[0],
              photoUrl: url,
            },
          ],
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setImage(null);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPinStatus = async () => {
    const res = await checkPinStatus();
    if (res.hasPin) {
      setShowCreatePinModal(false);
      setForcePinChange(false);
    } else if (res.forcedPinChange) {
      setForcePinChange(true);
      setShowCreatePinModal(false);
      return;
    } else {
      setShowCreatePinModal(true);
      setForcePinChange(false);
      return;
    }
  };

  useEffect(() => {
    getPinStatus();
  }, []);

  const createAdminPin = async () => {
    setLoading(true);
    const res = await createPin({ pin, confirmPin });
    if (res.success) {
      setPin("");
      setConfirmPin("");
      setShowCreatePinModal(false);
      setForcePinChange(false);
      setSuccessful(true);
    } else {
      setSuccessful(false);
    }
    setMessage(res.message);
    setLoading(false);
  };

  const changeAdminPin = async () => {
    setLoading(true);
    const res = await changePin({ currentPin: pin, newPin: confirmPin });
    if (res.success) {
      setPin("");
      setConfirmPin("");
      setShowCreatePinModal(false);
      setForcePinChange(false);
      setSuccessful(true);
    } else {
      setSuccessful(false);
    }
    setMessage(res.message);
    setLoading(false);
  };

  return (
    <Box mt="60px" px="20px">
      <UserNav routes={["Profile", "My Details"]} />
      <Box width="fit-content" mt="25px">
        <Box display="flex" justifyContent="center">
          <ImageEdit
            value={user?.users[0]?.photoUrl || icons.avatar}
            onImage={(__, file) => {
              setImage(file);
            }}
          />
        </Box>

        {image && (
          <CustomButton
            disabled={loading}
            onClick={uploadProfilePicture}
            variant="contained"
            buttonStyles={{
              height: { xs: "34px", sm: "34px" },
              mt: "16px",
              color: theme.palette.common.white,
              background: theme.palette.secondary.main,
              "&:hover": {
                background: theme.palette.secondary.light,
                borderColor: "transparent",
                color: theme.palette.common.white,
              },
            }}
          >
            {loading ? "Saving...." : "Save Profile Picture"}
          </CustomButton>
        )}
        <Box
          width="fit-content"
          my="32px"
          display="flex"
          flexDirection="column"
          gap="8px"
        >
          <Typography
            fontSize="16px"
            fontWeight={700}
            color={"#202224"}
            textAlign="center"
          >
            {user?.users[0]?.firstName} {user?.users[0]?.lastName}
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Role:{" "}
            <span
              style={{
                display: "inline",
                color: theme.palette.secondary.main,
                textTransform: "capitalize",
              }}
            >
              {user?.users[0]?.type}
            </span>
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Email: <span style={{ display: "inline" }}>{user?.email}</span>
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Phone number:{" "}
            <span style={{ display: "inline" }}>
              {user?.users[0]?.phoneNumber
                ? user?.users[0]?.phoneNumber
                : "No phone number"}
            </span>
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Date of birth:{" "}
            <span style={{ display: "inline" }}>{formattedDob}</span>
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Location:{" "}
            <span style={{ display: "inline" }}>
              {user?.users[0]?.location
                ? user?.users[0]?.location
                : "No location"}
            </span>
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Status:{" "}
            <span
              style={{
                display: "inline",
                color: "#099137",
                textTransform: "capitalize",
              }}
            >
              {user?.status}
            </span>
          </Typography>
        </Box>
      </Box>
      <CustomButton
        onClick={() => navigate("/admin/profile/change-password")}
        variant="contained"
        buttonStyles={{
          height: { xs: "48px", sm: "48px" },
          width: "287px",
          fontSize: "16px",
          color: theme.palette.common.white,
          background: theme.palette.secondary.main,
          "&:hover": {
            background: theme.palette.secondary.light,
            borderColor: "transparent",
            color: theme.palette.common.white,
          },
        }}
      >
        Change Password
      </CustomButton>
      {(showCreatePinModal || forcePinChange) && (
        <Modal
          showIcon={false}
          onCancel={() => {
            setShowCreatePinModal(false);
            setForcePinChange(false);
          }}
          onConfirm={() => {
            if (forcePinChange) {
              if (pin && confirmPin) changeAdminPin();
              return;
            }
            if (pin && confirmPin && confirmPin === pin) createAdminPin();
          }}
          childrenSx={{ gap: 0.5 }}
        >
          <Box display="flex" alignItems="center" flexDirection={"column"}>
            <Typography>
              {forcePinChange ? "Change Pin" : "Create Pin"}
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt="22px"
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={"column"}
                  gap="16px"
                >
                  <Box>
                    <Typography mb="12px">
                      {forcePinChange ? "Current Pin" : "Pin"}
                    </Typography>
                    <OTPInput
                      value={pin}
                      onChange={setPin}
                      containerStyle={{ border: "none" }}
                      numInputs={6}
                      renderSeparator={
                        <Box width={{ xs: "8px", sm: "28px" }}></Box>
                      }
                      renderInput={(inputProps, index) => (
                        <input
                          key={index}
                          {...inputProps}
                          className="input"
                          placeholder="*"
                          autoComplete="one-time-code"
                          name={`otp-${Math.random()}`}
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: radius.rounded,
                            backgroundColor: inputProps.value
                              ? colors.success
                              : colors.inputBackground,
                            border: `1px solid ${
                              inputProps.value
                                ? colors.success400
                                : colors.borderNeutral
                            }`,
                            textAlign: "center",
                            fontSize: 28,
                            color: "#111311",
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography mb="12px">
                      {forcePinChange ? "New Pin" : "Confirm Pin"}
                    </Typography>
                    <OTPInput
                      value={confirmPin}
                      onChange={setConfirmPin}
                      containerStyle={{ border: "none" }}
                      numInputs={6}
                      renderSeparator={
                        <Box width={{ xs: "8px", sm: "28px" }}></Box>
                      }
                      renderInput={(inputProps, index) => (
                        <input
                          key={index}
                          {...inputProps}
                          className="input"
                          placeholder="*"
                          autoComplete="one-time-code"
                          name={`otp-${Math.random()}`}
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: radius.rounded,
                            backgroundColor: forcePinChange
                              ? inputProps.value
                                ? colors.success
                                : colors.inputBackground
                              : !inputProps.value
                              ? colors.inputBackground
                              : pin.includes(confirmPin)
                              ? colors.success
                              : theme.palette.error.light,
                            border: forcePinChange
                              ? `1px solid ${
                                  inputProps.value
                                    ? colors.success400
                                    : colors.borderNeutral
                                }`
                              : `1px solid ${
                                  !inputProps.value
                                    ? colors.borderNeutral
                                    : pin.includes(confirmPin)
                                    ? colors.success400
                                    : theme.palette.error.light
                                }`,
                            textAlign: "center",
                            fontSize: 28,
                            color: forcePinChange
                              ? "#111311"
                              : !pin.includes(confirmPin)
                              ? "white"
                              : "#111311",
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Modal>
      )}
      <Snackbar
        open={message && message.length ? true : false}
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
            bgcolor: successful ? "#099137" : "red",
            color: "white",
            zIndex: 9999,
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default AdminProfile;
