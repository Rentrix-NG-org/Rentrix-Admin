import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { INewListing } from "../type";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import { colors, text } from "@src/shared/constants/constants";
import CustomButton from "./Button";
import PriceRange from "./PriceRange";

const PropertyDetails = ({
  onPageChange,
  newListing,
  setNewListing,
}: {
  onPageChange: (x: string) => void;
  newListing: INewListing;
  setNewListing: (x: any) => void;
}) => {
  const [selectedPropertyType, setSelectedPropertyType] =
    useState("Residential");
  // const [selectedType, setSelectedType] = useState<string[]>([]);
  // const [rentalPeriod, setRentalPeriod] = useState("Yearly");
  // const [furnishType, setFurnishType] = useState("Furnished");
  // const [bedroom, setBedroom] = useState("");
  // const [bathroom, setBathroom] = useState("");
  // const [toilet, setToilet] = useState("");
  const [valueRange, setValueRange] = useState([0, 100]);
  // const [propertyType, setPropertyType] = useState("");
  // const [apartmentService, setApartmentService] = useState("Serviced");
  // const [propertyAge, setPropertyAge] = useState("Renovated");
  // const [lotSize, setLotSize] = useState("");
  // const [floorArea, setFloorArea] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  // const [floorLevel, setFloorLevel] = useState("");
  const [selectedInteriorFeatures, setSelectedInteriorFeatures] = useState<
    string[]
  >([]);
  const [selectedExteriorFeatures, setSelectedExteriorFeatures] = useState<
    string[]
  >([]);
  const [selectedKitchenFitting, setSelectedKitchenFitting] = useState<
    string[]
  >([]);
  // const [selectedExteriorFlooring, setSelectedExteriorFlooring] =
  //   useState<string>("");
  // const [selectedInteriorFlooring, setSelectedInteriorFlooring] =
  //   useState<string>("");

  useEffect(() => {
    setSelectedKitchenFitting(newListing.kitchenFittings);
    setSelectedExteriorFeatures(newListing.exteriorFeatures);
    setSelectedInteriorFeatures(newListing.interiorFeatures);
    setSelectedPropertyType(newListing.category);
  }, [newListing]);
  return (
    <Box>
      <Box mb="20px">
        <MultiSelect
          options={["Residential", "Commercial"]}
          selected={newListing.category}
          onSelect={(e) => {
            setNewListing((prev: INewListing) => ({
              ...prev,
              category: e.toLowerCase(),
            }));
          }}
        />
      </Box>
      <Box mb="20px">
        <Input
          select
          placeholder="Select property type"
          options={
            selectedPropertyType === "residential"
              ? [
                  "Flat",
                  "Apartment",
                  "Semi-detached bungalow",
                  "Detached bungalow",
                  "Semi-detach duplex",
                  "Detached duplex",
                  "Self contain",
                  "Studio apartment",
                  "Terraced bungalow",
                  "Terraced duplex",
                ]
              : [
                  "Retail space",
                  "Office space",
                  "Industrial unit",
                  "Warehouse",
                  "Factory",
                ]
          }
          value={newListing.type}
          onSelect={(e) => {
            setNewListing((prev: INewListing) => ({
              ...prev,
              type: e.toLowerCase().split(" ").join("-"),
            }));
          }}
        />
      </Box>
      {selectedPropertyType === "residential" && (
        <Box sx={{ mb: "20px" }}>
          <Typography
            fontSize={text.small}
            color={colors.textBody}
            fontWeight={text.weightSemiBold}
            mb="12px"
          >
            Bedrooms
          </Typography>
          <MultiSelect
            options={["Studio", 1, 2, 3, 4, 5, "6+"]}
            selected={newListing.bedrooms}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                bedrooms: typeof e === "string" ? e.toLowerCase() : e,
              }));
            }}
          />
        </Box>
      )}
      <Box sx={{ mb: "20px" }}>
        <Typography
          fontSize={text.small}
          color={colors.textBody}
          fontWeight={text.weightSemiBold}
          mb="12px"
        >
          Bathrooms
        </Typography>
        <MultiSelect
          options={[1, 2, 3, 4, "5+"]}
          selected={newListing.bathrooms}
          onSelect={(e) => {
            setNewListing((prev: INewListing) => ({
              ...prev,
              bathrooms: typeof e === "string" ? e.toLowerCase() : e,
            }));
          }}
        />
      </Box>
      <Box sx={{ mb: "20px" }}>
        <Typography
          fontSize={text.small}
          color={colors.textBody}
          fontWeight={text.weightSemiBold}
          mb="12px"
        >
          Toilets
        </Typography>
        <MultiSelect
          options={[1, 2, 3, 4, "5+"]}
          selected={newListing.toilets}
          onSelect={(e) => {
            setNewListing((prev: INewListing) => ({
              ...prev,
              toilets: typeof e === "string" ? e.toLowerCase() : e,
            }));
          }}
        />
      </Box>
      {selectedPropertyType === "Commercial" && (
        <Box sx={{ mb: "20px" }}>
          <Typography
            fontSize={text.small}
            color={colors.textBody}
            fontWeight={text.weightSemiBold}
            mb="12px"
          >
            Parking Space
          </Typography>
          <MultiSelect
            options={[1, 2, 3, 4, "5+"]}
            selected={newListing.parkingSpace}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                parkingSpace: typeof e === "string" ? e.toLowerCase() : e,
              }));
            }}
          />
        </Box>
      )}
      {/* <Box mb="16px">
        <MultiCheckbox
          options={
            selectedPropertyType === "residential"
              ? [
                  "Flats",
                  "Apartments",
                  "Semi-detached bungalow",
                  "Detached bungalow",
                ]
              : ["Retail space", "Office space", "Industrial unit", "Warehouse"]
          }
          selected={type}
          onSelect={setType}
        />
      </Box> */}
      <Box sx={{ mb: "20px" }}>
        <Typography
          fontSize={text.small}
          color={colors.textBody}
          fontWeight={text.weightSemiBold}
          mb="12px"
        >
          Rental Period
        </Typography>
        <MultiSelect
          options={["Yearly", "Monthly"]}
          selected={newListing.fee.rentalPeriod}
          onSelect={(e) => {
            setNewListing((prev: INewListing) => ({
              ...prev,
              rentalPeriod: e.toLowerCase(),
            }));
          }}
        />
      </Box>
      <Box sx={{ mb: "20px" }}>
        <Typography
          fontSize={text.small}
          color={colors.textBody}
          fontWeight={text.weightSemiBold}
          mb="12px"
        >
          Price Range
        </Typography>
        <PriceRange
          min={0}
          max={100}
          rangeValue={valueRange}
          onSlide={setValueRange}
        />
      </Box>
      <Box sx={{ mb: "20px" }}>
        <Typography
          fontSize={text.small}
          color={colors.textBody}
          fontWeight={text.weightSemiBold}
          mb="12px"
        >
          Furnished Type
        </Typography>
        <MultiSelect
          options={["Furnished", "Unfurnished"]}
          selected={newListing.furnishedType}
          onSelect={(e) => {
            setNewListing((prev: INewListing) => ({
              ...prev,
              furnishedType: e.toLowerCase(),
            }));
          }}
        />
      </Box>
      <Box width="100%">
        <Box sx={{ mb: "20px" }}>
          <Typography
            fontSize={text.small}
            color={colors.textBody}
            fontWeight={text.weightSemiBold}
            mb="12px"
          >
            Apartment Servicing
          </Typography>
          <MultiSelect
            options={["Serviced", "Not Serviced"]}
            selected={newListing.servicing}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                servicing: e.toLowerCase().split(" ").join("-"),
              }));
            }}
          />
        </Box>
        <Box sx={{ mb: "20px" }}>
          <Typography
            fontSize={text.small}
            color={colors.textBody}
            fontWeight={text.weightSemiBold}
            mb="12px"
          >
            Property age
          </Typography>
          <MultiSelect
            options={["Renovated", "Old", "Newly Built"]}
            selected={newListing.propertyAge}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                propertyAge: e.toLowerCase().split(" ").join("-"),
              }));
            }}
          />
        </Box>
        <Box width="100%" mb="36px">
          <Box
            display="flex"
            alignItems="center"
            gap="16px"
            mt="20px"
            width="100%"
          >
            <Input
              type="number"
              value={String(newListing.lotSize)}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  lotSize: Number(e.target.value),
                }))
              }
              placeholder="Lot size"
              // inputContainerStyles={{ width: "100%" }}
            />
            <Input
              type="number"
              value={String(newListing.floorArea)}
              onChange={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  floorArea: Number(e.target.value),
                }))
              }
              placeholder="Floor Area"
              // inputContainerStyles={{ width: "100%" }}
            />
          </Box>
          <Typography fontSize={16} color={colors.textSubtitle} my="8px">
            Measurements are in square feet.
          </Typography>
          <Box display="flex" alignItems="flex-start" gap="16px" width="100%">
            <Input
              value={yearBuilt}
              select
              options={["2020", "2010", "2000"]}
              onSelect={setYearBuilt}
              placeholder="Year built"
              // inputContainerStyles={{ width: "100%" }}
            />
            <Input
              options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              select
              // type="number"
              value={String(newListing.floorLevel)}
              onSelect={(e) =>
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  floorLevel: Number(e),
                }))
              }
              placeholder="Floor level"
              // inputContainerStyles={{ width: "100%", flex: 1 }}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="24px">
          <Typography fontSize={18} fontWeight={600} color={colors.textTitle}>
            Property Details
          </Typography>
          <Input
            placeholder="Select interior features"
            select
            value=""
            multichoice
            selected={selectedInteriorFeatures}
            setSelected={setSelectedInteriorFeatures}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                interiorFeatures: prev.interiorFeatures.includes(
                  e.toLowerCase().split(" ").join("-"),
                )
                  ? prev.interiorFeatures.filter(
                      (x) => x !== e.toLowerCase().split(" ").join("-"),
                    )
                  : [
                      ...prev.interiorFeatures,
                      e.toLowerCase().split(" ").join("-"),
                    ],
              }));
            }}
            options={[
              "Furnished",
              "Unfurnished",
              "Built-in appliances",
              "Air conditioning",
              "Prepaid meter",
              "Wardrobe",
            ]}
          />
          <Input
            placeholder="Select exterior features"
            select
            value=""
            multichoice
            selected={selectedExteriorFeatures}
            setSelected={setSelectedExteriorFeatures}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                exteriorFeatures: prev.exteriorFeatures.includes(
                  e.toLowerCase().split(" ").join("-"),
                )
                  ? prev.exteriorFeatures.filter(
                      (x) => x !== e.toLowerCase().split(" ").join("-"),
                    )
                  : [
                      ...prev.exteriorFeatures,
                      e.toLowerCase().split(" ").join("-"),
                    ],
              }));
            }}
            options={[
              "Garden",
              "CCTV",
              "Security House",
              "Generator",
              "Solar Panel",
              "Security",
              "Balcony",
            ]}
          />
          {selectedPropertyType === "residential" && (
            <Input
              placeholder="Select kitchen fitting"
              select
              value=""
              multichoice
              selected={selectedKitchenFitting}
              setSelected={setSelectedKitchenFitting}
              onSelect={(e) => {
                setNewListing((prev: INewListing) => ({
                  ...prev,
                  kitchenFittings: prev.kitchenFittings.includes(
                    e.toLowerCase().split(" ").join("-"),
                  )
                    ? prev.kitchenFittings.filter(
                        (x) => x !== e.toLowerCase().split(" ").join("-"),
                      )
                    : [
                        ...prev.kitchenFittings,
                        e.toLowerCase().split(" ").join("-"),
                      ],
                }));
              }}
              options={[
                "Exhaust hood",
                "Gas hob",
                "Extractor fan",
                "Microwave",
                "Oven",
              ]}
            />
          )}
          <Input
            placeholder="Interior flooring"
            select
            value={newListing.interiorFlooring}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                interiorFlooring: e.toLowerCase().split(" ").join("-"),
              }));
            }}
            options={["Vinyl", "Rubber tiles", "Ceramic tiles", "Cemented"]}
          />
          <Input
            placeholder="Exterior flooring"
            select
            value={newListing.exteriorFlooring}
            onSelect={(e) => {
              setNewListing((prev: INewListing) => ({
                ...prev,
                exteriorFlooring: e.toLowerCase().split(" ").join("-"),
              }));
            }}
            options={["Interlocking", "Stamping", "Concrete"]}
          />
        </Box>
      </Box>
      <CustomButton
        buttonStyles={{
          mt: "30px",
          bgcolor: colors.primary,
          color: colors.light,
        }}
        variant="contained"
        onClick={() => onPageChange("main")}
      >
        Save
      </CustomButton>
    </Box>
  );
};

export default PropertyDetails;
