import { Box, IconButton, Modal} from "@mui/material";
import { IListing, PropertyType } from "@src/modules/property/types";
import { images } from "@src/utils/images";
import Slider from "react-slick";
import ArrowRight from "../../AddNewListing/assets/ArrowRight";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const Hero = ({
  listing = {
    id: "",
    createdAt: "",
    updatedAt: "",
    applications: [],
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

    representative: {
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
    tenants: [],
    media: [],
  },
}: {
  listing?: IListing;
}) => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const colors = {
    offWhite: "#f5f5f5"
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Limit max zoom to 3x
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); // Limit min zoom to 0.5x
  };

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

  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Next onClick={() => {}} />,
    prevArrow: <Prev onClick={() => {}} />,
    // beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const handleImageClick = (index: number) => {
    setCurrentSlide(index);
    setModalOpen(true);
  };

  return (
    <Box sx={{ gap: "15px" }}>
      {/* Main Image Slider */}
      <Box sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
        {listing?.media.length !== 0 ? (
          <Slider {...sliderSettings}>
            {listing?.media?.map((media, index) => (
              <Box key={media.url} sx={{ width: "100%" }}>
                <Box
                  component="img"
                  src={media.url}
                  alt="Property"
                  sx={{
                    width: "100%",
                    minWidth: "1000px",
                    height: "400px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(index)}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Box
              component="img"
              src={images.apartment}
              alt="Default property"
              sx={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(0)}
            />
          </Box>
        )}
      </Box>

      {/* Full Screen Image Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0,0,0,0.9)',
          zIndex: 1300
        }}>
          {/* Close Button - Positioned outside image */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 24,
              top: 24,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.7)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' }
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          {/* Zoom Controls - Positioned outside image */}
          <Box sx={{
            position: 'absolute',
            right: 24,
            bottom: 24,
            display: 'flex',
            gap: 1,
            bgcolor: 'rgba(0,0,0,0.7)',
            borderRadius: 1,
            p: 1
          }}>
            <IconButton onClick={handleZoomOut} color="inherit">
              <ZoomOutIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={handleZoomIn} color="inherit">
              <ZoomInIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Navigation Arrows - Positioned outside image */}
          {listing?.media.length > 1 && (
            <>
              <IconButton
                onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
                sx={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' }
                }}
              >
                <ArrowRight style={{ transform: 'rotate(180deg)', fontSize: '2rem' }} />
              </IconButton>

              <IconButton
                onClick={() => setCurrentSlide(prev => Math.min(prev + 1, listing.media.length - 1))}
                sx={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' }
                }}
              >
                <ArrowRight style={{ fontSize: '2rem' }} />
              </IconButton>
            </>
          )}

          {/* Image Container with minimum 50% size */}
          <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            boxSizing: 'border-box'
          }}>
            <Box
              component="img"
              src={listing?.media[currentSlide]?.url}
              alt="Property preview"
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                minWidth: '50%',
                minHeight: '50%',
                objectFit: 'contain',
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.3s ease',
                cursor: zoomLevel > 1 ? 'grab' : 'pointer'
              }}
              onDoubleClick={handleZoomIn}
            />
          </Box>

          {/* Slide Indicators - Positioned at bottom center */}
          {listing?.media.length > 1 && (
            <Box sx={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1
            }}>
              {listing.media.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Hero;
