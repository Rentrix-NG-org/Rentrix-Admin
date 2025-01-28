import { Box, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";
import { ListingType } from "../types/user.types";
import { useEffect, useState } from "react";

const Listing: React.FC<{ listing: Partial<ListingType> }> = ({ listing }) => {
  const theme = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(1);
  const features: { icon: string; name: string; value: string | number }[] = [
    { icon: icons.bed, name: "Bed", value: listing.bedrooms },
    { icon: icons.shower, name: "Bath", value: listing.bathrooms },
    { icon: icons.toilet, name: "Toilet", value: listing.toilets },
  ];

  useEffect(() => {
    const image = new Image();
    image.onload = () => setImageLoaded(true);
    image.src = listing.media[currentMedia - 1].url;
  }, [currentMedia, listing.media]);

  function handleMedia() {
    if (currentMedia === listing.media.length) {
      setCurrentMedia(1);
    } else {
      setCurrentMedia(currentMedia + 1);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        background: theme.palette.grey[200],
        borderRadius: "16.704px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%", position: "relative" }}>
        <Box
          component="img"
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
          }}
          src={imageLoaded ? listing.media[0].url : icons.apartment}
        />

        <Box
          sx={{
            position: "absolute",
            boxSizing: "border-box",
            display: "flex",
            width: "100%",
            bottom: "10.02px",
            px: "10.02px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "3.34px",
              padding: "3.34px 6.68px",
              background: theme.palette.common.white,
              border: `1px solid ${theme.palette.success.main}`,
              borderRadius: "83.518px",
            }}
          >
            <Box
              sx={{
                background: theme.palette.grey[200],
                width: "6px",
                height: "6px",
                position: "relative",
                borderRadius: "50%",
                "&::after": {
                  position: "absolute",
                  content: "''",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 999,
                  width: 4,
                  height: 4,
                  background: theme.palette.success.main,
                  borderRadius: "50%",
                },
              }}
            ></Box>

            <Typography
              sx={{
                color: theme.palette.success.main,
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "120%",
                letterSpacing: "0.5px",
              }}
            >
              {listing.availabilityStatus.toUpperCase()}
            </Typography>
          </Box>

          <Box
            component="button"
            onClick={handleMedia}
            sx={{
              display: "flex",
              background: theme.palette.grey[700],
              height: "20.044px",
              padding: "3.341px 13.363px",
              justifyContent: "center",
              alignItems: "center",
              gap: "1px",
              border: "none",
              borderRadius: "83.518px",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "120%",
                letterSpacing: "0.6px",
              }}
            >
              {currentMedia}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "120%",
                letterSpacing: "0.6px",
              }}
            >
              /
            </Typography>
            <Typography
              sx={{
                color: theme.palette.common.white,
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "120%",
                letterSpacing: "0.6px",
              }}
            >
              {listing.media.length}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "13.36px",
          padding: "16px",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.common.black,
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "120%",
            letterSpacing: "-0.32px",
          }}
        >
          {listing.title}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            color: "rgba(0, 0, 0, 0.50)",
            textOverflow: "ellipsis",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "150%",
            letterSpacing: "-0.28px",
          }}
        >
          {listing.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: `1px solid ${theme.palette.grey[300]}`,
          borderBottom: `1px solid ${theme.palette.grey[300]}`,
          alignItems: "center",
          justifyContent: "space-between",
          mt: "6.68px",
          marginX: "16px",
        }}
      >
        {features.map(({ icon, name, value }, index) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6.88px",
              padding: "6.88px",
              justifyContent: "center",
              borderRight:
                features.length === index + 1
                  ? "none"
                  : `1px solid ${theme.palette.grey[300]}`,
            }}
          >
            <Box
              component="img"
              src={icon || icons.settings}
              sx={{ width: 14 }}
            />
            <Typography
              sx={{
                color: theme.palette.primary.main,
                textAlign: "center",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "140%",
                letterSpacing: "-0.28px",
              }}
            >
              {value} {name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "16.7px",
          padding: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1.67px" }}>
          <Box
            component="img"
            src={icons.naira}
            sx={{ width: "15.033px", height: "15.033px" }}
          />
          <Typography
            sx={{
              color: theme.palette.common.black,
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "120%",
              letterSpacing: "-0.48px",
            }}
          >
            {Number(listing.fee.fee) >= 1000000
              ? `${Number(listing.fee.fee) / 1000000}M`
              : Number(listing.fee.fee) >= 1000
                ? `${Number(listing.fee.fee) / 1000}K`
                : listing.fee.fee.toLocaleString()}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[700],
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "100%",
              letterSpacing: "-0.48px",
              mt: 0.5,
              transform: "translateX(-2px)",
            }}
          >
            / {listing.fee.rentalPeriod}
          </Typography>
        </Box>

        <Box
          component="button"
          sx={{
            border: `1px solid ${theme.palette.grey[300]}`,
            background: theme.palette.common.white,
            display: "flex",
            padding: "13.36px",
            borderRadius: "83.518px",
            gap: "6.68px",
            alignItems: "center",
            justifyContent: "center",
            height: "30.066px",
            width: "126.112px",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src={icons.eyecolored}
            sx={{
              width: "13.363px",
              height: "13.363px",
            }}
          />
          <Typography
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "11.692px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "140%",
              letterSpacing: "-0.234px",
            }}
          >
            View Rental
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Listing;
