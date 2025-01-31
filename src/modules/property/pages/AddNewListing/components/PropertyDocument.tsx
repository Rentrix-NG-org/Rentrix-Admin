import { Box, Typography } from '@mui/material';
import React from 'react'
import { INewListing } from '../type';
import { colors } from '@src/shared/constants/constants';
import CustomButton from './Button';

const PropertyDocument = ({
  onPageChange,
  newListing,
  setNewListing,
}: {
  onPageChange: (x: string) => void;
  newListing: INewListing;
  setNewListing: (x: INewListing) => void;
}) => {
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
      <Box mb="26px">
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

export default PropertyDocument
