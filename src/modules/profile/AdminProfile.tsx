import { Box, Typography, useTheme } from "@mui/material";
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
  const { updateUser } = UserService();
  const theme = useTheme();
  const date = user?.users[0]?.dateOfBirth
  const formattedDob = moment(Number(date)).format("DD MMM YYYY");

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
  }

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

        {image &&
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
            {loading ? 'Saving....' : 'Save Profile Picture'}
          </CustomButton>
        }
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
    </Box>
  );
};

export default AdminProfile;
