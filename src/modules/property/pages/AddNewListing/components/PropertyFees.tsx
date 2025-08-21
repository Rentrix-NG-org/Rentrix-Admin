import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { INewListing } from "../type";
import { colors } from "@src/shared/constants/constants";
import CustomSwitch from "./CustomSwitch";
import PriceRange from "./PriceRange";
import Input from "./Input";
import NairaIcon from "../assets/NairaIcon";
import TrashIcon from "../assets/TrashIcon";
import CustomButton from "./Button";

const PropertyFees = ({
  onPageChange,
  newListing,
  setNewListing,
}: {
  onPageChange: (x: string) => void;
  newListing: INewListing;
  setNewListing: (x: any) => void;
}) => {
  const [toggleLegalFee, setToggleLegalFee] = useState(
    newListing.fee.legalFee.length > 0,
  );
  const [toggleServiceFee, setToggleServiceFee] = useState(
    newListing.fee.serviceFee.length > 0,
  );
  const [toggleCautionFee, setToggleCautionFee] = useState(
    newListing.fee.cautionFee.length > 0,
  );
  const [toggleEstateFee, setToggleEstateFee] = useState(
    newListing.fee.estateFee.length > 0,
  );
  // const [otherFeeComp, setOtherFeeComp] = useState<{ name: ""; fee: 0 }[]>([]);
  // const [fee, setFee] = useState("");
  const [priceRange, setPriceRange] = useState([0]);
  const addNewFee = () => {
    setNewListing((prev: any) => ({
      ...prev,
      otherFees: [
        ...prev.otherFees,
        {
          name: "",
          fee: 0,
        },
      ],
    }));
  };

  const handleInputChange = (id: number, field: string, value: any) => {
    const updatedFees = newListing.fee.otherFees.map((fee, i) =>
      i === id
        ? {
            ...fee,
            ...(typeof field === "string" ? { [field]: value } : field),
          }
        : fee,
    );
    setNewListing((prev: any) => ({
      ...prev,
      otherFees: updatedFees,
    }));
  };

  const handleDeleteItem = (id: number) => {
    const filteredFee = newListing.fee.otherFees.filter((_, i) => i !== id);
    setNewListing((prev: any) => ({
      ...prev,
      otherFees: filteredFee,
    }));
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            height: "10px",
            width: "100%",
            backgroundColor: "#BBBBBB",
            borderRadius: "100px",
          }}
        ></Box>
        <Box
          sx={{
            height: "10px",
            width: "100%",
            backgroundColor: "#BBBBBB",
            borderRadius: "100px",
          }}
        ></Box>
        <Box
          sx={{
            height: "10px",
            width: "100%",
            backgroundColor: "#BBBBBB",
            borderRadius: "100px",
          }}
        ></Box>
        <Box
          sx={{
            height: "10px",
            width: "100%",
            backgroundColor: "#BBBBBB",
            borderRadius: "100px",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          mb: "30px",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: colors.textBody,
                fontSize: 16,
              }}
            >
              Legal Fee
            </Typography>
            <CustomSwitch value={toggleLegalFee} onChange={setToggleLegalFee} />
          </Box>
          <Box>
            {toggleLegalFee ? (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,
                    }}
                  >
                    %{priceRange[0]}
                  </Typography>
                  {/* <Typography sx={{fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,}}>%{priceRange[1]}</Typography> */}
                </Box>

                <PriceRange
                  updateRange={false}
                  min={0}
                  max={100}
                  rangeValue={priceRange}
                  onSlide={setPriceRange}
                />
                <Input
                  type="number"
                  value={String(newListing.fee.legalFee)}
                  onChange={(e) =>
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      fee: { ...prev.fee, legalFee: e.target.value },
                    }))
                  }
                  placeholder={"0"}
                  startIcon={<NairaIcon width="20px" height="20px" />}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: colors.textBody,
                fontSize: 16,
              }}
            >
              Caution Fee
            </Typography>
            <CustomSwitch
              value={toggleCautionFee}
              onChange={setToggleCautionFee}
            />
          </Box>
          <Box>
            {toggleCautionFee ? (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,
                    }}
                  >
                    %{priceRange[0]}
                  </Typography>
                </Box>
                <PriceRange
                  updateRange={false}
                  min={0}
                  max={100}
                  rangeValue={priceRange}
                  onSlide={setPriceRange}
                />
                <Input
                  type="number"
                  value={String(newListing.fee.cautionFee)}
                  onChange={(e) =>
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      fee: { ...prev.fee, cautionFee: e.target.value },
                    }))
                  }
                  placeholder={"0"}
                  startIcon={<NairaIcon width="20px" height="20px" />}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: colors.textBody,
                fontSize: 16,
              }}
            >
              Service Charge
            </Typography>
            <CustomSwitch
              value={toggleServiceFee}
              onChange={setToggleServiceFee}
            />
          </Box>
          <Box>
            {toggleServiceFee ? (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,
                    }}
                  >
                    %{priceRange[0]}
                  </Typography>
                  {/* <Typography sx={{fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,}}>%{priceRange[1]}</Typography> */}
                </Box>
                <PriceRange
                  updateRange={false}
                  min={0}
                  max={100}
                  rangeValue={priceRange}
                  onSlide={setPriceRange}
                />
                <Input
                  type="number"
                  value={String(newListing.fee.serviceFee)}
                  onChange={(e) =>
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      fee: { ...prev.fee, serviceFee: e.target.value },
                    }))
                  }
                  placeholder={"0"}
                  startIcon={<NairaIcon width="20px" height="20px" />}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: colors.textBody,
                fontSize: 16,
              }}
            >
              Estate Fee
            </Typography>
            <CustomSwitch
              value={toggleEstateFee}
              onChange={setToggleEstateFee}
            />
          </Box>
          <Box>
            {toggleEstateFee ? (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,
                    }}
                  >
                    %{priceRange[0]}
                  </Typography>
                  {/* <Typography sx={{fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,}}>%{priceRange[1]}</Typography> */}
                </Box>
                <PriceRange
                  updateRange={false}
                  min={0}
                  max={100}
                  rangeValue={priceRange}
                  onSlide={setPriceRange}
                />
                <Input
                  type="number"
                  value={String(newListing.fee.estateFee)}
                  onChange={(e) =>
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      fee: { ...prev.fee, estateFee: e.target.value },
                    }))
                  }
                  placeholder={"0"}
                  startIcon={<NairaIcon width="20px" height="20px" />}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        {newListing.fee.otherFees.map((fee, id) => (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Input
                value={fee.name}
                onChange={(e) => handleInputChange(id, "name", e.target.value)}
                inputContainerStyles={{
                  padding: 0,
                  border: "none",
                  bgcolor: "transparent",
                }}
                inputStyles={{ backgroundColor: "transparent" }}
                placeholder="rename"
              />
              <Box onClick={() => handleDeleteItem(id)}>
                <TrashIcon />
              </Box>
            </Box>
            <Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,
                    }}
                  >
                    %{priceRange[0]}
                  </Typography>
                  {/* <Typography sx={{fontSize: 14,
                      color: colors.textBody,
                      fontWeight: 700,}}>%{priceRange[1]}</Typography> */}
                </Box>
                <PriceRange
                  updateRange={false}
                  min={0}
                  max={100}
                  rangeValue={priceRange}
                  onSlide={setPriceRange}
                />
                <Input
                  type="number"
                  value={String(fee.fee)}
                  onChange={(e) => handleInputChange(id, "fee", e.target.value)}
                  placeholder={"0"}
                  startIcon={<NairaIcon width="20px" height="20px" />}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box display="flex" alignItems="center" gap="12px">
        <CustomButton
          variant="contained"
          buttonStyles={{ bgcolor: colors.secondary, height: "48px" }}
          onClick={addNewFee}
        >
          Add Fee
        </CustomButton>
        <CustomButton
          variant="contained"
          buttonStyles={{
            bgcolor: colors.primary,
            height: "48px",
            color: colors.light,
          }}
          onClick={() => onPageChange("main")}
        >
          Save
        </CustomButton>
      </Box>
    </Box>
  );
};

export default PropertyFees;
