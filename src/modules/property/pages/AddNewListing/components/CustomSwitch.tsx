import { Box } from "@mui/material";

interface SwitchProps {
  value: boolean;
  onChange: (x: boolean) => void;
}

const CustomSwitch = ({ value, onChange }: SwitchProps) => {
  return (
    <Box
      onClick={() => {
        onChange(!value);
      }}
    >
      <Box
        sx={{
          flexDirection: "row",
          // backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
          transition: "all .4s ease",
          cursor: "pointer",
          //           width: "55px",
          //   height: '28px',
          //   transform: "rotate(270deg)",
        }}
      >
        {/* Switch  */}
        <Box sx={value ? styles.switchOnContainer : styles.switchOffContainer}>
          {/* {value && <Typography sx={styles.switchText}>ON</Typography>} */}
          <Box
            style={{
              backgroundColor: value ? "#099137" : "#002B5B",
              transition: "all .4s ease",
              ...styles.dot,
            }}
          />
          {/* {!value && (
            <Typography sx={[styles.switchText, { color: "#DADDE2" }]}>
              OFF
            </Typography>
          )} */}
        </Box>

        {/* Text */}
        {/* <Text
          style={{
            color: value ? COLORS.primary : COLORS.gray,
            marginLeft: SIZES.base,
            ...FONTS.body4,
          }}
        >
          {" "}
          Save Me
        </Text> */}
      </Box>
    </Box>
  );
};

const styles = {
  switchOnContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: COLORS.primary,
    // backgroundColor: "rgba(132,42,131,0.5)",
    backgroundColor: "#E7F6EC",
    display: "flex",
    flexDirection: "row",
    padding: "2px",
    borderRadius: "100px",
    width: "55px",
    height: "28px",
    transition: "all .4s ease",
  },
  switchOffContainer: {
    padding: "2px",
    justifyContent: "flex-start",
    // borderWidth: 1,
    borderColor: "#DADDE2",
    backgroundColor: "#DADDE2",
    flexDirection: "row",
    display: "flex",
    borderRadius: "100px",
    alignItems: "center",
    width: "55px",
    height: "28px",
    transition: "all .4s ease",
  },
  switchText: {
    fontFamily: "Poppins-Bold",
    color: "#E7F6EC",
    fontSize: "10px",
    textAlign: "center",
    paddingHorizontal: "5px",
    // lineHeight: 22,
  },
  dot: {
    width: "24px",
    height: "24px",
    borderRadius: "100px",
  },
};

export default CustomSwitch;
