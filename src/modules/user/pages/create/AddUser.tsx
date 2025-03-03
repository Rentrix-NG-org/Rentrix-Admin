import { Box, Typography, useTheme } from "@mui/material";
import UserNav from "../../components/UserNav";
import TextInput from "@src/shared/components/TextInput";
import SelectInput from "@src/shared/components/SelectInput";
import { icons } from "@src/utils/icons";
import { days, months } from "../[userId]/edit/date";
import { useEffect, useState } from "react";
import { UserService } from "../../services/user.service";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { useUserContext } from "../../providers/user.context";
import Unauthorized from "../../components/Unauthorized";

const AddUser = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { permissions } = useUserContext();
  const { addUser } = UserService();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: {
      day: 0,
      month: 0,
      year: 0,
    },
    phoneNumber: "",
    email: "",
    role: "",
    location: "",
  });
  const [formStatus, setFormStatus] = useState<
    "not-set" | "pending" | "success" | "failure"
  >("not-set");

  useEffect(() => {
    if (formStatus === "success" || formStatus === "failure") {
      setTimeout(() => {
        setFormStatus("not-set");
      }, 1000);
    }
  }, [formStatus]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("usertype")) {
      setForm((curr) => ({ ...curr, role: query.get("usertype") }));
    }
    console.log(query);
  }, []);

  async function handleSave() {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.gender ||
      !form.dateOfBirth.day ||
      !form.dateOfBirth.month ||
      !form.dateOfBirth.year ||
      !form.phoneNumber ||
      !form.email ||
      !form.role
    ) {
      setFormStatus("failure");
      alert("Please fill in all required fields.");
      return;
    }

    setFormStatus("pending");

    const formatted = {
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender.toLowerCase(),
      dateOfBirth: dayjs(
        `${form.dateOfBirth.day}-${form.dateOfBirth.month}-${form.dateOfBirth.year}`,
      ).valueOf(),
      phoneNumber: form.phoneNumber,
      email: form.email,
      role:
        form.role === "rentrix-rep"
          ? "representative"
          : form.role.toLowerCase(),
      location: form.location,
    };

    try {
      const response = await addUser(formatted);
      if (response.success) {
        setFormStatus("success");
        setTimeout(() => {
          navigate("/users");
        }, 900);
      }
    } catch (error) {
      console.error("Failed to add user:", error);
      setFormStatus("failure");
    }
  }

  if (permissions.length && !permissions?.includes("user-creation")) {
    return <Unauthorized />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "42.82px",
        px: "20px",
        gap: "25px",
        maxWidth: 656,
      }}
    >
      <UserNav routes={["User Management", "Add New Users"]} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextInput
          containerSx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            background: theme.palette.grey[100],
          }}
          icon={icons.user}
          onChange={(value) => {
            setForm((curr) => ({ ...curr, firstName: value }));
          }}
          label="First Name"
          required
        />
        <TextInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, lastName: value }));
          }}
          containerSx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            background: theme.palette.grey[100],
          }}
          icon={icons.user}
          label="Surname"
          required
        />
        <SelectInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, gender: value }));
          }}
          containerSx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            background: theme.palette.grey[100],
          }}
          icon={icons.usercircle}
          placeholderSx={{ color: theme.palette.grey[600] }}
          label="Gender"
          options={["Male", "Female"]}
          required
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
              placeholderSx={{ color: theme.palette.grey[600] }}
              onChange={(value: string) => {
                setForm((curr) => ({
                  ...curr,
                  dateOfBirth: { ...curr.dateOfBirth, day: parseInt(value) },
                }));
              }}
              containerSx={{
                border: `1px solid ${theme.palette.grey[300]}`,
                background: theme.palette.grey[100],
                height: "auto",
              }}
              label="Day"
              options={days["January"] as unknown as string[]}
            />
            <SelectInput
              placeholderSx={{ color: theme.palette.grey[600] }}
              onChange={(value: string) => {
                setForm((curr) => ({
                  ...curr,
                  dateOfBirth: {
                    ...curr.dateOfBirth,
                    month: months.indexOf(value) + 1,
                  },
                }));
              }}
              containerSx={{
                border: `1px solid ${theme.palette.grey[300]}`,
                background: theme.palette.grey[100],
                height: "auto",
              }}
              label="Month"
              options={months}
            />
            <SelectInput
              placeholderSx={{ color: theme.palette.grey[600] }}
              containerSx={{
                border: `1px solid ${theme.palette.grey[300]}`,
                background: theme.palette.grey[100],
                height: "auto",
              }}
              label="Year"
              options={Array.from(
                { length: new Date().getFullYear() - 1949 },
                (_, i) => (1950 + i).toString(),
              )}
              onChange={(value: string) => {
                setForm((curr) => ({
                  ...curr,
                  dateOfBirth: { ...curr.dateOfBirth, year: parseInt(value) },
                }));
              }}
            />
          </Box>
        </Box>

        <TextInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, phoneNumber: value }));
          }}
          containerSx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            background: theme.palette.grey[100],
          }}
          label="Phone Number"
          icon={icons.call}
          required
        />
        <TextInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, email: value }));
          }}
          containerSx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            background: theme.palette.grey[100],
          }}
          label="Email"
          icon={icons.mail}
          required
        />
        <SelectInput
          value={form.role}
          onChange={(value) => {
            setForm((curr) => ({ ...curr, role: value }));
          }}
          containerSx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            background: theme.palette.grey[100],
          }}
          label="Role"
          icon={icons.usercircle}
          placeholderSx={{ color: theme.palette.grey[600] }}
          options={["Rentrix Rep", "Supervisor", "Admin"]}
          required
        />
        <SelectInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, location: value }));
          }}
          containerSx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            background: theme.palette.grey[100],
          }}
          icon={icons.location}
          typeable
          label="Location"
          options={["12, Amirality Way, Ibadan"]}
        />
      </Box>

      <Box
        component="button"
        onClick={formStatus === "not-set" ? handleSave : () => {}}
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
          mb: 10,
        }}
      >
        <Typography
          sx={{
            color:
              formStatus === "success"
                ? theme.palette.success.main
                : formStatus === "failure"
                  ? theme.palette.error.main
                  : theme.palette.common.white,
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "150%",
          }}
        >
          {formStatus === "success"
            ? "Saved"
            : formStatus === "failure"
              ? "Failed"
              : "Save"}
        </Typography>
      </Box>
    </Box>
  );
};
export default AddUser;
