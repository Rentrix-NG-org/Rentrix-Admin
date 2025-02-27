import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserNav from "../user/components/UserNav";
import { ImageEdit } from "../user/pages/[userId]/edit/UserEdit";
import { images } from "@src/utils/images";
import moment from "moment";
import CustomButton from "../property/pages/AddNewListing/components/Button";

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
  }[];
}

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) setUser(JSON.parse(getUser));
    else setUser(null);
  }, []);
  return (
    <Box mt="60px" px="20px">
      <UserNav routes={["Profile", "My Details"]} />
      <Box width="fit-content" mt='25px'>
        <Box display="flex" justifyContent="center">
          <ImageEdit
            value={images.avatar}
            onImage={(v, file) => {
              setImage(file);
            }}
          />
        </Box>
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
              {user?.users[0]?.phoneNumber}
            </span>
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Date of birth:{" "}
            <span style={{ display: "inline" }}>
              {moment(user?.users[0]?.dateOfBirth).format("DD MMM YYYY")}
            </span>
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Location: <span style={{ display: "inline" }}>Lagos</span>
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
