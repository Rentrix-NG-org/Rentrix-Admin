import { Box } from "@mui/material";
import { IListing, PropertyType } from "@src/modules/property/types";
import { colors } from "@src/shared/constants/constants";
import { images } from "@src/utils/images";
import Slider from "react-slick";
import ArrowRight from "../../AddNewListing/assets/ArrowRight";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = ({
  listing = {
    id: "",
    createdAt: "",
    updatedAt: "",
    status: "under-offer",
    title: "",
    description: "",
    label: "",
    currentlyLivedIn: false,
    availabilityStatus: "",
    category: "",
    type: "",
    propertyType: PropertyType.Apartment,
    amenities: [""],
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parkingSpace: 0,
    interiorFeatures: [],
    exteriorFeatures: [],
    kitchenFittings: [],
    interiorFlooring: "",
    exteriorFlooring: "",
    furnishedType: "",
    servicing: "",
    propertyAge: "",
    lotSize: 0,
    floorArea: 0,
    builtYear: 0,
    builtMonth: "",
    floorLevel: 0,
    isDraft: false,
    fee: {
      fee: "",
      legalFee: "",
      serviceFee: "",
      cautionFee: "",
      estateFee: "",
      otherFees: [],
      rentalPeriod: "",
      priceCurrency: "",
    },
    location: {
      id: "",
      address: "",
      nearestLandmark: "",
      streetName: "",
      propertyNumber: 0,
      city: {
        name: "",
        country: {
          name: "",
        },
      },
    },
    owner: {
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      photoUrl: null,
      dateOfBirth: "",
      type: "",
      account: {
        id: "",
        email: "",
      },
    },
    media: [],
  },
}: {
  listing?: IListing;
}) => {
  const Next = ({ onClick }: { onClick: any }) => {
    return (
      <Box
        width="40px"
        height="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={"100px"}
        bgcolor={colors.offWhite}
        sx={{ position: "absolute", right: -20, top: "50%", cursor: "pointer" }}
        onClick={onClick}
      >
        <ArrowRight fill="black" />
      </Box>
    );
  };
  const Prev = ({ onClick }: { onClick: any }) => {
    return (
      <Box
        width="40px"
        height="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius={"100px"}
        bgcolor={colors.offWhite}
        sx={{
          transform: "scale(-1)",
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: -20,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <ArrowRight fill="black" />
      </Box>
    );
  };

  const settings = {
    //  dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Next onClick={() => {}} />,
    prevArrow: <Prev onClick={() => {}} />,
  };
  return (
    <Box
      sx={{
        // display: "flex",
        gap: "15px",
        // padding: { xs: 0, sm: "0 20px", md: "0 73px" },
      }}
    >
      <Box
        // overflow="auto"
        sx={{
          // display: "flex",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {listing?.media.length !== 0 ? (
          <Slider {...settings}>
            {listing?.media?.map((x) => (
              <Box
                sx={{
                  // display: "flex",
                  width: "100%",
                }}
              >
                <Box
                  component="img"
                  src={x.url}
                  alt=""
                  sx={{
                    width: "100%",
                    minWidth: "1000px",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={images.apartment}
              alt=""
              sx={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Hero;
