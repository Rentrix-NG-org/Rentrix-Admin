import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { INewListing } from "../type";
import { colors } from "@src/shared/constants/constants";
import CustomSwitch from "./CustomSwitch";
import PriceRange from "./PriceRange";
import Input from "./Input";
import NairaIcon from "../assets/NairaIcon";
import TrashIcon from "../assets/TrashIcon";
import CustomButton from "./Button";
import { addComma } from "./MainAddListing";

const PropertyFees = ({
  onPageChange,
  newListing,
  setNewListing,
}: {
  onPageChange: (x: string) => void;
  newListing: INewListing;
  setNewListing: (x: any) => void;
}) => {
  const [toggleLegalFee, setToggleLegalFee] = useState(false);
  const [toggleServiceFee, setToggleServiceFee] = useState(false);
  const [toggleCautionFee, setToggleCautionFee] = useState(false);
  const [toggleEstateFee, setToggleEstateFee] = useState(false);
  const [error, setError] = useState(false);
  // const [otherFeeComp, setOtherFeeComp] = useState<{ name: ""; fee: 0 }[]>([]);
  // const [fee, setFee] = useState("");

  useEffect(() => {
    if (newListing.legalFee > 0) {
      setToggleLegalFee(true);
    }
    if (newListing.cautionFee > 0) {
      setToggleCautionFee(true);
    }
    if (newListing.estateFee > 0) {
      setToggleEstateFee(true);
    }
    if (newListing.serviceFee > 0) {
      setToggleServiceFee(true);
    }
    let total = 0;
    const tot = newListing.otherFees.map((x) => (total += x.fee));
    setNewListing((prev: INewListing) => ({
      ...prev,
      tenantOtherFeesTotal: total,
    }));
  }, [newListing.otherFees]);

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
    const updatedFees = newListing.otherFees.map((fee, i) =>
      i === id
        ? {
            ...fee,
            ...(typeof field === "string" ? { [field]: value } : field),
          }
        : fee
    );
    setNewListing((prev: any) => ({
      ...prev,
      otherFees: updatedFees,
    }));
  };

  const handleDeleteItem = (id: number) => {
    const filteredFee = newListing.otherFees.filter((fee, i) => i !== id);
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
        <Typography
          sx={{
            color: colors.textTitle,
            fontSize: 19,
          }}
        >
          Click on the toogle to add these fees if they are inclusive or click
          on the Add Fee button to input yours.
        </Typography>
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
                fontWeight: 600,
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
                  autoFocus={toggleLegalFee}
                  type="text"
                  value={addComma(String(newListing.legalFee))}
                  onChange={(e) =>
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      legalFee: Number(e.target.value.replace(/,/g, "")),
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
                fontWeight: 600,
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
                  autoFocus={toggleCautionFee}
                  type="text"
                  value={addComma(String(newListing.cautionFee))}
                  onChange={(e) =>
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      cautionFee: Number(e.target.value.replace(/,/g, "")),
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
                fontWeight: 600,
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
                  autoFocus={toggleServiceFee}
                  type="text"
                  value={addComma(String(newListing.serviceFee))}
                  onChange={(e) =>
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      serviceFee: Number(e.target.value.replace(/,/g, "")),
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
                fontWeight: 600,
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
                  type="text"
                  autoFocus={toggleEstateFee}
                  value={addComma(String(newListing.estateFee))}
                  onChange={(e) =>
                    setNewListing((prev: INewListing) => ({
                      ...prev,
                      estateFee: Number(e.target.value.replace(/,/g, "")),
                    }))
                  }
                  placeholder={"0"}
                  startIcon={<NairaIcon width="20px" height="20px" />}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
        {newListing.otherFees.map((fee, id) => (
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
                  border: "1px solid transparent",
                  borderColor: error && fee.name === "" ? "red" : "transparent",
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
                  type="text"
                  value={addComma(String(fee.fee))}
                  onChange={(e) =>
                    handleInputChange(
                      id,
                      "fee",
                      Number(e.target.value.replace(/,/g, ""))
                    )
                  }
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
          buttonStyles={{
            bgcolor: colors.secondary,
            height: "48px",
            "&:hover": {
              bgcolor: colors.secondary,
            },
          }}
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
            "&:hover": {
              bgcolor: colors.primary,
            },
          }}
          onClick={() => {
            if (newListing.otherFees.find((x) => x.name === "")) setError(true);
            else onPageChange("main");
          }}
        >
          Save
        </CustomButton>
      </Box>
    </Box>
  );
};

export default PropertyFees;
