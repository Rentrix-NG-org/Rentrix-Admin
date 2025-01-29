import { Box, Typography, useTheme } from "@mui/material";
import UserNav from "@src/modules/user/components/UserNav";
import SelectInput from "@src/shared/components/SelectInput";
import TextInput from "@src/shared/components/TextInput";
import { icons } from "@src/utils/icons";
import { days, months } from "./date";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { UserService } from "@src/modules/user/services/user.service";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const UserEdit = () => {
  const theme = useTheme();
  const { updateUser, getUser } = UserService();
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: { day: 0, month: "", year: 0 },
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await getUser(params?.userId || "");

      if (response.success) {
        console.log(response.data);
        const { data } = response;

        const getMonth =
          months[
            Number(dayjs(Number(data.account.dateOfBirth)).format("M")) - 1
          ];
        setForm((curr) => ({
          ...curr,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          email: data.account.email,
          gender: data.account.gender,
          dateOfBirth: {
            day: Number(dayjs(Number(data.account.dateOfBirth)).format("D")),
            month: getMonth,
            year: Number(
              dayjs(Number(data.account.dateOfBirth)).format("YYYY"),
            ),
          },
        }));
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(form, "is form");
  }, [form]);

  async function handleSave() {
    if (!form.firstName || !form.lastName || !form.phoneNumber || !form.email) {
      alert("Fill in the required field");
    } else {
      const dateOfBirth = dayjs(
        `${form.dateOfBirth.year}-${months.indexOf(form.dateOfBirth.month) + 1}-${form.dateOfBirth.day}`,
      ).valueOf();

      const constructed = {
        ...form,
        gender: form.gender.toLowerCase(),
        dateOfBirth,
      };

      const response = await updateUser(params?.userId || "", constructed);

      if (response.success) {
        navigate(-1);
      }
    }
  }
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
          <TextInput
            value={form.firstName}
            onChange={(value) => {
              setForm((curr) => ({ ...curr, firstName: value }));
            }}
            label="First Name"
            icon={icons.user}
            required
          />
          <TextInput
            value={form.lastName}
            label="Surname"
            icon={icons.user}
            required
            onChange={(value) => {
              setForm((curr) => ({ ...curr, lastName: value }));
            }}
          />
          <SelectInput
            value={form.gender}
            label="Gender"
            icon={icons.usercircle}
            options={["Male", "Female"]}
            onChange={(value: string) => {
              setForm((curr) => ({ ...curr, gender: value }));
            }}
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
                value={form.dateOfBirth.day}
                label="Day"
                icon={icons.usercircle}
                options={days["January"] as unknown as string[]}
                onChange={(value: string) => {
                  setForm((curr) => ({
                    ...curr,
                    dateOfBirth: { ...curr.dateOfBirth, day: parseInt(value) },
                  }));
                }}
              />
              <SelectInput
                value={form.dateOfBirth.month}
                label="Month"
                icon={icons.usercircle}
                options={months}
                onChange={(value: string) => {
                  setForm((curr) => ({
                    ...curr,
                    dateOfBirth: {
                      ...curr.dateOfBirth,
                      month: value,
                    },
                  }));
                }}
              />
              <SelectInput
                value={form.dateOfBirth.year}
                label="Year"
                icon={icons.usercircle}
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
            value={form.phoneNumber}
            label="Phone Number"
            type="text"
            icon={icons.call}
            required
            onChange={(value) => {
              setForm((curr) => ({ ...curr, phoneNumber: value }));
            }}
          />
          <TextInput
            value={form.email}
            label="Email Address"
            icon={icons.mail}
            required
            onChange={(value) => {
              setForm((curr) => ({ ...curr, email: value }));
            }}
          />
        </Box>
        <Box
          component="button"
          onClick={handleSave}
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
