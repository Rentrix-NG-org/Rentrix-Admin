import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { icons } from "@src/utils/icons";

const Modal: React.FC<{
  onCancel: VoidFunction;
  onConfirm: VoidFunction;
  children: React.ReactNode;
  childrenSx?: SxProps;
}> = ({ onCancel, onConfirm, children, childrenSx }) => {
  const theme = useTheme();
  return (
    <Box sx={{ position: "fixed", inset: 0, zIndex: 99999 }}>
      <Box
        sx={{
          position: "fixed",
          background: "rgba(0,0,0,0.4)",
          inset: 0,
        }}
      ></Box>

      <Box
        sx={{
          position: "absolute",
          width: 739,
          height: 353,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // background: theme.palette.common.white,
          padding: "38px",
          boxSizing: "border-box",
          backgroundImage: `linear-gradient(45deg, #d9ffff 10%, #fff 35%)`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box></Box>
          <Box
            component="img"
            src={icons.info}
            sx={{ width: 56, transform: "translateX(10px)" }}
          />
          <Box
            component="button"
            onClick={onCancel}
            sx={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <Box component="img" src={icons.cancel} sx={{ width: 20 }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
            ...childrenSx,
          }}
        >
          {children}
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              marginTop: "48px",
            }}
          >
            <Box
              component="button"
              onClick={onCancel}
              sx={{
                borderRadius: "100px",
                width: 317.5,
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.palette.grey[100],
                border: "none",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "140%",
                  letterSpacing: "-0.32px",
                  color: theme.palette.primary.main,
                }}
              >
                Cancel
              </Typography>
            </Box>
            <Box
              component="button"
              onClick={onConfirm}
              sx={{
                borderRadius: "100px",
                width: 317.5,
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.palette.primary.main,
                border: "none",
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "140%",
                  letterSpacing: "-0.32px",
                  color: theme.palette.common.white,
                }}
              >
                Confirm
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Modal;
