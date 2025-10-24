import {
  Box,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
  useTheme,
} from "@mui/material";
import { Log } from "@src/modules/logs/types/log.types";
import UserNav from "@src/modules/user/components/UserNav";
import Modal from "@src/shared/components/Modal";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserService } from "../../services/user.service";
import OTPInput from "react-otp-input";
import { colors, radius } from "@src/shared/constants/constants";
import { addComma } from "@src/modules/property/pages/AddNewListing/components/MainAddListing";

const WithdrawalRequestDetails = () => {
  const theme = useTheme();
  const {
    getWithdrawalRequestDetails,
    approveWithdrawalRequest,
    createPin,
    checkPinStatus,
  } = UserService();
  const param = useParams();
  const [log, setLog] = useState<Log | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showCreatePinModal, setShowCreatePinModal] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  // const navigate = useNavigate();
  const [forcePinChange, setForcePinChange] = useState(false);

  async function handleDeleteLog() {
    // const response = await deleteLog(log?.id || "");
    // if (response.success) {
    //   navigate(-1);
    // }
  }

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

  useEffect(() => {
    async function fetchDetails() {
      const response = await getWithdrawalRequestDetails(param?.id || "");
      if (response.success) {
        const data = response.data as Log;
        setLog({
          ...data,
          createdAt: dayjs(Number(data?.createdAt)).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          status:
            data?.status?.charAt(0).toUpperCase() + data?.status?.slice(1),
        });
      }
    }
    fetchDetails();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);

  const approveRequest = async () => {
    getPinStatus();
    setLoading(true);
    const response = await approveWithdrawalRequest(param?.id || "", {
      adminPin: code,
      notes: "Approved after verification",
    });
    console.log(response, "RESPONSE");
    if (response.success) {
      setSuccessful(true);
      setCode("");
      setShowApprovalModal(false);
    } else {
      setSuccessful(false);
    }
    setLoading(false);
    setMessage(response.message);
  };

  const createAdminPin = async () => {
    setLoading(true);
    const res = await createPin({ pin, confirmPin });
    if (res.success) {
      setPin("");
      setConfirmPin("");
      setShowCreatePinModal(false);
    }
    setLoading(false);
  };

  const fields: { title: string; value: string }[] = [
    { title: "User ID", value: log?.wallet?.account?.id || "" },
    { title: "Acc Type", value: "Unknown" },
    {
      title: "User Name",
      value:
        `${log?.wallet?.account?.users[0].firstName || ""} ${
          log?.wallet?.account?.users[0].lastName || ""
        }` || "",
    },
    { title: "Amount", value: addComma(Number(log?.amount || 0)) || "" },
    { title: "Transaction ID", value: log?.id || "" },
    { title: "Timestamp", value: log?.createdAt || "" },
    { title: "Device & IP Address", value: log?.devices?.join(", ") || "" },
  ];
  return (
    <Box
      sx={{
        margin: "19px",
        display: "flex",
        flexDirection: "column",
        gap: "31px",
      }}
    >
      <title>Request details</title>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <UserNav routes={["User Management", "Withdrawal Request", "View"]} />
        <Box
          component="button"
          onClick={() => {
            setShowDeleteModal(true);
          }}
          sx={{
            border: "none",
            background: theme.palette.secondary.main,
            cursor: "pointer",
            display: "flex",
            width: "178px",
            height: "40px",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "100px",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
            }}
          >
            Delete Log
          </Typography>
        </Box>
        {showDeleteModal && (
          <Modal
            onCancel={() => {
              setShowDeleteModal(false);
            }}
            onConfirm={() => handleDeleteLog()}
            childrenSx={{ gap: 0.5 }}
          >
            <Typography>Are you sure you want to</Typography>
            <Typography
              sx={{ color: theme.palette.secondary.main, fontWeight: 500 }}
            >
              Delete
            </Typography>
            <Typography>this log?</Typography>
          </Modal>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {fields.map(({ title, value }) => (
          <Field title={title} value={value} />
        ))}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontStyle: "normal",
              color: theme.palette.common.black,
              fontWeight: 600,
              lineHeight: "140%",
              letterSpacing: "-0.36px",
            }}
          >
            Status
          </Typography>
          <Typography
            sx={{
              color:
                log?.status?.toLowerCase() === "successful" || log?.status?.toLowerCase() === "processed"
                  ? theme.palette.success.main
                  : log?.status?.toLowerCase() === "pending"
                  ? theme.palette.warning.main
                  : theme.palette.error.main,
              border: `1px solid ${
                log?.status?.toLowerCase() === "successful" || log?.status?.toLowerCase() === "processed"
                  ? theme.palette.success.main
                  : log?.status?.toLowerCase() === "pending"
                  ? theme.palette.warning.main
                  : theme.palette.error.main
              }`,
              width: "fit-content",
              padding: "6px 16px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {log?.status?.toUpperCase()}
          </Typography>
        </Box>
        <Box
          component="button"
          onClick={() => {
            setShowApprovalModal(true);
          }}
          sx={{
            border: "none",
            background: theme.palette.secondary.main,
            cursor: "pointer",
            display: "flex",
            width: "248px",
            height: "48px",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            borderRadius: "100px",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.common.white,
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "140%",
              letterSpacing: "-0.28px",
            }}
          >
            Approve Request
          </Typography>
        </Box>
      </Box>
      {showApprovalModal && (
        <Modal
          onCancel={() => {
            setShowApprovalModal(false);
          }}
          showIcon={step === 1}
          onConfirm={() => {
            if (step === 1) setStep(2);
            if (step === 2) approveRequest();
          }}
          childrenSx={{ gap: 0.5 }}
        >
          {step === 1 ? (
            <>
              <Typography>Are you sure you want to</Typography>
              <Typography
                sx={{ color: theme.palette.secondary.main, fontWeight: 500 }}
              >
                Approve
              </Typography>
              <Typography>this request?</Typography>
            </>
          ) : (
            <Box display="flex" alignItems="center" flexDirection={"column"}>
              <Typography>Enter Pin</Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="22px"
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  <OTPInput
                    value={code}
                    onChange={setCode}
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
                )}
              </Box>
            </Box>
          )}
        </Modal>
      )}
      {(showCreatePinModal || forcePinChange) && (
        <Modal
          showIcon={forcePinChange}
          showActions={showCreatePinModal}
          onCancel={() => {
            setShowCreatePinModal(false);
            setForcePinChange(false);
          }}
          onConfirm={() => {
            if (pin && confirmPin && confirmPin === pin) createAdminPin();
          }}
          childrenSx={{ gap: 0.5 }}
        >
          <Box display="flex" alignItems="center" flexDirection={"column"}>
            {forcePinChange ? (
              <Typography
                sx={{
                  color: colors.textTitle,
                  fontWeight: 600,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Oops! You cannot perform this action now <br /> Visit your
                profile to change your approval pin.
              </Typography>
            ) : (
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
                      <Typography mb="12px">Pin</Typography>
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
                      <Typography mb="12px">Confirm Pin</Typography>
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
                              backgroundColor: !inputProps.value
                                ? colors.inputBackground
                                : pin.includes(confirmPin)
                                ? colors.success
                                : theme.palette.error.light,
                              border: `1px solid ${
                                !inputProps.value
                                  ? colors.borderNeutral
                                  : pin.includes(confirmPin)
                                  ? colors.success400
                                  : theme.palette.error.light
                              }`,
                              textAlign: "center",
                              fontSize: 28,
                              color: !pin.includes(confirmPin)
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
            )}
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

const Field: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography
        sx={{
          fontSize: "18px",
          fontStyle: "normal",
          color: theme.palette.common.black,
          fontWeight: 600,
          lineHeight: "140%",
          letterSpacing: "-0.36px",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: theme.palette.common.black,
          background: theme.palette.primary.light,
          display: "flex",
          width: "647px",
          padding: "14px 12px",
          alignItems: "center",
          borderRadius: "8px",
          gap: "17px",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "140%",
          letterSpacing: "-0.32px",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
export default WithdrawalRequestDetails;
