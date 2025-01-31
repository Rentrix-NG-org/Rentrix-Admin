import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Input from "./Input";
import { colors, text } from "@src/shared/constants/constants";
import NairaIcon from "../assets/NairaIcon";

interface PriceRangeProps {
  min?: number;
  max?: number;
  rangeValue: number[];
  onSlide: (value: number[]) => void;
  updateRange?: boolean;
}

const PriceRange = ({
  min,
  max,
  rangeValue,
  onSlide,
  updateRange = true,
}: PriceRangeProps) => {
  const [minVal, setMinVal] = useState<string>(String(min));
  const [maxVal, setMaxVal] = useState<string>(String(max));

  const handleSliderChange = (value: any) => {
    onSlide(value);
  };

  useEffect(() => {
    handleSliderChange([Number(minVal), Number(maxVal)]);
  }, [minVal, maxVal])

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="0px"
      >
        <Box display="flex" alignItems="center">
          <NairaIcon width="12px" height="12px" />
          <Typography
            fontSize="14px"
            color={colors.textBody}
            fontWeight={text.weightBold}
          >
            {rangeValue[0]}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <NairaIcon width="12px" height="12px" />
          <Typography
            fontSize="14px"
            color={colors.textBody}
            fontWeight={text.weightBold}
          >
            {rangeValue[1]}
          </Typography>
        </Box>
      </Box>
      <Slider
        range
        min={min}
        max={max}
        allowCross={false}
        defaultValue={rangeValue}
        onChange={handleSliderChange}
        styles={{
          track: {
            backgroundColor: colors.primary,
            height: "4px",
          },
          handle: {
            borderColor: colors.borderNeutral,
            height: "8px",
            width: "8px",
            marginTop: "-2px",
            backgroundColor: colors.textBody,
          },
          rail: {
            backgroundColor: colors.disabled,
            height: "4px",
          },
        }}
      />
      {updateRange && (
        <Box
          display="flex"
          alignItems="center"
          gap="16px"
          mt="20px"
          width="100%"
        >
          <Input
            value={minVal}
            onChange={(e) => setMinVal(e.target.value)}
            startIcon={<NairaIcon />}
            placeholder="Min"
            // inputContainerStyles={{ width: "100%" }}
            type="numeric"
          />
          <Input
            value={maxVal}
            onChange={(e) => setMaxVal(e.target.value)}
            startIcon={<NairaIcon />}
            placeholder="Max"
            // inputContainerStyles={{ width: "100%" }}
            type="numeric"
          />
        </Box>
      )}
    </Box>
  );
};

export default PriceRange;
