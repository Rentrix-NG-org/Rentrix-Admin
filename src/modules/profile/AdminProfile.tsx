import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserNav from "../user/components/UserNav";
import { ImageEdit } from "../user/pages/[userId]/edit/UserEdit";
import { images } from "@src/utils/images";
import moment from 'moment'

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
    const theme = useTheme()

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) setUser(JSON.parse(getUser));
    else setUser(null);
  }, []);
  return (
    <Box mt="60px" px='20px'>
      <UserNav routes={["Profile", "My Details"]} />
      <Box>
        <Box px="50px">
          <ImageEdit
            value={images.avatar}
            onImage={(v, file) => {
              setImage(file);
            }}
          />
        </Box>
        <Box
          width="fit-content"
          mt="32px"
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
            fontSize="14px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Role:{" "}
            <Typography
              display="inline"
              color={theme.palette.secondary.main}
              textTransform="capitalize"
            >
              {user?.users[0]?.type}
            </Typography>
          </Typography>
          <Typography
            fontSize="14px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Email:{" "}
            <Typography display="inline">{user?.email}</Typography>
          </Typography>
          <Typography
            fontSize="14px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Phone number:{" "}
            <Typography display="inline">
              {user?.users[0]?.phoneNumber}
            </Typography>
          </Typography>
          <Typography
            fontSize="14px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Date of birth:{" "}
            <Typography display="inline">
              {moment(user?.users[0]?.dateOfBirth).format("DD MMM YYYY")}
            </Typography>
          </Typography>
          <Typography
            fontSize="14px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Location: <Typography display="inline">Lagos</Typography>
          </Typography>
          <Typography
            fontSize="14px"
            fontWeight={600}
            color={"#202224"}
            textAlign="center"
          >
            Status:{" "}
            <Typography display="inline" color="#099137">
              {user?.status}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProfile;
