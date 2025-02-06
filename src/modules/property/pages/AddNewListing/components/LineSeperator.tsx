import { Box } from "@mui/material";
import { colors } from "@src/shared/constants/constants";
import React from "react";

const LineSeperator = () => {
  return <Box width="1px" height="16px" bgcolor={colors.disabled}></Box>;
};

export default LineSeperator;
