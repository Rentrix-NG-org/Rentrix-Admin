import { Box, MenuItem, Typography, useTheme } from "@mui/material";
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
import Input from "@src/modules/property/pages/AddNewListing/components/Input";
import { MyLocationTwoTone } from "@mui/icons-material";
import Checked from "@src/modules/property/pages/AddNewListing/assets/Checked";
import EmptyCheckbox from "@src/modules/property/pages/AddNewListing/assets/EmptyCheckbox";

const AddUser = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { permissions } = useUserContext();
  const { addUser, getStates } = UserService();
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
    location: [],
  });
  const [formStatus, setFormStatus] = useState<
    "not-set" | "pending" | "success" | "failure"
  >("not-set");
  const [states, setStates] = useState([]);

  useEffect(() => {
    const getAllStates = async () => {
      const res = await getStates();
      if (res.status === 200) {
        setStates(res.data);
      }
    };

    getAllStates();
  }, []);

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
        `${form.dateOfBirth.day}-${form.dateOfBirth.month}-${form.dateOfBirth.year}`
      ).valueOf(),
      phoneNumber: form.phoneNumber,
      email: form.email,
      role:
        form.role === "rentrix-rep"
          ? "representative"
          : form.role.toLowerCase(),
      stateIds: form.location,
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

  if (!permissions?.includes("user-creation")) {
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
          icon={icons.user}
          onChange={(value) => {
            setForm((curr) => ({ ...curr, firstName: value }));
          }}
          label="First Name"
          required
          value={form.firstName}
        />
        <TextInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, lastName: value }));
          }}
          icon={icons.user}
          label="Surname"
          required
          value={form.lastName}
        />
        <SelectInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, gender: value }));
          }}
          icon={icons.usercircle}
          placeholderSx={{ color: theme.palette.grey[600] }}
          label="Gender"
          options={["Male", "Female"]}
          required
          value={form.gender}
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
                height: "auto",
              }}
              label="Day"
              options={days["January"] as unknown as string[]}
              value={form.dateOfBirth.day}
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
                height: "auto",
              }}
              label="Month"
              options={months}
              value={form.dateOfBirth.month}
            />
            <SelectInput
              placeholderSx={{ color: theme.palette.grey[600] }}
              containerSx={{
                height: "auto",
              }}
              label="Year"
              options={Array.from(
                { length: new Date().getFullYear() - 1949 },
                (_, i) => (1950 + i).toString()
              )}
              onChange={(value: string) => {
                setForm((curr) => ({
                  ...curr,
                  dateOfBirth: { ...curr.dateOfBirth, year: parseInt(value) },
                }));
              }}
              value={form.dateOfBirth.year}
            />
          </Box>
        </Box>

        <TextInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, phoneNumber: value }));
          }}
          label="Phone Number"
          icon={icons.call}
          required
          value={form.phoneNumber}
        />
        <TextInput
          onChange={(value) => {
            setForm((curr) => ({ ...curr, email: value }));
          }}
          label="Email"
          icon={icons.mail}
          required
          value={form.email}
        />
        <SelectInput
          value={form.role}
          onChange={(value) => {
            setForm((curr) => ({ ...curr, role: value }));
          }}
          disabled
          label="Role"
          icon={icons.usercircle}
          placeholderSx={{ color: theme.palette.grey[600] }}
          options={["Admin"]}
          required
        />
        <Input
          label="Location"
          placeholder="Select location"
          select
          options={states?.map((state: any) => state.name)}
          value={states.filter((x) => form.location.includes(x.id)).map((y) => y.name).join(", ")}
          selected={form.location}
          multichoice
          customRender={states?.map((e) => (
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => {
                setForm((curr) => ({
                  ...curr,
                  location: curr.location.includes(e.id)
                    ? curr.location.filter((x) => x !== e.id)
                    : [...curr.location, e.id],
                }));
              }}
            >
              {e.name}
              {form.location?.includes(e.id) ? (
                <Checked />
              ) : (
                <EmptyCheckbox width="20px" height="20px" />
              )}
            </MenuItem>
          ))}
          
          startIcon={<MyLocationTwoTone sx={{ width: 18, height: 18 }} />}
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
