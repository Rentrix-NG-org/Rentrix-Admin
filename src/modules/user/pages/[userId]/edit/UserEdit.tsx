import { Box, Typography, useTheme } from "@mui/material";
import UserNav from "@src/modules/user/components/UserNav";
import SelectInput from "@src/shared/components/SelectInput";
import TextInput from "@src/shared/components/TextInput";
import { icons } from "@src/utils/icons";
import { days, months } from "./date";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { UserService } from "@src/modules/user/services/user.service";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { MediaService } from "@src/shared/services/media.service";
import Input from "@src/modules/property/pages/AddNewListing/components/Input";

const UserEdit = () => {
  const theme = useTheme();
  const { updateUser, getUser } = UserService();
  const { uploadFile } = MediaService();
  const params = useParams();
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState<
    "not-set" | "pending" | "success" | "failure"
  >("not-set");
  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState({
    photoUrl: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: { day: 0, month: "", year: 0 },
    roles: [],
    role: "",
    phoneNumber: "",
    email: "",
  });
  useEffect(() => {
    async function fetchUser() {
      const response = await getUser(params?.userId || "");

      if (response.success) {
        const { data } = response;

        const getMonth =
          months[
            Number(dayjs(Number(data.account.dateOfBirth)).format("M")) - 1
          ];
        setForm((curr) => ({
          ...curr,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phoneNumber: data.phoneNumber || "",
          photoUrl: data.photoUrl || "",
          role: data.type,
          roles: data.roles,
          email: data.account.email || "",
          gender: data.account.gender || "unknown",
          dateOfBirth: {
            day:
              Number(dayjs(Number(data.account.dateOfBirth)).format("D")) || 0,
            month: getMonth || "",
            year:
              Number(dayjs(Number(data.account.dateOfBirth)).format("YYYY")) ||
              0,
          },
        }));
      }
    }
    fetchUser();
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

  async function handleSave() {
    setFormStatus("pending");
    if (!form.firstName || !form.lastName || !form.phoneNumber || !form.email) {
      setFormStatus("failure");
      alert("Fill in the required field");
    } else {
      const dateOfBirth = dayjs(
        `${form.dateOfBirth.year}-${months.indexOf(form.dateOfBirth.month) + 1}-${form.dateOfBirth.day}`,
      ).valueOf();

      const url = await uploadImage();

      const constructed = {
        ...form,
        gender: form.gender.toLowerCase(),
        dateOfBirth,
        photoUrl: url,
      };

      const response = await updateUser(params?.userId || "", constructed);
      if (response.success) {
        setFormStatus("success");

        setTimeout(() => {
          navigate(-1);
        }, 1000);
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
        <ImageEdit
          value={form.photoUrl}
          onImage={(v, file) => {
            setForm((curr) => ({ ...curr, photoUrl: v }));
            setImage(file);
          }}
        />
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

        {["representative", "supervisor", "admin"].includes(form.role) && (
          <Input
            value={
              form.role === "representative"
                ? "Rentrix Rep"
                : `${form.role.charAt(0).toUpperCase()}${form.role.slice(1).toLowerCase()}`
            }
            label="Role"
            select
            selected={
              form.role === "representative" ? "rentrix-rep" : form.role
            }
            multichoice
            options={["Rentrix Rep", "Admin", "Supervisor"]}
            onSelect={(value: string) => {
              setForm((curr) => ({
                ...curr,
                role:
                  value === "Rentrix Rep"
                    ? "representative"
                    : value.toLowerCase(),
              }));
            }}
          />
        )}
        <Box
          component="button"
          onClick={formStatus === "not-set" ? handleSave : () => {}}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            padding: "16px",
            backgroundColor:
              formStatus === "pending"
                ? theme.palette.grey[400]
                : formStatus === "success"
                  ? theme.palette.success.main
                  : formStatus === "failure"
                    ? theme.palette.error.main
                    : theme.palette.secondary.main,
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
            {formStatus === "pending"
              ? "Saving..."
              : formStatus === "success"
                ? "Saved!"
                : formStatus === "failure"
                  ? "Failed to Save"
                  : "Save"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ImageEdit: React.FC<{
  onImage: (value: string, file: File) => void;
  value: string;
}> = ({ onImage, value }) => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(value || null);

  useEffect(() => {
    if (value) {
      setImage(value);
    }
  }, [value]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target || !e.target.files) return;
    const file = e.target.files[0];
    const validImageTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/jpg",
    ];

    if (!validImageTypes.includes(file.type)) {
      alert("Only Images with format PNG, JPEG, WEBP and JPG are allowed");
    }
    const url = URL.createObjectURL(file);
    onImage(url, file);
    setImage(url);
  }
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
        onChange={handleFileChange}
        ref={inputRef}
        component="input"
        type="file"
        hidden
      />
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
            src={image || icons.profilehead}
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
        <Box
          onClick={() => inputRef.current?.click()}
          component="button"
          sx={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
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
