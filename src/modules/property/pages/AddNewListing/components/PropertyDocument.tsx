import { Box, Typography } from "@mui/material";
import { INewListing } from "../type";
import { colors } from "@src/shared/constants/constants";
import CustomButton from "./Button";
import { useEffect, useState } from "react";
import Document from "../assets/Document"
import play from "../assets/play.svg";

const PropertyDocument = ({
  onPageChange,
  newListing,
  setNewListing,
}: {
  onPageChange: (x: string) => void;
  newListing: INewListing;
  setNewListing: (x: INewListing) => void;
  }) => {
  
    const [documents, setDocuments] = useState<
      {
        id: string;
        name: string;
        type: string;
        url?: string;
        purpose: string;
      }[]
    >([]);

    useEffect(() => {
      const docs = newListing.media.filter(
        (x) => x.purpose === "PROPERTY_DOCUMENT"
      );
      setDocuments(docs);
    }, [newListing.media]);
  
  return (
    <Box>
      <Box mb="24px">
        <Typography
          fontSize={18}
          fontWeight={600}
          color={colors.textTitle}
          mb="8px"
        >
          Upload your property documents
        </Typography>
        <Typography fontSize={16} color={colors.textBody}>
          Upload your property documents
        </Typography>
      </Box>
      {documents?.length ? (
        <Box display="flex" flexDirection="column" gap="12px" mb="26px">
          {documents?.map((doc, i) => (
            <Box
              key={i}
              p="8px"
              borderRadius="8px"
              bgcolor={colors.offWhite}
              border={`1px solid ${colors.borderNeutral}`}
              display="flex"
              alignItems="center"
              // justifyContent="space-between"
              gap="12px"
            >
              {doc.type === "video" ? (
                <img
                  src={play}
                  alt="identity"
                  style={{ width: 52, height: 52, borderRadius: "4px" }}
                />
              ) : doc.type === "image" ? (
                <img
                  src={doc.url}
                  alt="identity"
                  style={{ width: 52, height: 52, borderRadius: "4px" }}
                />
              ) : (
                <Document />
              )}
              <Box flex={1}>
                <Typography fontSize={16} color={colors.textBody}>
                  {doc?.name?.length > 25
                    ? doc.name?.slice(0, 25) + "..."
                    : doc.name}
                </Typography>
                <Typography fontSize={16} color={colors.textSubtitle}>
                  {doc.type}
                </Typography>
              </Box>
              {/* <Box onClick={() => handleDeleteImage(doc.id)}>
                <TrashIcon />
              </Box> */}
            </Box>
          ))}
        </Box>
      ) : null}
      {/* <Box mb="26px">
        <CustomButton
          variant="contained"
          buttonStyles={{
            bgcolor: colors.inputBackground,
            height: "40px",
            color: colors.textBody,
          }}
        >
          Add file
        </CustomButton>
      </Box> */}
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

export default PropertyDocument;
