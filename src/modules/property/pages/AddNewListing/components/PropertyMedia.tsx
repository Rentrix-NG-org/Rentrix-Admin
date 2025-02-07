import { Box, Typography } from "@mui/material";
import { INewListing } from "../type";
import { useState } from "react";
import { colors } from "@src/shared/constants/constants";
import TrashIcon from "../assets/TrashIcon";
import CustomButton from "./Button";
import axios from "axios";

const PropertyMedia = ({
  onPageChange,
  newListing,
  setNewListing,
}: {
  onPageChange: (x: string) => void;
  newListing: INewListing;
  setNewListing: (x: any) => void;
  }) => {
  
  const convertImageToWebP = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], "image.webp", {
                  type: "image/webp",
                });
                resolve(webpFile);
              } else {
                reject(new Error("Conversion to .webp failed."));
              }
            },
            "image/webp",
            0.8
          );
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handleImageUrl = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    let processedFile = file;

    if (file.type !== "image/webp") {
      const convertedFile = await convertImageToWebP(file);
      if (convertedFile) {
        processedFile = convertedFile;
      }
    }

    const formData = new FormData();
    formData.append("file", processedFile);
    formData.append("upload_preset", "Rentrix_preset");
    formData.append("cloud_name", "ddfnerd87");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ddfnerd87/image/upload",
      formData
    );

    const uploadedImage = res.data;
    return {
      type: uploadedImage.resource_type,
      name: uploadedImage.display_name,
      url: uploadedImage.url,
    };
  };

  const handleImageChange = async (e: any) => {
    const imageUrl = await handleImageUrl(e);
    console.log(imageUrl);
    if (imageUrl) {
      const { url, name, type } = imageUrl;
      setNewListing((prev: INewListing) => ({
        ...prev,
        media: [
          ...(prev.media || []),
          {
            type,
            name,
            url,
          },
        ],
      }));
    }
  };

  const handleDeleteImage = (id: number) => {
    const currentImage = newListing.media.filter((media, i) => id !== i);
    setNewListing((prev: INewListing) => ({
      ...prev,
      media: currentImage,
    }));
  };
  return (
    <Box>
      <Box mb="24px">
        <Typography
          fontSize={18}
          fontWeight={600}
          color={colors.textTitle}
          mb="8px"
        >
          Upload your property images
        </Typography>
        <Typography fontSize={16} color={colors.textBody}>
          Upload images of your properties
        </Typography>
      </Box>
      {newListing.media.length ? (
        <Box display="flex" flexDirection="column" gap="12px" mb="26px">
          {newListing.media.map((media, i) => (
            <Box
              key={i}
              p="8px"
              borderRadius="8px"
              bgcolor={colors.offWhite}
              border={`1px solid ${colors.borderNeutral}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap="12px"
            >
              <img
                src={media.url}
                alt="identity"
                style={{ width: 52, height: 52, borderRadius: "4px" }}
              />
              <Box onClick={() => handleDeleteImage(i)}>
                <TrashIcon />
              </Box>
            </Box>
          ))}
        </Box>
      ) : null}
      <Box display="flex" alignItems="center" gap="12px" mb="26px">
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <CustomButton
          variant="contained"
          buttonStyles={{
            bgcolor: colors.inputBackground,
            height: "40px",
            color: colors.textBody,
          }}
        >
          <label htmlFor={`file`}>
            <p style={{ width: "100%", height: "100%" }}>Add image</p>
          </label>
        </CustomButton>
        <CustomButton
          variant="contained"
          buttonStyles={{
            bgcolor: colors.inputBackground,
            height: "40px",
            color: colors.textBody,
          }}
        >
          Add video
        </CustomButton>
      </Box>
      <Typography fontSize={12} color={colors.textBody} mb="30px">
        We’ll store your uploads securely on our servers for 60 days. After this
        time we will delete them as a security measure.
      </Typography>
      <CustomButton
        variant="contained"
        buttonStyles={{ bgcolor: colors.primary, color: colors.light }}
        onClick={() => onPageChange("main")}
      >
        Save
      </CustomButton>
    </Box>
  );
};

export default PropertyMedia;
